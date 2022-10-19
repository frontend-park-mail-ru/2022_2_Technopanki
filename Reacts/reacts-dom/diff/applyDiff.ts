import { AttributeUpdater, Insert, Operation, Replace, Update } from './index';
import {
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { setAttributes } from '../render/renderNode';
import { VNodeType } from '../../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';

/**
 * Creates DOM node from node and replaces element with this node
 * @param element
 * @param node
 */
const replaceElement = (
    element: HTMLElement,
    node: VNodeType & { type: string },
): void => {
    const newElement = document.createElement(node.type);
    setAttributes(newElement, node.props);
    element.replaceWith(newElement);
};

/**
 * Updates attributes of HTML element
 * @param element
 * @param operation
 */
const updateElementAttributes = (
    element: HTMLElement,
    operation: Operation & {
        attrUpdater: AttributeUpdater;
        childrenUpdater: Operation[];
    },
): void => {
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

const insertChildren = (
    element: HTMLElement,
    children: VNodeType | VNodeType[],
    beforeElement: HTMLElement | null = null,
) => {
    Array.isArray(children)
        ? children.forEach(child =>
              insertElement(element, child, beforeElement),
          )
        : insertElement(element, children, beforeElement);
};

const insertElement = (
    element: HTMLElement,
    node: VNodeType,
    beforeElement: HTMLElement | null = null,
) => {
    if (node.$$typeof === DOM_ELEMENT_SYMBOL) {
        const newElement = document.createElement(<string>node.type);
        setAttributes(newElement, node.props);

        if (node.props.children) {
            if (typeof node.props.children === 'string') {
                newElement.innerText = node.props.children;
            } else {
                insertChildren(newElement, node.props.children);
            }
        }

        element.insertBefore(newElement, beforeElement);
    } else {
        // TODO
        if (node.props.children) {
            insertChildren(element, node.props.children, beforeElement);
        }
    }
};

export const applyDiff = (element: HTMLElement, operation: Operation) => {
    if (operation.type === SKIP_OPERATION) {
        return;
    }

    if (
        operation.type === REPLACE_OPERATION &&
        typeof (<Replace>operation).node.type === 'string'
    ) {
        replaceElement(element, (<Replace>operation).node);
        return;
    }

    if (operation.type === UPDATE_OPERATION) {
        updateElementAttributes(element, <Update>operation);

        if (operation.childrenUpdater) {
            applyChildrenDiff(
                element,
                (<Update>operation).childrenUpdater,
                (<Update>operation).node.$$typeof,
            );
        }
    }

    if (operation.type === INSERT_OPERATION) {
        insertElement(element, <VNodeType>(<Insert>operation).node);
    }

    return element;
};

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
        const childElem = element.childNodes[i + offset] as HTMLElement;

        if (childUpdater.type === INSERT_OPERATION) {
            insertElement(
                element,
                <VNodeType>(<Insert>childUpdater).node,
                childElem,
            );
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
