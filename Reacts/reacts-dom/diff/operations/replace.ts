import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../../shared/types/node';
import { isPrimitiveNodes } from '../../utils/isPrimitive';
import {
    COMPONENT_SYMBOL,
    DOM_SYMBOL,
} from '../../../shared/constants/symbols';
import { removeAllProps, setProps } from '../../props/props';
import { insertChildren } from './insert';
import { removeChildren } from './remove';
import { ReactsComponent } from '../../../reacts/src/Component';

// TODO: needs fixes
const removeDOMNode = (element: HTMLElement, node: ReactsDOMNode) => {
    removeAllProps(node);
    node.ref = null;
    removeChildren(node);
};

const removeComponentNode = (
    element: HTMLElement,
    node: ReactsComponentNode,
) => {
    node.instance?.componentWillUnmount();
    node.instance?.unmount();
    removeChildren(node);
};

const insertDOMNode = (
    element: HTMLElement,
    node: ReactsDOMNode,
    beforeElement: HTMLElement | null = null,
) => {
    // TODO: совпадает с insertDOMNode в insert
    node.ref = document.createElement(node.type);
    setProps(node);
    insertChildren(node.ref, node.props.children);
    element.insertBefore(node.ref, beforeElement);
};

const insertComponentNode = (
    element: HTMLElement,
    node: ReactsComponentNode,
    beforeElement: HTMLElement | null = null,
) => {
    node.ref = element;
    if (node.instance) {
        node.instance.ref = element;
    } else {
        // TODO: __DEV__
    }

    insertChildren(element, node.props.children, beforeElement);
    node.instance?.componentDidMount();
};

// TODO: refactor
// const __findFirst__ = (node: ReactsComponentNode) => {
//     if (node.$$typeof !== DOM_SYMBOL) {
//         return node
//     }
//     return findFirstDOMNodeInComponentChildren(node.instance?.currentNode?.props?.children)
// }

export const replaceNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
    beforeElement: HTMLElement | null = null,
) => {
    if (isPrimitiveNodes(oldNode, newNode)) {
        switch (typeof newNode) {
            case 'string':
                element.replaceWith(document.createTextNode(newNode));
                break;
            case 'number':
                element.replaceWith(
                    document.createTextNode(newNode.toString()),
                );
                break;
            default:
                element.replaceWith(document.createTextNode(''));
        }

        return;
    }

    let componentRef: HTMLElement;
    let parentRef: HTMLElement;
    let rootRef: HTMLElement;
    let componentRenderRef: HTMLElement;
    // @ts-ignore we checked for primitive types
    switch (oldNode.$$typeof) {
        case DOM_SYMBOL:
            parentRef = element.parentElement as HTMLElement;
            removeDOMNode(element, oldNode as ReactsDOMNode);
            switch (newNode.$$typeof) {
                case DOM_SYMBOL:
                    insertDOMNode(parentRef, newNode, element);
                    element?.remove();
                    break;
                case COMPONENT_SYMBOL:
                    insertComponentNode(parentRef, newNode, element);
                    element?.remove();
                    break;
            }
            break;
        case COMPONENT_SYMBOL:
            rootRef = oldNode.ref as HTMLElement;
            componentRenderRef = (<ReactsComponent>oldNode.instance).currentNode
                .ref;
            removeComponentNode(element, oldNode as ReactsComponentNode);
            switch (newNode.$$typeof) {
                case DOM_SYMBOL:
                    insertDOMNode(element, newNode, componentRef);
                    componentRef?.remove();
                    break;
                case COMPONENT_SYMBOL:
                    insertComponentNode(element, newNode, componentRef);
                    componentRef?.remove();
                    break;
            }
            break;
        default:
            throw new Error('undefined type of node');
    }
    return;
    // @ts-ignore we checked for primitive types
    switch (newNode.$$typeof) {
        case DOM_SYMBOL:
            insertDOMNode(
                componentRef ? componentRef : parentRef,
                newNode as ReactsDOMNode,
                componentRef ? element : null,
            );
            element?.remove();
            break;
        case COMPONENT_SYMBOL:
            insertComponentNode(
                parentRef ? parentRef : componentRef,
                newNode as ReactsComponentNode,
                element,
            );
            element?.remove();
            break;
        default:
            throw new Error('undefined type of node');
    }
};
