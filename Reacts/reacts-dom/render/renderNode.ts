import {
    ChildrenType,
    ComponentConstructor,
    VNodeType,
} from '../../shared/common';
import {
    COMPONENT_NODE_SYMBOL,
    CONTEXT_NODE_SYMBOL,
    DOM_NODE_SYMBOL,
    PROVIDER_NODE_SYMBOL,
} from '../../shared';
import { setProps } from '../attributes';
import { Context } from '../../reacts/context';
import { setContextValue } from '../../reacts/context/context';

/**
 * Renders children in DOM
 * @param element
 * @param children
 */
const renderChildren = (
    element: HTMLElement,
    children: ChildrenType | undefined,
) => {
    if (children) {
        if (typeof children === 'string') {
            element.innerText = children;
        } else if (Array.isArray(children)) {
            children.forEach(node => {
                if (Array.isArray(node)) {
                    renderChildren(element, node);
                } else {
                    // @ts-ignore there will be no string type of node here,
                    // because in createNode(jsx-runtime lib) we bring all arrays
                    // of the type to one line using .join()
                    renderNode(element, node);
                }
            });
        } else {
            // @ts-ignore we checked if node,props.children is VNodeType[]
            renderNode(element, children);
        }
    }
};

/**
 * Creates DOM node and adds it in DOM
 * @param node
 */
const renderDomElement = (node: VNodeType & { type: string }): HTMLElement => {
    const element = document.createElement(node.type);
    node._domElement = element;

    setProps(element, node.props);
    if (node.props.children) {
        renderChildren(element, node.props.children);
    }

    return element;
};

/**
 * Creates Component instance and renders it in DOM
 * @param root
 * @param node
 */
const renderComponent = (
    root: HTMLElement,
    node: VNodeType & {
        props: { children: VNodeType };
        type: ComponentConstructor;
    },
) => {
    // Set instance fields
    node._domElement = root;
    if (node._instance) {
        node._instance.rootDomRef = root;
        node._instance.prevRenderVNodeRef = node.props.children;
    } else {
        if (__DEV__) {
            console.error('component node dont have instance: ', node);
            throw new Error('component node dont have instance');
        }
    }

    renderChildren(root, node.props.children);

    console.log(node);

    // @ts-ignore in development build we throw error
    node._instance?.componentDidMount();
};

/**
 * Creates Provider virtual dom node and renders it children
 * @param root
 * @param node
 */
const renderProvider = (root: HTMLElement, node: VNodeType) => {
    node._domElement = root;
    renderChildren(root, node.props.children);
};

/**
 * Creates Context(Consumer) virtual dom node and renders it children
 * @param root
 * @param node
 */
const renderContext = (root: HTMLElement, node: Context<any>) => {
    node._domElement = root;
    setContextValue(<Context<any>>node);

    // @ts-ignore in setContextValue we called a function
    // and assigned the children a specific value
    renderChildren(root, node.props.children);
};

/**
 * Renders virtual dome node inside root dom node
 * @param root
 * @param node
 */
export const renderNode = (root: HTMLElement, node: VNodeType) => {
    switch (node.$$typeof) {
        case DOM_NODE_SYMBOL:
            // @ts-ignore node.type guaranteed to be typeof string
            root.appendChild(renderDomElement(node));
            break;
        case COMPONENT_NODE_SYMBOL:
            // @ts-ignore node.type guaranteed to be typeof ComponentConstructor
            renderComponent(root, node);
            break;
        case PROVIDER_NODE_SYMBOL:
            renderProvider(root, node);
            break;
        case CONTEXT_NODE_SYMBOL:
            // @ts-ignore node type is Context
            renderContext(root, node);
            break;
        default:
            if (__DEV__) {
                console.error('node: ', node);
                throw new Error('undefined type of node');
            }
    }
};
