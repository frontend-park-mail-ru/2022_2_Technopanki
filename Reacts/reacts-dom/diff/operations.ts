import {
    AttributeUpdater,
    Insert,
    Operation,
    Remove,
    Replace,
    Update,
} from './index';
import { VNodeType } from '../../shared/common';

export const SKIP_OPERATION = 'skip';
export const UPDATE_OPERATION = 'update';
export const REPLACE_OPERATION = 'replace';
export const REMOVE_OPERATION = 'remove';
export const INSERT_OPERATION = 'insert';

/**
 * Skip operation for diff algorithm
 */
export const skip = (): Operation => ({
    type: SKIP_OPERATION,
});

/**
 * Update operation for diff algorithm
 */
export const update = (
    attrUpdater: AttributeUpdater,
    childrenUpdater: Operation[],
    node: VNodeType,
): Update => ({
    type: UPDATE_OPERATION,
    attrUpdater,
    childrenUpdater,
    node,
});

/**
 * Remove operation for diff algorithm
 */
export const remove = (node: VNodeType): Remove => ({
    type: REMOVE_OPERATION,
    node,
});

/**
 * Insert operation for diff algorithm
 * @param node
 */
export const insert = (node: VNodeType): Insert => ({
    type: INSERT_OPERATION,
    node: node,
});

/**
 * Replace operation for diff algorithm
 * @param oldNode
 * @param newNode
 */
export const replace = (oldNode: VNodeType, newNode: VNodeType): Replace => ({
    type: REPLACE_OPERATION,
    remove: remove(oldNode),
    insert: insert(newNode),
});

//
// Helper objects
// ----------------------------------------------------

export const emptyAttrUpdate: AttributeUpdater = {
    remove: [],
    set: [],
    update: [],
};
