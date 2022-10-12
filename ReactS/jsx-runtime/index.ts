import { ComponentChildren, Key } from '../core/index';

function createVNode(
    type: string,
    props: {} & { children: ComponentChildren },
    key?: Key,
) {
    return {
        type,
        props,
        key,
    };
}

export { createVNode as jsx, createVNode as jsxs, createVNode as jsxDEV };
