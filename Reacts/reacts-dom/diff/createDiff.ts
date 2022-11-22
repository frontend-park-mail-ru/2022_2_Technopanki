import {
    ChildrenType,
    PropsWithChildren,
    PropType,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { Operation, PropsUpdater } from './types';
import { replace, skip, SKIP_OPERATION, update } from './operations/operations';
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
    // @ts-ignore we removed the children from the object
    const oldPropsWithoutChildren: [string, PropType][] = Object.entries(
        oldProps,
    ).filter(([attr, _]) => attr !== 'children');
    // @ts-ignore we removed the children from the object
    const newPropsWithoutChildren: [string, PropType][] = Object.entries(
        newProps,
    ).filter(([attr, _]) => attr !== 'children');

    const oldPropsNames = oldPropsWithoutChildren.map(([attr, _]) => attr);
    const newPropsNames = newPropsWithoutChildren.map(([attr, _]) => attr);

    return {
        set: newPropsWithoutChildren.filter(
            ([attr, value]) =>
                oldPropsNames.indexOf(attr) === -1 ||
                oldPropsWithoutChildren.find(
                    node => node[0] === attr && node[1] !== value,
                ),
        ),
        remove: oldPropsWithoutChildren.filter(
            ([attr, _]) => newPropsNames.indexOf(attr) === -1,
        ),
    };
};

export const createDiffPrimitive = (
    oldNode: ReactsNode,
    newNode: ReactsNode,
) => {
    if (oldNode !== newNode && (oldNode || newNode)) {
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

const isEmptyPropsUpdater = (propsUpdater: PropsUpdater) => {
    return propsUpdater.set.length === 0 && propsUpdater.remove.length === 0;
};

const shouldSkip = (
    propsUpdater: PropsUpdater,
    childrenDiff: Operation | Operation[],
) => {
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
) => {
    if (oldNode.type !== newNode.type) {
        return replace(oldNode, newNode);
    }

    if (oldNode.instance?.shouldUpdate(newNode.props)) {
        return replace(oldNode, newNode);
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
        oldNode,
        createDiffForChildren(oldNode.props.children, newNode.props.children),
        propsUpdater,
    );
};

// TODO: refactor
export const createDiffDOM = (
    oldNode: ReactsDOMNode,
    newNode: ReactsDOMNode,
) => {
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
        oldNode,
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
