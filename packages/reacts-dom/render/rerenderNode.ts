import { VNodeType } from '../common';
import { createDiff } from '../diff/createDiff';
import { SKIP_OPERATION, UPDATE_OPERATION } from '../diff/operations';
import { applyChildrenDiff, applyDiff } from '../diff/applyDiff';

export const rerenderNode = (
    element: HTMLElement,
    oldNode: VNodeType,
    newNode: VNodeType,
) => {
    const diff = createDiff(oldNode, newNode);
    applyDiff(element, diff);
    // let root = element;
    // console.log(diff);
    //
    // if (diff.type === SKIP_OPERATION) {
    //     return;
    // }
    //
    // if (diff.type === UPDATE_OPERATION) {
    //     if (oldNode._domElement) {
    //         newNode._domElement = oldNode._domElement;
    //         root = newNode._domElement;
    //     }
    //
    //     const nodesArr: string | any[] | Node = [];
    //     // @ts-ignore
    //     console.log(diff);
    //     applyChildrenDiff(root, diff.childrenUpdater);

    // console.log(nodesArr, element);
    // element.replaceChildren(...nodesArr);
};
