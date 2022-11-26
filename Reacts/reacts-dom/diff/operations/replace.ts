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
import { ComponentType } from '../../../shared/types/component';
import { ReactsComponent } from '../../../reacts/src/Component';

/**
 * Removes DOM node
 * @param node
 */
const removeDOMNode = (node: ReactsDOMNode) => {
    removeAllProps(node);
    removeChildren(node);
    node.ref = null;
};

/**
 * Removes Component node
 * @param node
 */
const removeComponentNode = (node: ReactsComponentNode) => {
    node.instance?.componentWillUnmount();
    node.instance?.unmount();
    removeChildren(node);
};

/**
 * Replace DOM node
 * @param replaceElement
 * @param node
 */
const replaceDOMNode = (replaceElement: HTMLElement, node: ReactsDOMNode) => {
    node.ref = document.createElement(node.type);
    setProps(node);
    insertChildren(node.ref, node.props.children);
    replaceElement.replaceWith(node.ref);
};

/**
 * Finds first DOM node in component render tree
 * @param node
 */
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

/**
 * Applies remove operation
 * @param element
 * @param oldNode
 * @param newNode
 */
export const replaceNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
) => {
    if (isPrimitiveNodes(oldNode, newNode)) {
        switch (typeof newNode) {
            case 'string':
                element?.replaceWith(document.createTextNode(newNode));
                return;
            case 'number':
                element?.replaceWith(
                    document.createTextNode(newNode.toString()),
                );
                return;
            default:
                element.replaceWith(document.createTextNode(''));
                return;
        }
    }

    // Save DOM element that we will replace
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
            (<ReactsComponentNode>newNode).ref = element;
            (<ReactsComponent>(<ReactsComponentNode>newNode).instance).ref =
                element;
            (<ReactsComponentNode>newNode).instance?.componentDidMount();
            break;
        default:
            throw new Error('undefined type of node');
    }
};
