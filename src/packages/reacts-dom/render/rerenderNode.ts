import { VNodeType } from '../../shared/common';
import { createDiff } from '../diff/createDiff';
import { applyDiff } from '../diff/applyDiff';

export const rerenderNode = (
    element: HTMLElement,
    oldNode: VNodeType & { _domElement: HTMLElement },
    newNode: VNodeType,
) => {
    const diff = createDiff(oldNode, newNode);
    console.log(diff);
    applyDiff(oldNode._domElement, diff);
    newNode._domElement = oldNode._domElement;
};
