import { VNodeType } from '../common';
import { Operation } from './index';
import { skip } from './operations';

/**
 * Compares 2 VDom nodes and returns
 * the operation to be performed in the real one on this node in DOM
 * @param oldNode
 * @param newNode
 */
export const createDiff = (
    oldNode: VNodeType,
    newNode: VNodeType,
): Operation => {
    return skip();
};
