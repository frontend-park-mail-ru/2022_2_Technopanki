import {
    ChildrenType,
    ComponentConstructor,
    ComponentType,
    ConstructorType,
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

const renderChildren = (element: HTMLElement, children: ChildrenType) => {
    if (children) {
        if (typeof children === 'string') {
            element.innerText = children;
        } else if (children.constructor === Array) {
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
    renderChildren(element, node.props.children);

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
    if (node.$$typeof.description === DOM_ELEMENT_SYMBOL.description) {
        // @ts-ignore node.type guaranteed to be typeof string
        root.appendChild(renderDomElement(node));
    } else if (
        node.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description
    ) {
        // @ts-ignore node.type guaranteed to be typeof ComponentConstructor
        renderComponent(root, node);
    }
};
