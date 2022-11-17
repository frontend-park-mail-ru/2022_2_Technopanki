import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsFunctionalComponentNode,
    ReactsNode,
} from '../../shared/types/node';
import { renderNode } from '../render/renderNode';
import { removeNode } from '../diff/operations/remove';
import { isPrimitive } from '../utils/isPrimitive';
import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
import { removeAllProps } from '../props/props';

export interface RootType {
    render(node: ReactsNode): void;
    unmount(): void;
}

export default class Root implements RootType {
    root: HTMLElement;
    node: ReactsNode;

    constructor(root: HTMLElement) {
        this.root = root;
    }

    render(node: ReactsNode): void {
        this.unmount();
        renderNode(this.root, node);
        this.node = node;
    }

    unmount() {
        if (isPrimitive(this.node)) {
            this.node = null;
            return;
        }

        switch (
            (<
                | ReactsComponentNode
                | ReactsFunctionalComponentNode
                | ReactsDOMNode
            >this.node).$$typeof
        ) {
            case DOM_SYMBOL:
                removeAllProps(this.node as ReactsDOMNode);
                (<ReactsDOMNode>this.node).ref?.remove();
                break;
            case COMPONENT_SYMBOL:
                // TODO
                (<ReactsComponentNode>(
                    this.node
                )).instance.componentWillUnmount();
                (<ReactsComponentNode>this.node).instance.unmount();
                break;
            default:
                throw new Error(`undefined type of node: ${this.node}`);
        }
    }
}
