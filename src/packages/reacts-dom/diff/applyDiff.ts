import { AttributeUpdater, Operation } from './index';
import {
    insert,
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { setAttributes } from '../render/renderNode';
import { VNodeType } from '../../shared/common';
import { createDomElement } from '../utils';
import { COMPONENT_ELEMENT_SYMBOL, DOM_ELEMENT_SYMBOL } from '../../shared';
import { childrenDiff } from './childrenDiff';

/**
 * Creates DOM node from node and replaces element with this node
 * @param element
 * @param node
 */
const replaceElement = (
    element: HTMLElement,
    node: VNodeType & { type: string },
) => {
    const newElement = document.createElement(node.type);
    setAttributes(newElement, node.props);
    element.replaceWith(newElement);
};

const updateElementAttributes = (
    element: HTMLElement,
    operation: Operation & {
        attrUpdater: AttributeUpdater;
        childrenUpdater: Operation[];
    },
) => {
    // TODO refactor and add setAttribute maybe
    operation.attrUpdater.set.forEach(
        // @ts-ignore
        ([attr, value]) => element.setAttribute(attr, value),
    );
    operation.attrUpdater.update.forEach(
        // @ts-ignore
        ([attr, value]) => (element[attr] = value),
    );
    operation.attrUpdater.remove.forEach(attr => element.removeAttribute(attr));
};

const insertElement = (
    element: HTMLElement,
    node: VNodeType,
    beforeElement: HTMLElement | null,
) => {
    if (node.$$typeof === DOM_ELEMENT_SYMBOL) {
        const newElement = document.createElement(node.type);
        setAttributes(newElement, node.props);
        if (node.props.children) {
            if (typeof node.props.children === 'string') {
                newElement.innerText = node.props.children;
            } else {
                Array.isArray(node.props.children)
                    ? node.props.children.forEach(child =>
                          insertElement(newElement, child, null),
                      )
                    : insertElement(
                          newElement,
                          node.props.children,
                          insert(node.props.children),
                      );
            }
        }
        element.insertBefore(newElement, beforeElement);
    } else {
        if (node.props.children) {
            Array.isArray(node.props.children)
                ? node.props.children.forEach(child =>
                      insertElement(element, child, beforeElement),
                  )
                : insertElement(element, node.props.children, beforeElement);
        }
    }
};

export const applyDiff = (element: HTMLElement, operation: Operation) => {
    if (operation.type === SKIP_OPERATION) {
        return;
    }

    if (operation.type === REPLACE_OPERATION) {
        // @ts-ignore trust me, check replace operation in operations.ts
        replaceElement(element, operation.node);
        return;
    }

    if (operation.type === UPDATE_OPERATION) {
        // @ts-ignore trust me, check replace operation in operations.ts
        updateElementAttributes(element, operation);

        if (operation.childrenUpdater) {
            // @ts-ignore TODO
            applyChildrenDiff(
                element,
                operation.childrenUpdater,
                operation.node.$$typeof,
            );
        }
    }

    if (operation.type === INSERT_OPERATION) {
        // @ts-ignore trust me, check insert operation in operations.ts
        insertElement(element, operation.node);
    }

    return element;
};

// TODO: refactor
export const applyChildrenDiff = (
    element: HTMLElement,
    diffOperations: Operation[],
    nodeType?: Symbol,
) => {
    let offset = 0;
    for (let i = 0; i < diffOperations.length; ++i) {
        if (diffOperations[i].type === SKIP_OPERATION) {
            continue;
        }
        const childUpdater = diffOperations[i];
        const childElem = element.childNodes[i + offset];

        if (childUpdater.type === INSERT_OPERATION) {
            insertElement(element, childUpdater.node, childElem);
            // if (childUpdater.node.$$typeof === COMPONENT_ELEMENT_SYMBOL) {
            //     insertElement(element, childUpdater.node, childElem);
            //     // applyDiff(element, insert(childUpdater.node));
            // } else {
            //     element.insertBefore(
            //         createDomElement(
            //             // @ts-ignore trust me, check insert operation in operations.ts
            //             childUpdater.node.type,
            //             // @ts-ignore trust me, check insert operation in operations.ts
            //             childUpdater.node.props,
            //         ),
            //         childElem,
            //     );
            // }
            continue;
        }

        if (childUpdater.type === REMOVE_OPERATION) {
            childElem.remove();
            offset -= 1;
            continue;
        }

        // @ts-ignore TODO
        if (childUpdater.type === UPDATE_OPERATION) {
            nodeType === COMPONENT_ELEMENT_SYMBOL
                ? applyDiff(element, childUpdater)
                : applyDiff(childElem, childUpdater);
        }
    }
};
