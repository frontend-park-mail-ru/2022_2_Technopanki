import { AttributeUpdater, Operation } from './index';
import {
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { setAttributes } from '../render/renderNode';
import { VNodeType } from '../../shared/common';
import { createDomElement } from '../utils';

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
    node: VNodeType & { type: string },
) => {
    const newElement = document.createElement(node.type);
    setAttributes(newElement, node.props);
    element.appendChild(newElement);
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
            applyChildrenDiff(element, operation.childrenUpdater);
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
) => {
    let offset = 0;
    for (let i = 0; i < diffOperations.length; ++i) {
        if (diffOperations[i].type === SKIP_OPERATION) {
            continue;
        }
        const childUpdater = diffOperations[i];
        const childElem = element.childNodes[i + offset];

        if (childUpdater.type === INSERT_OPERATION) {
            if (Array.isArray(childUpdater.node)) {
                applyChildrenDiff(element, childUpdater.node);
            } else {
                element.insertBefore(
                    createDomElement(
                        // @ts-ignore trust me, check insert operation in operations.ts
                        childUpdater.node.type,
                        // @ts-ignore trust me, check insert operation in operations.ts
                        childUpdater.node.props,
                    ),
                    childElem,
                );
            }
            continue;
        }

        if (childUpdater.type === REMOVE_OPERATION) {
            childElem.remove();
            offset -= 1;
            continue;
        }

        // @ts-ignore TODO
        applyDiff(childElem, childUpdater);
    }
};
