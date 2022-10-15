import { VNodeType } from '../common';
import { renderNode } from '../render/index';

export interface RootType {
    render(node: VNodeType): void;
    unmount(): void;
}

class Root implements RootType {
    root: Element;
    constructor(root: Element) {
        this.root = root;
    }

    render(node: VNodeType): void {
        renderNode(this.root, node);
    }

    unmount() {}
}

export function createRoot(root: Element | null): RootType {
    if (!root) {
        throw new Error(`Root element: ${root}`);
    }

    return new Root(root);
}
