import {
    ChildrenType,
    ComponentType,
    ConstructorType,
    PropsType,
    VNodeType,
} from '../common';
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

const renderComponentFirstTime = (
    root: HTMLElement,
    constructor: ConstructorType<any>,
): ComponentType => {
    const instance = new constructor();

    // Set instance fields
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
        const element = document.createElement(node.type);
        node._domElement = element;

        setAttributes(element, node.props);
        renderChildren(element, node.props.children);

        root.appendChild(element);
    } else if (
        node.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description
    ) {
        if (node._instance) {
            if (node._instance.rootDomRef) {
                renderNode(node._instance.rootDomRef, node._instance.render());
            } else {
                throw new Error('node._instance._baseElement is empty');
            }
        } else {
            node._instance = renderComponentFirstTime(
                root,
                // @ts-ignore node.type guaranteed to be typeof ComponentType
                node.type.prototype.constructor,
            );
        }
    }
};
