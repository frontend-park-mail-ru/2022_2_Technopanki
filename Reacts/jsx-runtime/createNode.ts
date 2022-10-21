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

/**
 * Creates virtual dom node from object in a type
 * @param type
 * @param props
 * @param maybeKey
 */
const createNodeFromObject = (
    type: JSXVnodeType,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    const vnode: VNodeType = {
        ...type,
        $$typeof: type.$$typeof,
        type: type.type,
        props: { ...type.props, ...props },
        key: maybeKey ? maybeKey : getUniqueSymbol(),
    };

    if (typeof vnode.props.children === 'function') {
        // @ts-ignore
        vnode.props.children = vnode.props.children(vnode.value);
    }

    return vnode;
};

/**
 * Creates virtual dom node from Component in a type
 * @param type
 * @param props
 * @param maybeKey
 */
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

/**
 * Creates virtual dom node from type of DOM node in a type
 * @param type
 * @param props
 * @param maybeKey
 */
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

/**
 * Creates virtual dom node from type of text DOM node in a type
 * @param type
 * @param props
 * @param maybeKey
 */
const createTextNode = (
    type: string,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    // To concatenate a string. An example where it is needed: <p>Number of items: {this.props.count.toString()}</p>
    // In this case, the props will be: props = {children: ['Number of items: ', '2'], ...}
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

/**
 * The function is required to enable dynamic generation of JSX elements. Example:
 * {this.state.data.map((item, index) => (
 *  <p key={item.id}>{item.name}</p>
 * ))}
 * @param children
 */
const resolveArraysInChildren = (
    children: (VNodeType | string)[],
): (VNodeType | string)[] => {
    const newChildren: (VNodeType | string)[] = [];
    children.forEach(elem => {
        if (Array.isArray(elem)) {
            elem.forEach(item => {
                newChildren.push(item);
            });
        } else {
            newChildren.push(elem);
        }
    });
    return newChildren;
};

/**
 * Creates a virtual DOM element - virtual node. Used for JSX.
 * @param type
 * @param props
 * @param maybeKey
 * @returns {{_children: null, _parent: null, _nextDom: undefined, _depth: number, construct: undefined, type, key, props, _instance: null}}
 */
export const createVNode = (
    type: JSXElementType,
    props: PropsType & { children: ChildrenType },
    maybeKey: KeyType | null | undefined,
): VNodeType => {
    if (Array.isArray(props.children)) {
        props.children = resolveArraysInChildren(props.children);
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
