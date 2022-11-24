import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
import {
    ChildrenType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { setProps } from '../props/props';

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

const renderDOMNode = (element: HTMLElement, node: ReactsDOMNode) => {
    const nodeDOMElement = document.createElement(node.type);
    node.ref = nodeDOMElement;
    setProps(node);

    if (node.props.children) {
        renderChildren(nodeDOMElement, node.props.children);
    }

    element.appendChild(nodeDOMElement);
};

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

export const renderNode = (root: HTMLElement, node: ReactsNode) => {
    if (!node || typeof node !== 'object') {
        switch (typeof node) {
            case 'string':
                root.appendChild(document.createTextNode(node));
                break;
            case 'number':
                root.appendChild(document.createTextNode(node.toString()));
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
        // TODO
        // case PROVIDER_NODE_SYMBOL:
        //     renderProvider(root, node);
        //     break;
        // case CONTEXT_NODE_SYMBOL:
        //     // @ts-ignore node type is Context
        //     renderContext(root, node);
        //     break;
        default:
            // @ts-ignore
            if (__DEV__) {
                console.error('node: ', node);
                throw new Error('undefined type of node');
            }
    }
};
