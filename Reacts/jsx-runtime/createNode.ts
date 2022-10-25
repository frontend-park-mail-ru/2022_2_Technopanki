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
    CONTEXT_ELEMENT_SYMBOL,
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
    const vnode = { ...type };
    vnode.props = { ...vnode.props, ...props };
    // TODO: fix bug with key and context
    vnode.key = maybeKey ?? getUniqueSymbol();

    // Update context value
    if (vnode.$$typeof === PROVIDER_ELEMENT_SYMBOL) {
        type._context.value = vnode.props.value;
        vnode._context.value = vnode.props.value;
    }

    // if (vnode.$$typeof === CONTEXT_ELEMENT_SYMBOL) {
    //     vnode.props.value = type._context;
    // }

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
        key: maybeKey ?? getUniqueSymbol(),
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
    // To concatenate a string. An example where it is needed: <p>Number of items: {this.props.count.toString()}</p>
    // In this case, the props will be: props = {children: ['Number of items: ', '2'], ...}
    switch (type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
            if (Array.isArray(props.children)) {
                props.children = props.children.join('');
            }
    }

    return {
        $$typeof: DOM_ELEMENT_SYMBOL,
        type,
        props,
        key: maybeKey ?? getUniqueSymbol(),
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

    switch (typeof type) {
        case 'object':
            return createNodeFromObject(type, props, maybeKey);
        case 'string':
            return createDomNode(type, props, maybeKey);
        default:
            return createComponentNode(type, props, maybeKey);
    }
};
