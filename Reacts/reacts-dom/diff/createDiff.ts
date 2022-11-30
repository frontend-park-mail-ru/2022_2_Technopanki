import {
    ChildrenType,
    PropsType,
    PropsWithChildren,
    PropType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { Operation, PropsUpdater } from './types';
import {
    emptyAttributeUpdater,
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
import { isArray } from '../utils/isArray';

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
        if (!(attr in newProps) && attr !== 'children') {
            remove.push([attr, oldProps[attr]]);
        }
    }

    for (let attr in newProps) {
        if (
            (!(attr in oldProps) ||
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

/**
 * Creates diff operation for primitive nodes
 * @param oldNode
 * @param newNode
 */
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

/**
 * Creates diff operation for children
 * @param oldChildren
 * @param newChildren
 */
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

/**
 * Compares 2 component nodes and returns diff operation
 * @param oldNode
 * @param newNode
 */
export const createDiffComponent = (
    oldNode: ReactsComponentNode,
    newNode: ReactsComponentNode,
): Operation => {
    if (oldNode.type !== newNode.type) {
        return replace(oldNode, newNode);
    }

    if (!oldNode.instance?.shouldUpdate(newNode.instance?.props)) {
        newNode.props = oldNode.props;
        newNode.ref = oldNode.ref;
        newNode.instance = oldNode.instance;
        return skip();
    }

    const propsUpdater = compareProps(oldNode.props, newNode.props);
    const childrenDiff: Operation | Operation[] = createDiffForChildren(
        oldNode.props.children,
        newNode.props.children,
    );

    oldNode.instance.props = newNode.instance?.props;
    newNode.instance = oldNode.instance;
    newNode.ref = oldNode.ref;
    return update(newNode, childrenDiff, propsUpdater);
};

const shouldSkip = (childrenDiff: Operation | Operation[]): boolean => {
    if (isArray(childrenDiff)) {
        return !Boolean(
            (<Operation[]>childrenDiff).find(
                operation => !shouldSkip(operation),
            ),
        );
    }
    return (<Operation>childrenDiff).type === SKIP_OPERATION;
};

/**
 * Compares 2 DOM nodes and returns diff operation
 * @param oldNode
 * @param newNode
 */
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

    if (shouldSkip(childrenDiff) && propsUpdater === emptyAttributeUpdater) {
        return skip();
    }
    return update(newNode, childrenDiff, propsUpdater);
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

    // @ts-ignore
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
