import {
    ChildrenType,
    ComponentConstructor,
    JSXElementType,
    JSXVnodeType,
    KeyType,
    PropsType,
    VNodeType,
} from '../shared/common';
import {
    COMPONENT_ELEMENT_SYMBOL,
    DOM_ELEMENT_SYMBOL,
    getUniqueSymbol,
} from '../shared/index';

const createNodeFromObject = (
    type: JSXVnodeType,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    const vnode: VNodeType = {
        $$typeof: type.$$typeof,
        type: type.type,
        props: { ...type.props, ...props },
        key: maybeKey ? maybeKey : getUniqueSymbol(),
    };

    if (typeof vnode.props.children === 'function') {
        vnode.props.children = vnode.props.children(vnode.props.value);
    }

    return vnode;
};

const createComponentNode = (
    type: ComponentConstructor,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    const vnode: VNodeType = {
        $$typeof: COMPONENT_ELEMENT_SYMBOL,
        type,
        props,
        key: !maybeKey ? getUniqueSymbol() : maybeKey,
    };

    // @ts-ignore vnode.type guaranteed to be typeof ComponentConstructor
    vnode._instance = new vnode.type(props);
    vnode.props.children = vnode._instance?.render();

    return vnode;
};

const createDomNode = (
    type: string,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    return {
        $$typeof: DOM_ELEMENT_SYMBOL,
        type,
        props,
        key: !maybeKey ? getUniqueSymbol() : maybeKey,
    };
};

const createTextNode = (
    type: string,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    if (Array.isArray(props.children)) {
        props.children = props.children.join('');
    }

    return {
        $$typeof: DOM_ELEMENT_SYMBOL,
        type,
        props,
        key: !maybeKey ? getUniqueSymbol() : maybeKey,
    };
};

// TODO: refactor and add Fragment
/**
 * Creates a virtual DOM element - virtual node. Used for JSX.
 * IMPORTANT: if in
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
    if (Array.isArray(props.children)) {
        const newChildren: ChildrenType = [];
        props.children.forEach(elem => {
            if (Array.isArray(elem)) {
                elem.forEach(item => {
                    newChildren.push(item);
                });
            } else {
                newChildren.push(elem);
            }
        });
        props.children = newChildren;
    }

    if (typeof type === 'object') {
        return createNodeFromObject(type, props, maybeKey);
    } else if (typeof type === 'string') {
        if (
            type === 'h1' ||
            type === 'h2' ||
            type === 'h3' ||
            type === 'h4' ||
            type === 'h5' ||
            type === 'h6' ||
            type === 'p'
        ) {
            return createTextNode(type, props, maybeKey);
        } else {
            return createDomNode(type, props, maybeKey);
        }
    } else {
        return createComponentNode(type, props, maybeKey);
    }
};
