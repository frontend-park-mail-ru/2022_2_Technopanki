import { ChildrenType, KeyType, VNodeType } from '../common';
import { Operation } from './index';
import { emptyAttrUpdate, insert, remove, skip, update } from './operations';
import { createDiff } from './createDiff';

const removeUntilKey = (
    operations: Operation[],
    oldChildren: [KeyType, VNodeType][],
    key: KeyType,
) => {
    while (oldChildren[0] && oldChildren[0][0] !== key) {
        operations.push(remove());
        oldChildren.shift();
    }
};

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

    // return oldChildrenKeys.find(
    //     k => newChildrenKeys.map(node => node[0]).indexOf(k[0]) !== -1,
    // );

    return (
        oldChildrenKeys.find(
            k =>
                // @ts-ignore
                newChildrenKeys.indexOf(k) !== -1,
        ) || null
    );
};

export const childrenDiff = (
    oldChildren: ChildrenType,
    newChildren: ChildrenType,
): Operation[] => {
    const operations: Operation[] = [];

    if (Array.isArray(oldChildren) && Array.isArray(newChildren)) {
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
    } else {
        throw new Error(`not array: ${oldChildren}, ${newChildren}`);
    }

    return operations;
};
