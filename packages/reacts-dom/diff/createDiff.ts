import { PropsType, VNodeType } from '../../shared/common';
import { AttributeUpdater, Operation } from './index';
import {
    emptyAttrUpdate,
    insert,
    remove,
    replace,
    skip,
    update,
} from './operations';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';
import { childrenDiff } from './childrenDiff';

// TODO: add list of attributes
const compareAttributes = (
    oldNodeProps: PropsType,
    newNodeProps: PropsType,
): AttributeUpdater => {
    const oldNodeWithoutChildren = Object.entries(oldNodeProps).filter(
        ([attr, _]) => attr !== 'children',
    );
    const newNodeWithoutChildren = Object.entries(newNodeProps).filter(
        ([attr, _]) => attr !== 'children',
    );

    const oldNodeAttrNames = oldNodeWithoutChildren.map(([attr, _]) => attr);
    const newNodeAttrNames = newNodeWithoutChildren.map(([attr, _]) => attr);

    return {
        set: newNodeWithoutChildren.filter(
            ([attr, _]) => oldNodeAttrNames.indexOf(attr) === -1,
        ),
        remove: oldNodeAttrNames.filter(
            attr => newNodeAttrNames.indexOf(attr) === -1,
        ),
        update: newNodeWithoutChildren.filter(
            ([attr, value]) =>
                oldNodeAttrNames.indexOf(attr) !== -1 &&
                oldNodeAttrNames.find(
                    node => node[0] === attr && node[1] !== value,
                ),
        ),
    };
};

const isPrimitiveTypeChildren = (
    oldNode: VNodeType,
    newNode: VNodeType,
): boolean => {
    return (
        (!oldNode.props.children && !oldNode.props.children) ||
        (typeof oldNode.props.children === 'string' &&
            typeof newNode.props.children === 'string')
    );
};

const comparePrimitiveTypeChildren = (
    oldNode: VNodeType,
    newNode: VNodeType,
): Operation => {
    if (!oldNode.props.children && !newNode.props.children) {
        return skip();
    } else if (!oldNode.props.children && newNode.props.children) {
        return insert(newNode);
    } else if (oldNode.props.children && !newNode.props.children) {
        return remove();
    }

    if (
        typeof oldNode.props.children === 'string' &&
        typeof newNode.props.children === 'string'
    ) {
        if (oldNode.props.children === newNode.props.children) {
            return skip();
        } else {
            return update(
                {
                    ...emptyAttrUpdate,
                    update: [['textContent', newNode.props.children]],
                },
                [],
            );
        }
    }

    return skip();
};

const updateChild = (
    attrUpdater: AttributeUpdater,
    oldChild: VNodeType,
    newChild: VNodeType,
): Operation => {
    return update(attrUpdater, [createDiff(oldChild, newChild)]);
};

// TODO: refactor
/**
 * Compares 2 VDom nodes and returns
 * the operation to be performed in the real one on this node in DOM
 * @param oldNode
 * @param newNode
 */
export const createDiff = (
    oldNode: VNodeType,
    newNode: VNodeType,
): Operation => {
    if (oldNode.$$typeof.description !== newNode.$$typeof.description) {
        return replace(newNode);
    }

    if (
        oldNode.$$typeof.description === DOM_ELEMENT_SYMBOL.description &&
        newNode.$$typeof.description === DOM_ELEMENT_SYMBOL.description
    ) {
        const attrUpdate = compareAttributes(oldNode.props, newNode.props);

        // if (Object.values(attrUpdate).length === 0 &&
        //     attrUpdate.set.length == 0 &&
        //     attrUpdate.remove.length == 0 &&
        //     attrUpdate.update.length == 0 &&
        //     oldNode.props.children === newNode.props.children
        // ) {
        //     return skip();
        // }

        if (isPrimitiveTypeChildren(oldNode, newNode)) {
            return comparePrimitiveTypeChildren(oldNode, newNode);
        }

        if (
            !Array.isArray(oldNode.props.children) &&
            !Array.isArray(newNode.props.children)
        ) {
            return updateChild(
                attrUpdate,
                // @ts-ignore node.type guaranteed to be typeof VNodeType
                oldNode.props.children,
                newNode.props.children,
            );
        }

        return update(
            attrUpdate,
            childrenDiff(
                // @ts-ignore node.type guaranteed to be typeof VNodeType or [VNodeType]
                Array.isArray(oldNode.props.children)
                    ? oldNode.props.children
                    : [oldNode.props.children],
                Array.isArray(newNode.props.children)
                    ? newNode.props.children
                    : [newNode.props.children],
            ),
        );
    } else if (
        oldNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description &&
        newNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description
    ) {
        console.log('Diff: ', oldNode, newNode);
        if (oldNode.type !== newNode.type) {
            return replace(newNode);
        } else {
            const attrUpdate = compareAttributes(oldNode.props, newNode.props);
            if (
                !Array.isArray(oldNode.props.children) &&
                !Array.isArray(newNode.props.children)
            ) {
                return update(attrUpdate, [
                    createDiff(oldNode.props.children, newNode.props.children),
                ]);
            }
            return update(
                attrUpdate,
                childrenDiff(oldNode.props.children, newNode.props.children),
            );
        }
    } else {
        throw new Error(
            `Undefined type of node: ${oldNode.$$typeof}, ${newNode.$$typeof}`,
        );
    }

    return skip();
};
