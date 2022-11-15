import { Operation } from './types';
import {
    ChildrenType,
    KeyType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { insert, remove } from './operations/operations';
import { createDiff } from './createDiff';

/**
 * Adds remove operation to operations and removes elements from oldChildren
 * until finds children with key
 * @param operations
 * @param oldChildren
 * @param key
 */
const removeUntilKey = (
    operations: Operation[],
    oldChildren: [KeyType, ReactsNode][],
    key: KeyType,
) => {
    while (oldChildren[0] && oldChildren[0][0] !== key) {
        operations.push(remove(oldChildren[0][1]));
        oldChildren.shift();
    }
};

/**
 * Adds insert operation to operations and removes elements from oldChildren
 * until finds children with key
 * @param operations
 * @param newChildren
 * @param key
 */
const insertUntilKey = (
    operations: Operation[],
    newChildren: [KeyType, ChildrenType][],
    key: KeyType,
) => {
    while (newChildren[0] && newChildren[0][0] !== key) {
        operations.push(insert(newChildren[0][1]));
        newChildren.shift();
    }
};

export const findNextUpdateKey = (
    oldChildrenWithKeys: [KeyType, ReactsComponentNode | ReactsDOMNode][],
    newChildrenWithKeys: [KeyType, ReactsComponentNode | ReactsDOMNode][],
): KeyType => {
    const oldChildrenKeys = oldChildrenWithKeys.map(node => node[0]);
    const newChildrenKeys = newChildrenWithKeys.map(node => node[0]);

    return newChildrenKeys.find(k => oldChildrenKeys.indexOf(k) !== -1) || null;
};

export const arrayChildrenDiff = (
    oldChildren: ReactsDOMNode[] | ReactsComponentNode[],
    newChildren: ReactsDOMNode[] | ReactsComponentNode[],
): Operation[] => {
    let operations: Operation[] = [];

    const oldChildrenWithKeys = oldChildren.map(
        (
            node: ReactsComponentNode | ReactsDOMNode,
        ): [KeyType, ReactsComponentNode | ReactsDOMNode] => [node.key, node],
    );

    const newChildrenWithKeys = newChildren.map(
        (
            node: ReactsComponentNode | ReactsDOMNode,
        ): [KeyType, ReactsComponentNode | ReactsDOMNode] => [node.key, node],
    );

    let nextUpdateKey = findNextUpdateKey(
        oldChildrenWithKeys,
        newChildrenWithKeys,
    );

    while (nextUpdateKey) {
        removeUntilKey(operations, oldChildrenWithKeys, nextUpdateKey);
        insertUntilKey(operations, newChildrenWithKeys, nextUpdateKey);

        operations.push(
            createDiff(
                // @ts-ignore guaranteed to be an element
                oldChildrenWithKeys.shift()[1],
                // @ts-ignore guaranteed to be an element
                newChildrenWithKeys.shift()[1],
            ),
        );

        nextUpdateKey = findNextUpdateKey(
            oldChildrenWithKeys,
            newChildrenWithKeys,
        );
    }

    removeUntilKey(operations, oldChildrenWithKeys, nextUpdateKey);
    insertUntilKey(operations, newChildrenWithKeys, nextUpdateKey);

    return operations;
};

export const childrenDiff = (
    oldChildren: ReactsNode[],
    newChildren: ReactsNode[],
): Operation[] => {
    let operations: Operation[] = [];

    for (let i = 0; i < oldChildren.length; ++i) {
        if (Array.isArray(oldChildren[i]) && Array.isArray(newChildren[i])) {
            operations.push(arrayChildrenDiff(oldChildren[i], newChildren[i]));
        } else {
            operations.push(createDiff(oldChildren[i], newChildren[i]));
        }
    }

    return operations;
};
