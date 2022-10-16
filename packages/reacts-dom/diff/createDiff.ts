import { ComponentType, PropsType, VNodeType } from '../common';
import { Operation, Updater } from './index';
import { replace, skip, update } from './operations';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';
import { childrenDiff } from './childrenDiff';

const compareAttributes = (
    oldNodeProps: PropsType,
    newNodeProps: PropsType,
): Updater => {
    const oldNodeKeysWithoutChildren = Object.keys(oldNodeProps).filter(
        attr => attr !== 'children',
    );
    const newNodeKeysWithoutChildren = Object.keys(newNodeProps).filter(
        attr => attr !== 'children',
    );

    return {
        set: newNodeKeysWithoutChildren.filter(
            attr => Object.keys(oldNodeProps).indexOf(attr) === -1,
        ),
        remove: oldNodeKeysWithoutChildren.filter(
            attr => Object.keys(newNodeProps).indexOf(attr) === -1,
        ),
        update: newNodeKeysWithoutChildren.filter(
            attr =>
                oldNodeProps[attr] !== newNodeProps[attr] &&
                oldNodeProps[attr] &&
                newNodeProps[attr],
        ),
    };
};

const createDiffForComponent = (
    oldNode: ComponentType,
    newNode: ComponentType,
): Operation => {
    if (oldNode.prototype.constructor) {
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

        // TODO: rework children diff
        if (
            attrUpdate.set.length == 0 &&
            attrUpdate.remove.length == 0 &&
            attrUpdate.update.length == 0 &&
            oldNode.props.children === newNode.props.children
        ) {
            return skip();
        }

        // TODO: refactor. Probably delete VNodeType from ChildrenType
        // if (
        //     typeof oldNode.props.children === 'object' &&
        //     typeof newNode.props.children === 'object' &&
        //     oldNode.props.children &&
        //     newNode.props.children
        // ) {
        //     if (!Array.isArray(oldNode.props.children)) {
        //         oldNode.props.children = [oldNode.props.children];
        //     }
        //     if (!Array.isArray(newNode.props.children)) {
        //         newNode.props.children = [newNode.props.children];
        //     }
        // }

        return update(
            attrUpdate,
            childrenDiff(oldNode.props.children, newNode.props.children),
        );
    } else if (
        oldNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description &&
        newNode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description
    ) {
        console.log('component diff');
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
