import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsFunctionalComponentNode,
    ReactsNode,
} from '../../../shared/types/node';
import {
    COMPONENT_SYMBOL,
    DOM_SYMBOL,
} from '../../../shared/constants/symbols';
import { removeAllProps } from '../../props/props';
import { isPrimitive } from '../../utils/isPrimitive';

export const removeNode = (element: HTMLElement, node: ReactsNode) => {
    element.remove();

    if (isPrimitive(node)) {
        node = null;
        return;
    }

    switch (
        (<ReactsComponentNode | ReactsFunctionalComponentNode | ReactsDOMNode>(
            node
        )).$$typeof
    ) {
        case DOM_SYMBOL:
            removeAllProps(node as ReactsDOMNode);
            (<ReactsDOMNode>node).ref?.remove();
            break;
        case COMPONENT_SYMBOL:
            // TODO
            (<ReactsComponentNode>node).instance.componentWillUnmount();
            (<ReactsComponentNode>node).instance.unmount();
            break;
        default:
            throw new Error(`undefined type of node: ${node}`);
    }
};
