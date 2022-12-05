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
import { replaceNode } from './operations/replace';
import { insertNode } from './operations/insert';
import { removeNode } from './operations/remove';
import { applyDiff } from './applyDiff';
import { isArray } from '../utils/isArray';
import { ReactsNotPrimitiveNode } from '../../shared/types/node';

/**
 * Applies diff for every DOM node child
 * @param element
 * @param operations
 * @param startOffset
 */
export const applyChildrenDiff = (
    element: HTMLElement,
    operations: Operation[],
    startOffset: number = 0,
) => {
    let offset = startOffset;
    for (let i = 0; i < operations.length; ++i) {
        if (operations[i].type === SKIP_OPERATION) {
            continue;
        }

        const operation = operations[i];
        const childElem = element.childNodes[i + offset] as HTMLElement;

        if (operation.type === REPLACE_OPERATION) {
            replaceNode(
                childElem,
                (<ReplaceOperation>operation).oldNode,
                (<ReplaceOperation>operation).newNode,
            );
            continue;
        }

        if (operation.type === INSERT_OPERATION) {
            insertNode(element, (<InsertOperation>operation).node, childElem);
            continue;
        }

        if (operation.type === REMOVE_OPERATION) {
            removeNode(childElem, (<RemoveOperation>operation).node);
            offset--;
            continue;
        }

        if (operation.type === UPDATE_OPERATION) {
            applyDiff(
                (<ReactsNotPrimitiveNode>(<UpdateOperation>operation).node)
                    .ref as HTMLElement,
                operation,
            );
            continue;
        }

        if (isArray(operation)) {
            applyChildrenDiff(element, <Operation[]>(<unknown>operation), i);
            continue;
        }

        throw new Error('undefined type of operation');
    }
};
