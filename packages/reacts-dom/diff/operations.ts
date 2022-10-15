import { Operation, Updater } from './index';

//
// Constants
// ----------------------------------------------------

export const SKIP_OPERATION = 'skip';
export const UPDATE_OPERATION = 'update';

//
// Helper functions
// ----------------------------------------------------

export const skip = (): Operation => ({
    type: SKIP_OPERATION,
});

export const update = (
    attrUpdater: Updater,
    childrenUpdater: Updater,
): Operation => ({
    type: UPDATE_OPERATION,
    attrUpdater,
    childrenUpdater,
});
