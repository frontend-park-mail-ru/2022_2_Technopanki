import { VNodeType } from '../../shared/common';
import { createDiff } from '../diff/createDiff';
import { applyDiff } from '../diff/applyDiff';

/**
 * Renders newNode in DOM
 * @param element
 * @param oldNode
 * @param newNode
 */
export const rerenderNode = (
    element: HTMLElement,
    oldNode: VNodeType & { _domElement: HTMLElement },
    newNode: VNodeType,
) => {
    console.log(oldNode);
    const diff = createDiff(oldNode, newNode);
    applyDiff(oldNode._domElement, diff);
    newNode._domElement = oldNode._domElement;
};
