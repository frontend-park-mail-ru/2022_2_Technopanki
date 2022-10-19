import {
    ChildrenType,
    ComponentConstructor,
    ComponentType,
    PropsType,
    VNodeType,
} from '../../shared/common';
import { COMPONENT_ELEMENT_SYMBOL, DOM_ELEMENT_SYMBOL } from '../../shared';

// TODO: rework to setAttributes
export const setAttributes = (element: HTMLElement, props: PropsType) => {
    for (let attr in props) {
        if (attr !== 'children') {
            // @ts-ignore
            element[attr] = props[attr];
        }
    }
};

/**
 * Renders children in DOM
 * @param element
 * @param children
 */
const renderChildren = (element: HTMLElement, children: ChildrenType) => {
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

    setAttributes(element, node.props);
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
    node: VNodeType & { type: ComponentConstructor },
): ComponentType => {
    const instance = new node.type(node.props);

    // Set instance fields
    node._domElement = root;
    instance.rootDomRef = root;
    instance.prevRenderVNodeRef = instance.render();

    renderNode(root, instance.prevRenderVNodeRef);
    return instance;
};

/**
 * Renders virtual dome node inside root dom node
 * @param root
 * @param node
 */
export const renderNode = (root: HTMLElement, node: VNodeType) => {
    if (node.$$typeof === DOM_ELEMENT_SYMBOL) {
        // @ts-ignore node.type guaranteed to be typeof string
        root.appendChild(renderDomElement(node));
    } else if (node.$$typeof === COMPONENT_ELEMENT_SYMBOL) {
        // @ts-ignore node.type guaranteed to be typeof ComponentConstructor
        renderComponent(root, node);
    } else {
        if (node.props.children) {
            renderChildren(root, node.props.children);
        }
    }
};
