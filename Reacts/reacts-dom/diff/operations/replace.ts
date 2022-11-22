import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
    ReactsNotPrimitiveNode,
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
const removeDOMNode = (node: ReactsDOMNode) => {
    removeAllProps(node);
    node.ref = null;
    removeChildren(node);
};

const removeComponentNode = (node: ReactsComponentNode) => {
    node.instance?.componentWillUnmount();
    node.instance?.unmount();
    removeChildren(node);
};

const replaceDOMNode = (replaceElement: HTMLElement, node: ReactsDOMNode) => {
    node.ref = document.createElement(node.type);
    setProps(node);
    insertChildren(node.ref, node.props.children);
    replaceElement.replaceWith(node.ref);
};

const replaceComponentNode = (
    replaceElement: HTMLElement,
    node: ReactsComponentNode,
) => {
    node.ref = element;
    if (node.instance) {
        node.instance.ref = element;
    } else {
        // TODO: __DEV__
    }

    node.instance?.componentDidMount();
};

// TODO: refactor
const findReplaceElementForComponent = (
    node: ReactsNotPrimitiveNode,
): ReactsDOMNode => {
    if (node.$$typeof === DOM_SYMBOL) {
        return node as ReactsDOMNode;
    } else {
        return findReplaceElementForComponent(
            node.props.children as ReactsNotPrimitiveNode,
        );
    }
};

export const replaceNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
    beforeElement: HTMLElement | null = null,
) => {
    console.log(element, oldNode, newNode, beforeElement);
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

    // Нужно сохранить DOM элемент который мы реплейсим
    let replaceElement: HTMLElement = element;

    // "remove"
    switch ((<ReactsNotPrimitiveNode>oldNode).$$typeof) {
        case DOM_SYMBOL:
            replaceElement = (<ReactsDOMNode>oldNode).ref ?? element;
            removeDOMNode(oldNode as ReactsDOMNode);
            break;
        case COMPONENT_SYMBOL:
            replaceElement = findReplaceElementForComponent(
                oldNode as ReactsComponentNode,
            ).ref as HTMLElement;
            removeComponentNode(oldNode as ReactsComponentNode);
            break;
        default:
            throw new Error('undefined type of node');
    }

    // "insert"
    switch ((<ReactsNotPrimitiveNode>newNode).$$typeof) {
        case DOM_SYMBOL:
            replaceDOMNode(replaceElement, newNode as ReactsDOMNode);
            break;
        case COMPONENT_SYMBOL:
            replaceDOMNode(
                replaceElement,
                findReplaceElementForComponent(newNode as ReactsComponentNode),
            );
            break;
        default:
            throw new Error('undefined type of node');
    }

    return;

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
                    componentRenderRef?.remove();
                    break;
                case COMPONENT_SYMBOL:
                    insertComponentNode(element, newNode, componentRef);
                    componentRenderRef?.remove();
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
