import { Key, PropsType, ReactsElement, ReactsElementType } from './index';

export const VNODE_TYPE_DESCRIPTION = 'VNode';
export const DOM_ELEMENT_DESCRIPTION = 'DOM';

// const VNODE_ELEMENT_TYPE = Symbol(VNODE_TYPE_DESCRIPTION);
// const DOM_ELEMENT_TYPE = Symbol(DOM_ELEMENT_DESCRIPTION);

/**
 * Factory method to create a new VNode element
 */
export const createReactsElement = (
    type: ReactsElementType<any>,
    key: Key,
    props: PropsType<any>,
    /* ref, self, source, owner*/
): ReactsElement => {
    const node: ReactsElement<any> = {
        $$typeof: Symbol(DOM_ELEMENT_DESCRIPTION),
        type,
        key,
        props,
    };

    if (typeof type === 'object' || typeof type === 'function') {
        // @ts-ignore
        const instance = new type();
        node.props = { ...props, children: instance.render() };
        node['$$typeof'] = Symbol(VNODE_TYPE_DESCRIPTION);
    }

    return node;
};
