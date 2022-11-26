import {
    ChildrenType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsEmptyNode,
    ReactsFunctionalComponentNode,
    ReactsNode,
    ReactsTextNode,
} from '../../../shared/types/node';
import { isPrimitive } from '../../utils/isPrimitive';
import {
    COMPONENT_SYMBOL,
    DOM_SYMBOL,
} from '../../../shared/constants/symbols';
import { setProps } from '../../props/props';

export const insertPrimitiveNode = (
    element: HTMLElement,
    node: ReactsTextNode | ReactsEmptyNode,
    beforeElement: HTMLElement | null = null,
) => {
    let nodeDOM: Node | null = null;
    switch (typeof node) {
        case 'number':
            nodeDOM = document.createTextNode(node.toString());
            element.insertBefore(nodeDOM, beforeElement);
            return;
        case 'string':
            nodeDOM = document.createTextNode(node);
            element.insertBefore(nodeDOM, beforeElement);
            return;
        default:
            element.insertBefore(document.createTextNode(''), beforeElement);
            return;
    }
};

export const insertChildren = (
    element: HTMLElement,
    children: ChildrenType,
    beforeElement: HTMLElement | null = null,
) => {
    if (!children) {
        return;
    }

    Array.isArray(children)
        ? children.forEach(child => {
              insertNode(element, child, beforeElement);
          })
        : insertNode(element, children, beforeElement);
};

export const insertDOMNode = (
    element: HTMLElement,
    node: ReactsDOMNode,
    beforeElement: HTMLElement | null = null,
) => {
    node.ref = document.createElement(node.type);
    setProps(node);
    element.insertBefore(node.ref, beforeElement);
    insertChildren(node.ref, node.props.children);
};

export const insertComponentNode = (
    element: HTMLElement,
    node: ReactsComponentNode,
    beforeElement: HTMLElement | null = null,
) => {
    node.ref = element;
    if (node.instance) {
        node.instance.ref = element;
        node.instance.currentNode = node;
    } else {
        // TODO: __DEV__
    }

    insertChildren(element, node.props.children, beforeElement);
    node.instance?.componentDidMount();
};

export const insertNode = (
    element: HTMLElement,
    node: ReactsNode,
    beforeElement: HTMLElement | null = null,
) => {
    if (isPrimitive(node)) {
        insertPrimitiveNode(
            element,
            node as ReactsTextNode | ReactsEmptyNode,
            beforeElement,
        );
        return;
    }

    switch (
        (<ReactsComponentNode | ReactsFunctionalComponentNode | ReactsDOMNode>(
            node
        )).$$typeof
    ) {
        case DOM_SYMBOL:
            insertDOMNode(element, node as ReactsDOMNode, beforeElement);
            break;
        case COMPONENT_SYMBOL:
            insertComponentNode(
                element,
                node as ReactsComponentNode,
                beforeElement,
            );
            break;
        default:
            // @ts-ignore TODO: __DEV__
            throw new Error(`undefined type of node: ${node.$$typeof}`);
    }
};
