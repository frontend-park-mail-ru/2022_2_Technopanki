import {
    ChildrenType,
    JSXElementType,
    KeyType,
    PropsType,
    VNodeType,
} from '../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    CONSUMER_ELEMENT_SYMBOL,
    CONSUMER_TYPE,
    DOM_ELEMENT_SYMBOL,
    KEY_SYMBOL,
    PROVIDER_ELEMENT_SYMBOL,
    PROVIDER_TYPE,
    TEMP_ELEMENT_SYMBOL,
} from '../shared';
import { Component } from '../reacts/Component';
import {
    ConsumerConstructor,
    ProviderConstructor,
} from '../reacts-context/context';

// TODO: refactor and add Fragment
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
    if (typeof type === 'object') {
        const vnode: VNodeType = {
            $$typeof: type.$$typeof,
            type: type.type,
            props: { ...type.props, ...props },
            key: maybeKey ? maybeKey : KEY_SYMBOL,
        };

        if (typeof vnode.props.children === 'function') {
            vnode.props.children = vnode.props.children(vnode.props.value);
        }

        return vnode;
    } else if (typeof type === 'string') {
        return {
            $$typeof: DOM_ELEMENT_SYMBOL,
            type,
            props,
            key: !maybeKey ? KEY_SYMBOL : maybeKey,
        };
    } else {
        const vnode: VNodeType = {
            $$typeof: COMPONENT_ELEMENT_SYMBOL,
            type,
            props,
            key: !maybeKey ? KEY_SYMBOL : maybeKey,
        };

        // @ts-ignore vnode.type guaranteed to be typeof ComponentConstructor
        vnode._instance = new vnode.type(props);
        vnode.props.children = vnode._instance?.render();

        return vnode;
    }
};
