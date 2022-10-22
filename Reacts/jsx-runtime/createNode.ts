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
    PROVIDER_ELEMENT_SYMBOL,
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
    const vnode = type;
    vnode.props = { ...vnode.props, ...props };
    // TODO: fix bug with key and context
    // if (maybeKey) {
    //     vnode.key = maybeKey;
    // }

    // Update context value
    if (vnode.$$typeof === PROVIDER_ELEMENT_SYMBOL) {
        vnode._context.value = vnode.props.value;
    }

    return <VNodeType>vnode;
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
        _domElement: undefined,
    };

    vnode._instance = new (<ComponentConstructor>vnode.type)(props);
    vnode.props.children = vnode._instance.render();

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
        _domElement: undefined,
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
        _domElement: undefined,
    };
};

/**
 * The function is required to enable dynamic generation of JSX elements. Example:
 * {this.state.data.map((item, index) => (
 *  <p key={item.id}>{item.name}</p>
 * ))}
 * @param children
 */
const resolveArraysInChildren = (children: VNodeType[]): VNodeType[] => {
    const newChildren: VNodeType[] = [];
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
