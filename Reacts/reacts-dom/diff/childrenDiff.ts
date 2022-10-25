import { ChildrenType, KeyType, VNodeType } from '../../shared/common';
import { Operation } from './index';
import { emptyAttrUpdate, insert, remove, skip, update } from './operations';
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
    oldChildren: [KeyType, VNodeType][],
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
    newChildren: [KeyType, VNodeType][],
    key: KeyType,
) => {
    while (newChildren[0] && newChildren[0][0] !== key) {
        operations.push(insert(newChildren[0][1]));
        newChildren.shift();
    }
};

// TODO: refactor
// в данный момент мы каждый раз создаем доп массивы. Возможно можно сделать оптимальнее
const findNextUpdateKey = (
    oldChildrenWithKeys: [KeyType, VNodeType][],
    newChildrenWithKeys: [KeyType, VNodeType][],
): KeyType => {
    const oldChildrenKeys = oldChildrenWithKeys.map(node => node[0]);
    const newChildrenKeys = newChildrenWithKeys.map(node => node[0]);

    return newChildrenKeys.find(k => oldChildrenKeys.indexOf(k) !== -1) || null;
};

/**
 * Compares old and new children
 * @param oldChildren
 * @param newChildren
 * @return - operations to be performed on children
 */
export const childrenDiff = (
    oldChildren: VNodeType[],
    newChildren: VNodeType[],
): Operation[] => {
    console.log('sdf');
    const operations: Operation[] = [];

    const oldChildrenWithKeys = oldChildren.map(
        (node: VNodeType): [KeyType, VNodeType] => [node.key, node],
    );
    const newChildrenWithKeys = newChildren.map(
        (node: VNodeType): [KeyType, VNodeType] => [node.key, node],
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
