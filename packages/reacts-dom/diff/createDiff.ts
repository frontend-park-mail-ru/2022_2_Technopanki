import { ChildrenType, ComponentType, PropsType, VNodeType } from '../common';
import { AttributeUpdater, Operation } from './index';
import { emptyAttrUpdate, replace, skip, update } from './operations';
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
    // If both, oldChildren and newChildren are undefined or null
    if (!oldNode.props.children && !oldNode.props.children) {
        return skip();
    }

    console.log(oldNode.props.children, newNode.props.children);
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
                oldNode,
            );
        }
    }

    return skip();
};

// TODO: rework
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

        if (
            attrUpdate.set.length == 0 &&
            attrUpdate.remove.length == 0 &&
            attrUpdate.update.length == 0 &&
            oldNode.props.children === newNode.props.children
        ) {
            return skip();
        }

        if (isPrimitiveTypeChildren(oldNode, newNode)) {
            return comparePrimitiveTypeChildren(oldNode, newNode);
        }
        return update(
            attrUpdate,
            childrenDiff(oldNode.props.children, newNode.props.children),
            oldNode,
        );
    } else if (
        oldNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description &&
        newNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description
    ) {
        if (oldNode._instance !== newNode._instance) {
            return replace(newNode);
        }
    } else {
        throw new Error(
            `Undefined type of node: ${oldNode.$$typeof}, ${newNode.$$typeof}`,
        );
    }

    return skip();
};
