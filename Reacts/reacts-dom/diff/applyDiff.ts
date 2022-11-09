import {
    AttributeUpdater,
    Insert,
    Operation,
    Remove,
    Replace,
    Update,
} from './index';
import {
    insert,
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { ComponentType, VNodeType } from '../../shared/common';
import {
    COMPONENT_NODE_SYMBOL,
    CONTEXT_NODE_SYMBOL,
    DOM_NODE_SYMBOL,
} from '../../shared/index';
import { setProps } from '../attributes/index';
import { setContextValue } from '../../reacts/context/context';
import { Context } from '../../reacts/context/index';
import { events } from '../attributes/constants';

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
    operation.attrUpdater.remove.forEach(([attr, value]) => {
        if (attr.startsWith('on')) {
            element.removeEventListener(events[attr], value);
        } else {
            element.removeAttribute(attr);
        }
    });
    operation.attrUpdater.removeFromUpdate.forEach(([attr, value]) => {
        element.removeEventListener(events[attr], value as Function);
    });
    operation.attrUpdater.set.forEach(([attr, value]) => {
        setProps(element, { [attr]: value });
    });
    operation.attrUpdater.update.forEach(([attr, value]) => {
        setProps(element, { [attr]: value });
    });
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
        ? children.forEach(child => insertNode(element, child, beforeElement))
        : insertNode(element, children, beforeElement);
};

const insertDomNode = (
    element: HTMLElement,
    node: VNodeType,
    beforeElement: HTMLElement | null = null,
) => {
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
};

const insertContextNode = (
    element: HTMLElement,
    node: VNodeType,
    beforeElement: HTMLElement | null = null,
) => {
    setContextValue(<Context<any>>node);
    // @ts-ignore context cannot have children of type string
    insertChildren(element, node.props.children, beforeElement);
    if (__DEV__) {
        if (typeof node.props.children === 'string') {
            throw new Error('Context children type = string');
        }
    }
};

const insertNode = (
    element: HTMLElement,
    node: VNodeType,
    beforeElement: HTMLElement | null = null,
) => {
    // We must remember to set _domElement in node
    node._domElement = element;

    if (node.$$typeof === DOM_NODE_SYMBOL) {
        insertDomNode(element, node, beforeElement);
    } else if (node.$$typeof === CONTEXT_NODE_SYMBOL) {
        insertContextNode(element, node, beforeElement);
    } else if (node.$$typeof === COMPONENT_NODE_SYMBOL) {
        insertChildren(element, node.props.children, beforeElement);
        if (node._instance) {
            node._instance.prevRenderVNodeRef = node.props
                .children as VNodeType;
            node._instance.rootDomRef = element;
        } else {
            if (__DEV__) {
                throw new Error('node instance is not set');
            }
        }
        node._instance?.componentDidMount();
    } else {
        insertChildren(element, node.props.children, beforeElement);
    }
};

const replaceNode = (
    element: HTMLElement,
    oldNode: VNodeType,
    newNode: VNodeType,
    beforeElement: HTMLElement | null = null,
) => {
    insertNode(element, newNode, beforeElement);
    Object.entries(oldNode.props).forEach(([key, value]) => {
        if (key.startsWith('on') && value) {
            element.removeEventListener(events[key], value as Function);
        }
    });
    element.remove();
    oldNode._instance?.unmount();
    newNode._instance?.componentDidMount();
};

export const applyDiff = (element: HTMLElement, operation: Operation) => {
    if (operation.type === SKIP_OPERATION) {
        return;
    }

    if (operation.type === INSERT_OPERATION) {
        insertNode(element, (<Insert>operation).node);
        return;
    }

    if (operation.type === REMOVE_OPERATION) {
        Object.entries((<Remove>operation).node.props).forEach(
            ([key, value]) => {
                if (key.startsWith('on') && value) {
                    element.removeEventListener(events[key], value as Function);
                }
            },
        );
        element.remove();
        (<Remove>operation).node._instance?.unmount();

        return;
    }

    if (operation.type === REPLACE_OPERATION) {
        replaceNode(
            element,
            (<Replace>operation).remove.node,
            (<Replace>operation).insert.node,
        );
        return;
    }

    if (operation.type === UPDATE_OPERATION) {
        if ((<Update>operation).node.$$typeof === DOM_NODE_SYMBOL) {
            Object.entries((<Update>operation).node.props).forEach(
                ([attr, value]) => {
                    if (attr.startsWith('on')) {
                        (<Update>(
                            operation
                        )).node._domElement.removeEventListener(
                            events[attr],
                            value,
                        );
                    }
                },
            );
            updateElementAttributes(element, <Update>operation);
        }

        applyChildrenDiff(
            (<Update>operation).node._domElement,
            (<Update>operation).childrenUpdater,
        );

        if ((<Update>operation).node._instance) {
            (<ComponentType>(
                (<Update>operation).node._instance
            )).prevRenderVNodeRef = (<Update>operation).node.props
                .children as VNodeType;
            (<ComponentType>(<Update>operation).node._instance).rootDomRef =
                element;
        }
        (<Update>operation).node._instance?.componentDidUpdate();
    }

    return element;
};

/**
 * For each of the children applies the operation
 * @param element
 * @param diffOperations
 */
const applyChildrenDiff = (
    element: HTMLElement,
    diffOperations: Operation[],
) => {
    let offset = 0;
    for (let i = 0; i < diffOperations.length; ++i) {
        if (diffOperations[i].type === SKIP_OPERATION) {
            continue;
        }
        const childUpdater = diffOperations[i];
        const childElem = element.childNodes[i + offset] as HTMLElement;

        if (childUpdater.type === REPLACE_OPERATION) {
            replaceNode(
                childElem,
                (<Replace>childUpdater).remove.node,
                (<Replace>childUpdater).insert.node,
            );
            offset -= 1;
            continue;
        }

        if (childUpdater.type === INSERT_OPERATION) {
            insertNode(element, (<Insert>childUpdater).node, childElem);
            continue;
        }

        if (childUpdater.type === REMOVE_OPERATION) {
            Object.entries((<Remove>childUpdater).node.props).forEach(
                ([key, value]) => {
                    if (key.startsWith('on') && value) {
                        childElem.removeEventListener(
                            events[key],
                            value as Function,
                        );
                    }
                },
            );
            childElem.remove();
            (<Remove>childUpdater).node._instance?.componentWillUnmount();
            (<Remove>childUpdater).node._instance?.unmount();
            offset -= 1;
            continue;
        }

        if (childUpdater.type === UPDATE_OPERATION) {
            applyDiff((<Update>childUpdater).node._domElement, childUpdater);
            continue;
        }

        if (__DEV__) {
            throw new Error('undefined operation');
        }
    }
};
