import { AttributeUpdater, Operation } from './index';
import { VNodeType } from '../../shared/common';

export const SKIP_OPERATION = 'skip';
export const UPDATE_OPERATION = 'update';
export const REPLACE_OPERATION = 'replace';
export const REMOVE_OPERATION = 'remove';
export const INSERT_OPERATION = 'append';

export const skip = (): Operation => ({
    type: SKIP_OPERATION,
});

export const update = (
    attrUpdater: AttributeUpdater,
    childrenUpdater: Operation[],
): Operation => ({
    type: UPDATE_OPERATION,
    attrUpdater,
    childrenUpdater,
});

export const replace = (newNode: VNodeType) => ({
    type: REPLACE_OPERATION,
    node: newNode,
});

export const remove = () => ({
    type: REMOVE_OPERATION,
});

export const insert = (node: VNodeType) => ({
    type: INSERT_OPERATION,
    node,
});

//
// Helper objects
// ----------------------------------------------------

export const emptyAttrUpdate: AttributeUpdater = {
    remove: [],
    set: [],
    update: [],
};
