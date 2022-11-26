import { ReactsNode } from '../../../shared/types/node';
import {
    InsertOperation,
    Operation,
    PropsUpdater,
    RemoveOperation,
    ReplaceOperation,
    SkipOperation,
    UpdateOperation,
} from '../types';

export const UPDATE_OPERATION = 'UPDATE';
export const REPLACE_OPERATION = 'REPLACE';
export const SKIP_OPERATION = 'SKIP';
export const REMOVE_OPERATION = 'REMOVE';
export const INSERT_OPERATION = 'INSERT';

export const emptyAttributeUpdater: PropsUpdater = {
    set: [],
    remove: [],
};

export const update = (
    node: ReactsNode,
    childUpdater: Operation | Operation[],
    attrUpdater: PropsUpdater = emptyAttributeUpdater,
): UpdateOperation => ({
    type: UPDATE_OPERATION,
    node: node,
    childrenUpdater: childUpdater,
    attrUpdater: attrUpdater,
});

export const replace = (
    oldNode: ReactsNode,
    newNode: ReactsNode,
): ReplaceOperation => ({
    type: REPLACE_OPERATION,
    oldNode,
    newNode,
});

export const skip = (): SkipOperation => ({ type: SKIP_OPERATION });

export const remove = (node: ReactsNode): RemoveOperation => ({
    type: REMOVE_OPERATION,
    node: node,
});

export const insert = (node: ReactsNode): InsertOperation => ({
    type: INSERT_OPERATION,
    node: node,
});
