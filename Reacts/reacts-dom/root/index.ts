import { VNodeType } from '../../shared/common';
import { renderNode } from '../render/renderNode';

/**
 * RootType object interface
 */
export interface RootType {
    render(node: VNodeType): void;
    unmount(): void;
}

/**
 * The class that is responsible for rendering
 * the tree root of the virtual tree in DOM
 */
class Root implements RootType {
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
    }

    /**
     * Render node in root DOM node
     * @param node
     */
    render(node: VNodeType): void {
        renderNode(this.root, node);
    }

    unmount() {}
}

/**
 * Creates Root instance
 * @param root
 */
export function createRoot(root: HTMLElement | null): RootType {
    if (!root) {
        throw new Error(`Root element: ${root}`);
    }

    return new Root(root);
}
