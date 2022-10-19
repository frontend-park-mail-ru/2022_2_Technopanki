// TODO: Maybe add default props
import { createVNode } from './createNode.ts';

const jsx = (type, config, maybeKey) => {
    return createVNode(type, config, maybeKey);
};

// TODO
const jsxs = (type, config, maybeKey) => {
    return createVNode(type, config, maybeKey);
};

export { jsx, jsxs };
