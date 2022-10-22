import { AttributeUpdater, Insert, Operation, Replace, Update } from './index';
import {
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { VNodeType } from '../../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    CONSUMER_ELEMENT_SYMBOL,
    CONTEXT_ELEMENT_SYMBOL,
    CONTEXT_TYPE,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';
import { setProps } from '../attributes/index';

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
    node._domElement = newElement;
    setProps(newElement, node.props);
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
    children: VNodeType | VNodeType[] | undefined | null,
    beforeElement: HTMLElement | null = null,
) => {
    if (!children) {
        return;
    }

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
    // Set new node domEle
    node._domElement = element;
    if (node.$$typeof === DOM_ELEMENT_SYMBOL) {
        const newElement = document.createElement(<string>node.type);
        node._domElement = newElement;
        setProps(newElement, node.props);

        if (node.props.children) {
            if (typeof node.props.children === 'string') {
                newElement.innerText = node.props.children;
            } else {
                insertChildren(newElement, node.props.children);
            }
        }

        element.insertBefore(newElement, beforeElement);
    } else if (node.$$typeof === CONTEXT_ELEMENT_SYMBOL) {
        if (typeof node.props.children === 'function') {
            node.props.children = node.props.children(node.value);
        }
        // @ts-ignore context cannot have children of type string
        insertChildren(element, node.props.children, beforeElement);
        if (__DEV__) {
            if (typeof node.props.children === 'string') {
                throw new Error('Context children type = string');
            }
        }
    } else {
        // TODO
        insertChildren(element, node.props.children, beforeElement);
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

        applyChildrenDiff(
            (<Update>operation).node._domElement,
            (<Update>operation).childrenUpdater,
            (<Update>operation).node.$$typeof,
        );
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
            applyDiff((<Update>childUpdater).node._domElement, childUpdater);
        }
    }
};
