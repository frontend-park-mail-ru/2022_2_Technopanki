import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsFunctionalComponentNode,
    ReactsNode,
    ReactsNotPrimitiveNode,
    ReactsPrimitiveNode,
} from '../../shared/types/node';
import { renderNode } from '../render/renderNode';
import { isPrimitive } from '../utils/isPrimitive';
import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
import { removeAllProps } from '../props/props';
import { removeChildren } from '../diff/operations/remove';
import { RootType } from '../../shared/types/component';

Object.defineProperty(Element.prototype, 'clearChildren', {
    configurable: true,
    enumerable: false,
    value: function () {
        while (this.firstChild) this.removeChild(this.lastChild);
    },
});

/**
 * Class that contains logic for mounting node in some root DOM element
 */
export default // @ts-ignore we just added private in unmount
class Root implements RootType {
    root: HTMLElement;
    node: ReactsNode;

    constructor(root: HTMLElement) {
        this.root = root;
    }

    /**
     * Unmounts previous node and renders new node in root
     * @param node
     */
    render(node: ReactsNode): void {
        this.unmount();
        renderNode(this.root, node);
        this.node = node;
    }

    private unmount() {
        if (isPrimitive(this.node)) {
            this.node = null;
            return;
        }

        switch ((<ReactsNotPrimitiveNode>this.node).$$typeof) {
            case DOM_SYMBOL:
                removeAllProps(this.node as ReactsDOMNode);
                removeChildren(this.node);
                (<ReactsDOMNode>this.node).ref?.remove();
                break;
            case COMPONENT_SYMBOL:
                (<ReactsComponentNode>(
                    this.node
                )).instance?.componentWillUnmount();
                (<ReactsComponentNode>this.node).instance?.unmount();
                removeChildren(this.node);
                break;
            default:
                throw new Error(`undefined type of node: ${this.node}`);
        }

        this.root.innerHTML = '';
    }
}
