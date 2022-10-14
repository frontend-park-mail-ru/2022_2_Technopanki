import {
    Key,
    PropsType,
    VNode,
    VNodeElementSymbol,
    VNodeType,
} from '../core/index';
import Example from '../Example';

const VNODE_ELEMENT_TYPE: VNodeElementSymbol = Symbol('VNode');

/**
 * Factory method to create a new React element
 */
const VNodeElement = (
    type: VNodeType,
    key: Key,
    props: PropsType,
    /* ref, self, source, owner*/
): VNode => {
    return {
        $$typeof: VNODE_ELEMENT_TYPE,
        type,
        key,
        props,
    };
};

const jsx = (type: any, config: any, maybeKey: Key) => {
    let props: any = {};
    let key;

    let propName;
    for (propName in config) {
        props[propName] = config[propName];
    }

    if (typeof type === 'function') {
        const instance = new type();
        props = { ...props, children: instance.render() };
    }

    if (maybeKey) {
        key = maybeKey;
    } else {
        key = Symbol('key');
    }

    return VNodeElement(type, key, props);
};

export { jsx };
