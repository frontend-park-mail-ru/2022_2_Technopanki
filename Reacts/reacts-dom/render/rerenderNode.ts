import { ReactsNode } from '../../shared/types/node';
import { createDiff } from '../diff/createDiff';
import { applyDiff } from '../diff/applyDiff';
import {
    REMOVE_OPERATION,
    REPLACE_OPERATION,
} from '../diff/operations/operations';

export const rerenderNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
) => {
    const diff = createDiff(oldNode, newNode);
    console.log(diff);
    if (diff.type !== REPLACE_OPERATION && diff.type !== REMOVE_OPERATION) {
        // @ts-ignore
        newNode.ref = oldNode.ref;
    }
    applyDiff(element, diff);
};
