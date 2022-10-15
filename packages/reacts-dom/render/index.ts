import { VNodeType } from '../common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';

// TODO: rework
export const renderInDomElement = (root: Element, node: VNodeType) => {
    if (node['$$typeof'].description === DOM_ELEMENT_SYMBOL.description) {
        // @ts-ignore
        const element = document.createElement(node.type);

        if (typeof node.props.children === 'string') {
            element.innerHTML = node.props.children;
        } else {
            node.props.children?.forEach((elem: VNodeType) => {
                renderInDomElement(element, elem);
            });
        }

        for (let attr in node.props) {
            if (attr !== 'children') {
                // @ts-ignore
                element[attr] = node.props[attr];
            }
        }

        root.appendChild(element);
    } else {
        if (node._instance) {
            if (node._instance._baseElement) {
                renderInDomElement(
                    node._instance._baseElement,
                    node._instance.render(),
                );
            } else {
                throw new Error('node._instance._baseElement is empty');
            }
        } else {
            // @ts-ignore
            const instance = new node.type.prototype.constructor();
            node._instance = instance;
            // @ts-ignore
            node._instance._baseElement = root;
            renderInDomElement(root, instance.render());
        }
    }
};

export const rerenderElement = (element: Element, node: VNodeType) => {
    console.log(node);
    if (node.$$typeof == DOM_ELEMENT_SYMBOL && typeof node.type === 'string') {
        // element.replaceChildren(document.createElement(node.type));
        const tempElement = document.createElement(node.type);

        if (typeof node.props.children === 'string') {
            tempElement.innerText = node.props.children;
        } else {
            node.props.children?.forEach((elem: VNodeType) => {
                renderInDomElement(tempElement, elem);
            });
        }

        element.replaceChildren(tempElement);
    } else if (node.$$typeof === COMPONENT_ELEMENT_SYMBOL) {
        if (!node._instance) {
            // @ts-ignore
            node._instance = new node.type.prototype.constructor();
        }

        // @ts-ignore
        rerenderElement(element, node._instance.render());
    }
};
