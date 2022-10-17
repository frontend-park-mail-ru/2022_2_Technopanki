import {
    ChildrenType,
    JSXElementType,
    KeyType,
    PropsType,
    VNodeType,
} from '../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
    KEY_SYMBOL,
} from '../shared/index';

/**
 * Creates a virtual DOM element - virtual node. Used for JSX
 * @param type
 * @param props
 * @param maybeKey
 * @returns {{_children: null, _parent: null, _nextDom: undefined, _depth: number, construct: undefined, type, key, props, _instance: null}}
 */
export const createElement = (
    type: JSXElementType,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    const vnode: VNodeType = {
        $$typeof:
            typeof type === 'string'
                ? DOM_ELEMENT_SYMBOL
                : COMPONENT_ELEMENT_SYMBOL,
        type,
        props,
        key: !maybeKey ? KEY_SYMBOL : maybeKey,
    };

    if (vnode.$$typeof.description === COMPONENT_ELEMENT_SYMBOL.description) {
        // @ts-ignore vnode.type guaranteed to be typeof ComponentConstructor
        vnode._instance = new vnode.type.prototype.constructor(props);
        vnode.props.children = vnode._instance?.render();
    }

    return vnode;
};

export const Fragment = (props: PropsType) => {
    return props.children;
};
