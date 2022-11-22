import {
    InsertOperation,
    Operation,
    RemoveOperation,
    ReplaceOperation,
    UpdateOperation,
} from './types';
import {
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations/operations';
import { insertNode } from './operations/insert';
import { removeNode } from './operations/remove';
import { updateNode } from './operations/update';
import { replaceNode } from './operations/replace';

export const applyDiff = (element: HTMLElement, operation: Operation) => {
    switch (operation.type) {
        case SKIP_OPERATION:
            return;
        case INSERT_OPERATION:
            insertNode(element, (<InsertOperation>operation).node);
            return;
        case REMOVE_OPERATION:
            removeNode(element, (<RemoveOperation>operation).node);
            return;
        case REPLACE_OPERATION:
            // TODO: replace operation
            console.log('from applyDiff');
            replaceNode(
                element,
                (<ReplaceOperation>operation).oldNode,
                (<ReplaceOperation>operation).newNode,
                element.nextElementSibling as HTMLElement,
            );
            return;
        case UPDATE_OPERATION:
            updateNode(element, operation as UpdateOperation);
    }
};
