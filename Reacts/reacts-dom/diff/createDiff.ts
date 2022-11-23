import {
    ChildrenType,
    PropsWithChildren,
    PropType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { Operation, PropsUpdater } from './types';
import {
    insert,
    remove,
    replace,
    skip,
    SKIP_OPERATION,
    update,
} from './operations/operations';
import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
import { childrenDiff } from './childrenDiff';
import { isPrimitiveNodes } from '../utils/isPrimitive';

/**
 * A function that compares object props and returns
 * attribute lists and what to do with them
 * @param oldProps
 * @param newProps
 */
export const compareProps = (
    oldProps: PropsWithChildren,
    newProps: PropsWithChildren,
): PropsUpdater => {
    let set: [string, PropType][] = [];
    let remove: [string, PropType][] = [];

    for (let attr in oldProps) {
        if (attr! in newProps && attr !== 'children') {
            remove.push([attr, oldProps[attr]]);
        }
    }

    for (let attr in newProps) {
        if (
            (attr! in oldProps ||
                (attr in oldProps && oldProps[attr] !== newProps[attr])) &&
            attr !== 'children'
        ) {
            set.push([attr, newProps[attr]]);
        }
    }
    return {
        set,
        remove,
    };
};

export const createDiffPrimitive = (
    oldNode: ReactsNode,
    newNode: ReactsNode,
): Operation => {
    if (oldNode === newNode) {
        return skip();
    }

    if (!oldNode && newNode) {
        return insert(newNode);
    } else if (oldNode && !newNode) {
        return remove(oldNode);
    } else if (oldNode !== newNode) {
        return replace(oldNode, newNode);
    }

    return skip();
};

export const createDiffForChildren = (
    oldChildren: ChildrenType,
    newChildren: ChildrenType,
): Operation | Operation[] => {
    if (!Array.isArray(oldChildren) && !Array.isArray(newChildren)) {
        return createDiff(oldChildren, newChildren);
    }

    return childrenDiff(
        Array.isArray(oldChildren) ? oldChildren : [oldChildren],
        Array.isArray(newChildren) ? newChildren : [newChildren],
    );
};

const isEmptyPropsUpdater = (propsUpdater: PropsUpdater): boolean => {
    return propsUpdater.set.length === 0 && propsUpdater.remove.length === 0;
};

const shouldSkip = (
    propsUpdater: PropsUpdater,
    childrenDiff: Operation | Operation[],
): boolean => {
    return (
        isEmptyPropsUpdater(propsUpdater) &&
        ((<Operation>childrenDiff).type === SKIP_OPERATION ||
            (Array.isArray(childrenDiff) &&
                !childrenDiff.find(operation => {
                    if (Array.isArray(operation)) {
                        return operation.find(
                            operation => operation.type !== SKIP_OPERATION,
                        );
                    } else {
                        return operation.type !== SKIP_OPERATION;
                    }
                })))
    );
};

// TODO: refactor
export const createDiffComponent = (
    oldNode: ReactsComponentNode,
    newNode: ReactsComponentNode,
): Operation => {
    if (oldNode.type !== newNode.type) {
        return replace(oldNode, newNode);
    }

    if (!oldNode.instance?.shouldUpdate(newNode.instance?.props)) {
        return skip();
    }

    const propsUpdater = compareProps(oldNode.props, newNode.props);
    const childrenDiff: Operation | Operation[] = createDiffForChildren(
        oldNode.props.children,
        newNode.props.children,
    );

    if (shouldSkip(propsUpdater, childrenDiff)) {
        return skip();
    }

    newNode.ref = oldNode.ref;
    return update(
        newNode,
        createDiffForChildren(oldNode.props.children, newNode.props.children),
        propsUpdater,
    );
};

// TODO: refactor
export const createDiffDOM = (
    oldNode: ReactsDOMNode,
    newNode: ReactsDOMNode,
): Operation => {
    if (oldNode.type !== newNode.type) {
        return replace(oldNode, newNode);
    }

    const propsUpdater = compareProps(oldNode.props, newNode.props);
    const childrenDiff: Operation | Operation[] = createDiffForChildren(
        oldNode.props.children,
        newNode.props.children,
    );

    newNode.ref = oldNode.ref;
    newNode.eventMap = oldNode.eventMap;
    if (shouldSkip(propsUpdater, childrenDiff)) {
        return skip();
    }

    return update(
        newNode,
        createDiffForChildren(oldNode.props.children, newNode.props.children),
        propsUpdater,
    );
};

/**
 * Compares 2 VDom nodes and returns
 * the operation to be performed in the real one on this node in DOM
 * @param oldNode
 * @param newNode
 */
export const createDiff = (
    oldNode: ReactsNode,
    newNode: ReactsNode,
    // @ts-ignore this is the expected behavior
): Operation => {
    if (isPrimitiveNodes(oldNode, newNode)) {
        return createDiffPrimitive(oldNode, newNode);
    }

    // @ts-ignore we checked primitive types of node
    if (oldNode.$$typeof !== newNode.$$typeof) {
        return replace(oldNode, newNode);
    }

    newNode.ref = oldNode.ref;

    // @ts-ignore we checked primitive and different types of node
    switch (oldNode.$$typeof) {
        case COMPONENT_SYMBOL:
            return createDiffComponent(
                oldNode as ReactsComponentNode,
                newNode as ReactsComponentNode,
            );
        case DOM_SYMBOL:
            return createDiffDOM(
                oldNode as ReactsDOMNode,
                newNode as ReactsDOMNode,
            );
        default:
            // @ts-ignore
            if (__DEV__) {
                // @ts-ignore
                throw new Error(`undefined type of node: ${oldNode.$$typeof}`);
            }
    }
};
