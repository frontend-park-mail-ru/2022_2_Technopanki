import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
import {
    ChildrenType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { setProps } from '../props/props';

/**
 * Renders children of node
 * @param element
 * @param children
 */
const renderChildren = (element: HTMLElement, children: ChildrenType) => {
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (Array.isArray(child)) {
                renderChildren(element, child);
            } else {
                renderNode(element, child);
            }
        });
    } else {
        renderNode(element, children);
    }
};

/**
 * Renders DOM node
 * @param element
 * @param node
 */
const renderDOMNode = (element: HTMLElement, node: ReactsDOMNode) => {
    const nodeDOMElement = document.createElement(node.type);
    node.ref = nodeDOMElement;
    setProps(node);

    if (node.props.children) {
        renderChildren(nodeDOMElement, node.props.children);
    }

    element.appendChild(nodeDOMElement);
};

/**
 * Creates instance of component and calls render children
 * @param root
 * @param node
 */
const renderComponent = (root: HTMLElement, node: ReactsComponentNode) => {
    node.ref = root;
    if (node.instance) {
        node.instance.ref = root;
        node.instance.currentNode = node;
    } else {
        // @ts-ignore
        if (__DEV__) {
            console.error('component node dont have instance: ', node);
            throw new Error('component node dont have instance');
        }
    }
    renderChildren(root, node.props.children);
    node.instance?.componentDidMount();
};

/**
 * Render switcher
 * @param root
 * @param node
 */
export const renderNode = (root: HTMLElement, node: ReactsNode) => {
    if (!node || typeof node !== 'object') {
        switch (typeof node) {
            case 'string':
                root.appendChild(document.createTextNode(node));
                break;
            case 'number':
                root.appendChild(document.createTextNode(node.toString()));
                break;
            default:
                root.appendChild(document.createTextNode(''));
                break;
        }
        return;
    }

    switch (node.$$typeof) {
        case DOM_SYMBOL:
            // @ts-ignore node guaranteed to be typeof ReactsDOMNode
            renderDOMNode(root, node);
            break;
        case COMPONENT_SYMBOL:
            // @ts-ignore node guaranteed to be typeof ReactsComponentNode
            renderComponent(root, node);
            break;
        default:
            // @ts-ignore
            if (__DEV__) {
                console.error('node: ', node);
                throw new Error('undefined type of node');
            }
    }
};
