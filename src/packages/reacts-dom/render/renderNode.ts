import {
    ChildrenType,
    ComponentConstructor,
    ComponentType,
    PropsType,
    VNodeType,
} from '../../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';

// TODO: rework to setAttributes
export const setAttributes = (element: HTMLElement, props: PropsType) => {
    for (let attr in props) {
        if (attr !== 'children') {
            // @ts-ignore
            element[attr] = props[attr];
        }
    }
};

// Здесь пофиксить баг с <p>Item {this.props.someData}</p>
const renderChildren = (element: HTMLElement, children: ChildrenType) => {
    if (children) {
        if (typeof children === 'string') {
            element.innerText = children;
        } else if (Array.isArray(children)) {
            children.forEach((node: VNodeType) => {
                renderNode(element, node);
            });
        } else {
            // @ts-ignore we checked if node,props.children is VNodeType[]
            renderNode(element, children);
        }
    }
};

const renderDomElement = (node: VNodeType & { type: string }): HTMLElement => {
    const element = document.createElement(node.type);
    node._domElement = element;

    setAttributes(element, node.props);
    if (node.props.children) {
        renderChildren(element, node.props.children);
    }

    return element;
};

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
