import { VNodeType } from '../common';
import { renderNode } from '../render/renderNode';

export interface RootType {
    render(node: VNodeType): void;
    unmount(): void;
}

class Root implements RootType {
    root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
    }

    render(node: VNodeType): void {
        renderNode(this.root, node);
    }

    unmount() {}
}

export function createRoot(root: HTMLElement | null): RootType {
    if (!root) {
        throw new Error(`Root element: ${root}`);
    }

    return new Root(root);
}
