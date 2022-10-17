import {
    ChildrenType,
    JSXElementType,
    KeyType,
    PropsType,
    VNodeType,
} from '../reacts-dom/common';
import { COMPONENT_ELEMENT_SYMBOL, DOM_ELEMENT_SYMBOL } from '../shared/index';

/**
 * Creates a virtual DOM element (virtual node) for (used for JSX)
 * @param type
 * @param props
 * @param maybeKey
 * @returns {{_children: null, _parent: null, _nextDom: undefined, _depth: number, construct: undefined, type, key, props, _instance: null}}
 */
export const createElement = (
    type: JSXElementType,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
) => {
    let key = maybeKey;
    // let _props = {}

    if (!key) {
        key = Symbol('key');
    }

    return createVNode(type, props, key);
};

/**
 * Creates a VNode
 * @param type node type for this VDOM element. Name or Component constructor
 * @param props properties of virtual node
 * @param key
 */
export const createVNode = (
    type: JSXElementType,
    props: PropsType & { children: ChildrenType },
    key: KeyType,
): VNodeType => {
    const vnode: VNodeType = {
        $$typeof: DOM_ELEMENT_SYMBOL,
        type,
        props,
        key,
    };

    if (typeof type !== 'string') {
        vnode['$$typeof'] = COMPONENT_ELEMENT_SYMBOL;
        vnode._instance = new vnode.type.prototype.constructor(props);
        vnode.props.children = vnode._instance?.render();
        console.log('createElement: ', vnode);
    }

    console.log('JSX: ', vnode);
    return vnode;
};

export const Fragment = (props: PropsType) => {
    return props.children;
};
