import { ChildrenType, PropsType, VNodeType } from '../../shared/common';
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
    COMPONENT_NODE_SYMBOL,
    CONTEXT_NODE_SYMBOL,
    CONTEXT_TYPE,
    DOM_NODE_SYMBOL,
    PROVIDER_NODE_SYMBOL,
} from '../../shared/index';
import { childrenDiff } from './childrenDiff';
import { Context } from '../../reacts/context';
import { setContextValue } from '../../reacts/context/context';

// TODO: rename to props
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

    const update = newNodeWithoutChildren.filter(
        ([attr, value]) =>
            oldNodeAttrNames.indexOf(attr) !== -1 &&
            oldNodeWithoutChildren.find(
                node => node[0] === attr && node[1] !== value,
            ),
    );

    return {
        set: newNodeWithoutChildren.filter(
            ([attr, _]) => oldNodeAttrNames.indexOf(attr) === -1,
        ),
        remove: (() => {
            const deleteItemsFromUpdate = oldNodeWithoutChildren.filter(
                ([attr, _]) =>
                    update.find(([updateAttr, _]) => updateAttr === attr),
            );

            const removedAttributes = oldNodeWithoutChildren.filter(
                ([attr, _]) => newNodeAttrNames.indexOf(attr) === -1,
            );

            return [...deleteItemsFromUpdate, ...removedAttributes];
        })(),
        ['update']: update,
    };
};

const isPrimitiveTypeChildren = (
    oldNode: VNodeType,
    newNode: VNodeType,
): boolean => {
    return (
        (!oldNode.props.children && !newNode.props.children) ||
        (typeof oldNode.props.children === 'string' &&
            typeof newNode.props.children === 'string')
    );
};

/**
 * Compare 2 primitive nodes and returns operation
 * @param oldNode
 * @param newNode
 */
const comparePrimitiveTypeChildren = (
    attrUpdater: AttributeUpdater,
    oldNode: VNodeType,
    newNode: VNodeType,
): Operation => {
    if (!oldNode.props.children && !newNode.props.children) {
        if (attrUpdater !== emptyAttrUpdate) {
            return update(attrUpdater, [], newNode);
        }
        return skip();
    } else if (!oldNode.props.children && newNode.props.children) {
        return insert(newNode);
    } else if (oldNode.props.children && !newNode.props.children) {
        return remove(oldNode);
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
                newNode,
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
    oldChild: VNodeType & { props: { children: VNodeType } },
    newChild: VNodeType & { props: { children: VNodeType } },
): Operation => {
    // return createDiff(oldChild.props.children, newChild.props.children);
    return update(
        attrUpdater,
        [createDiff(oldChild.props.children, newChild.props.children)],
        newChild,
    );
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
        // @ts-ignore we checked thad oldNode and newNode children are not arrays
        return updateChild(attrUpdater, oldNode, newNode);
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

const createDiffDOM = (oldNode: VNodeType, newNode: VNodeType) => {
    const attrUpdate = compareAttributes(oldNode.props, newNode.props);
    newNode._domElement = oldNode._domElement;

    if (isPrimitiveTypeChildren(oldNode, newNode)) {
        return comparePrimitiveTypeChildren(attrUpdate, oldNode, newNode);
    }

    // because we checked the primitive types above in the code,
    // primitive types cannot get into this call
    return updateChildren(
        attrUpdate,
        <VNodeType & { props: { children: VNodeType | VNodeType[] } }>oldNode,
        <VNodeType & { props: { children: VNodeType | VNodeType[] } }>newNode,
    );
};

const createDiffComponent = (oldNode: VNodeType, newNode: VNodeType) => {
    if (oldNode.type !== newNode.type) {
        return replace(oldNode, newNode);
    } else {
        const attrUpdate = compareAttributes(oldNode.props, newNode.props);
        newNode._domElement = oldNode._domElement;
        // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
        return updateChildren(attrUpdate, oldNode, newNode);
    }
};

const createDiffContext = (oldNode: Context<any>, newNode: Context<any>) => {
    newNode._domElement = oldNode._domElement;

    // TODO: Wait for Provider change
    setContextValue(<Context<any>>newNode);

    // The context object will always store
    // a vnode or an array of vnodes in children.
    return updateChildren(
        emptyAttrUpdate,
        <VNodeType & { props: { children: VNodeType | VNodeType[] } }>oldNode,
        <VNodeType & { props: { children: VNodeType | VNodeType[] } }>newNode,
    );
};

const createDiffProvider = (oldNode: VNodeType, newNode: VNodeType) => {
    newNode._domElement = oldNode._domElement;
    if (__DEV__) {
        if (typeof newNode.props.children === 'string') {
            throw new Error("Provider can't have strings as children");
        }
    }
    // @ts-ignore children type guaranteed to be typeof VNodeType | VNodeType[]
    return updateChildren(emptyAttrUpdate, oldNode, newNode);
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
        return replace(oldNode, newNode);
    }

    switch (oldNode.$$typeof) {
        case DOM_NODE_SYMBOL:
            return createDiffDOM(oldNode, newNode);
        case COMPONENT_NODE_SYMBOL:
            return createDiffComponent(oldNode, newNode);
        case CONTEXT_NODE_SYMBOL:
            return createDiffContext(
                <Context<any>>oldNode,
                <Context<any>>newNode,
            );
        case PROVIDER_NODE_SYMBOL:
            return createDiffProvider(oldNode, newNode);
        default:
            if (__DEV__) {
                console.error('undefined node type: ', newNode, oldNode);
                throw new Error('undefined node type');
            }
            return skip();
    }
};
