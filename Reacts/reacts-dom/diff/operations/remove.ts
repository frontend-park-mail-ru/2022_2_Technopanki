import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
    ReactsNotPrimitiveNode,
    ReactsPrimitiveNode,
} from '../../../shared/types/node';
import {
    COMPONENT_SYMBOL,
    DOM_SYMBOL,
} from '../../../shared/constants/symbols';
import { removeAllProps } from '../../props/props';
import { isPrimitive } from '../../utils/isPrimitive';
import { isArray } from '../../utils/isArray';

const removePrimitiveNode = (
    element: HTMLElement,
    node: ReactsPrimitiveNode,
) => {
    element && element.remove();
    node = null;
    return;
};

const removeDOMNode = (node: ReactsDOMNode) => {
    removeAllProps(node as ReactsDOMNode);
    node.ref?.remove();
    node.ref = null;
};

const removeComponentNode = (node: ReactsComponentNode) => {
    node.instance?.componentWillUnmount();
    node.instance?.unmount();
};

const childrenSwitch = (node: ReactsNode) => {
    if (isPrimitive(node)) {
        return;
    }

    switch ((<ReactsNotPrimitiveNode>node).$$typeof) {
        case DOM_SYMBOL:
            removeDOMNode(node as ReactsDOMNode);
            break;
        case COMPONENT_SYMBOL:
            removeComponentNode(node as ReactsComponentNode);
            break;
    }

    removeChildren(node);
};

export const removeChildren = (node: ReactsNode) => {
    if (isPrimitive(node)) {
        // We don't remove primitive children, because GC does all work for us
        return;
    }

    if (
        (<ReactsNotPrimitiveNode>node).props &&
        isArray((<ReactsNotPrimitiveNode>node).props.children)
    ) {
        (<ReactsNode[]>(<ReactsNotPrimitiveNode>node).props.children).forEach(
            child => {
                if (isArray(child)) {
                    return (<ReactsNode[]>(<unknown>child)).forEach(
                        nestedChild => childrenSwitch(nestedChild),
                    );
                }

                return childrenSwitch(child);
            },
        );
    } else {
        childrenSwitch(
            (<ReactsNotPrimitiveNode>node).props?.children as ReactsNode,
        );
    }
};

export const removeNode = (element: HTMLElement, node: ReactsNode) => {
    if (isPrimitive(node)) {
        removePrimitiveNode(element, node as ReactsPrimitiveNode);
        return;
    }

    switch ((<ReactsNotPrimitiveNode>node).$$typeof) {
        case DOM_SYMBOL:
            removeDOMNode(node as ReactsDOMNode);
            break;
        case COMPONENT_SYMBOL:
            removeComponentNode(<ReactsComponentNode>node);
            break;
        default:
            throw new Error(`undefined type of node: ${node}`);
    }

    removeChildren(node);
    (<ReactsNotPrimitiveNode>node).ref = null;
    (<ReactsNotPrimitiveNode>node).props.children = null;
};
