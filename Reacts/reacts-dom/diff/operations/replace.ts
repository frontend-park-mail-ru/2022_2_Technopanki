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

// TODO: needs fixes
const removeDOMNode = (element: HTMLElement, node: ReactsDOMNode) => {
    removeAllProps(node);
    node.ref = null;
};

const removeComponentNode = (
    element: HTMLElement,
    node: ReactsComponentNode,
) => {
    node.instance?.componentWillUnmount();
    node.instance?.unmount();
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

export const replaceNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
    beforeElement: HTMLElement | null = null,
) => {
    console.log('replace');
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

    let componentRef: HTMLElement | null = null;
    let parentRef: HTMLElement | null = null;
    // @ts-ignore we checked for primitive types
    switch (oldNode.$$typeof) {
        case DOM_SYMBOL:
            parentRef = element.parentElement;
            removeDOMNode(element, oldNode as ReactsDOMNode);
            break;
        case COMPONENT_SYMBOL:
            componentRef = oldNode.ref;
            removeComponentNode(element, oldNode as ReactsComponentNode);
            break;
        default:
            throw new Error('undefined type of node');
    }

    // @ts-ignore we checked for primitive types
    switch (newNode.$$typeof) {
        case DOM_SYMBOL:
            insertDOMNode(
                componentRef ? componentRef : element,
                newNode as ReactsDOMNode,
                componentRef ? element : null,
            );
            componentRef && element.remove();
            break;
        case COMPONENT_SYMBOL:
            insertComponentNode(
                parentRef ? parentRef : componentRef,
                newNode as ReactsComponentNode,
                element,
            );
            element.remove();
            break;
        default:
            throw new Error('undefined type of node');
    }
};
