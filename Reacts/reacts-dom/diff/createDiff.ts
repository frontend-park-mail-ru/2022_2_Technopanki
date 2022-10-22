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
    CONSUMER_ELEMENT_SYMBOL,
    CONTEXT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
} from '../../shared/index';
import { childrenDiff } from './childrenDiff';

// TODO: add list of attributes
/**
 * A function that looks for which attributes to add, remove or change
 * @param oldNodeProps
 * @param newNodeProps
 */
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
                oldNode,
            );
        }
    }

    return skip();
};

/**
 * Helper function for updating children as single elements
 * @param attrUpdater
 * @param oldChild
 * @param newChild
 */
const updateChild = (
    attrUpdater: AttributeUpdater,
    oldChild: VNodeType,
    newChild: VNodeType,
): Operation => {
    return update(attrUpdater, [createDiff(oldChild, newChild)], oldChild);
};

/**
 * Helper function for updating children as arrays
 * @param attrUpdater
 * @param oldNode
 * @param newNode
 */
const updateChildren = (
    attrUpdater: AttributeUpdater,
    oldNode: VNodeType & { props: { children: VNodeType | VNodeType[] } },
    newNode: VNodeType & { props: { children: VNodeType | VNodeType[] } },
): Operation => {
    if (
        !Array.isArray(oldNode.props.children) &&
        !Array.isArray(newNode.props.children)
    ) {
        return update(
            attrUpdater,
            [
                createDiff(
                    // @ts-ignore children guaranteed not to be undefined (checked in isPrimitiveTypeChildren)
                    oldNode.props.children,
                    newNode.props.children,
                ),
            ],
            newNode,
        );
    }

    return update(
        attrUpdater,
        childrenDiff(
            Array.isArray(oldNode.props.children)
                ? oldNode.props.children
                : [oldNode.props.children],
            Array.isArray(newNode.props.children)
                ? newNode.props.children
                : [newNode.props.children],
        ),
        newNode,
    );
};

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
    if (oldNode.$$typeof !== newNode.$$typeof) {
        return replace(newNode);
    }

    if (
        oldNode.$$typeof === DOM_ELEMENT_SYMBOL &&
        newNode.$$typeof === DOM_ELEMENT_SYMBOL
    ) {
        const attrUpdate = compareAttributes(oldNode.props, newNode.props);
        newNode._domElement = oldNode._domElement;

        if (isPrimitiveTypeChildren(oldNode, newNode)) {
            return comparePrimitiveTypeChildren(oldNode, newNode);
        }
        // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
        return updateChildren(attrUpdate, oldNode, newNode);
    } else if (
        oldNode.$$typeof === COMPONENT_ELEMENT_SYMBOL &&
        newNode.$$typeof === COMPONENT_ELEMENT_SYMBOL
    ) {
        if (oldNode.type !== newNode.type) {
            return replace(newNode);
        } else {
            const attrUpdate = compareAttributes(oldNode.props, newNode.props);
            newNode._domElement = oldNode._domElement;
            // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
            return updateChildren(attrUpdate, oldNode, newNode);
        }
    } else if (oldNode.$$typeof === CONTEXT_ELEMENT_SYMBOL) {
        newNode._domElement = oldNode._domElement;
        newNode.props.children = newNode.props.children(newNode.value);
        // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
        return updateChildren(emptyAttrUpdate, oldNode, newNode);
    } else {
        newNode._domElement = oldNode._domElement;
        // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
        return updateChildren(emptyAttrUpdate, oldNode, newNode);
    }

    return skip();
};
