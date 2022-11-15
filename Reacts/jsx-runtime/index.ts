import { createNode } from './createNode';

export const jsx = (type: any, props: any, maybeKey: any) => {
    return createNode(type, props, maybeKey);
};

export const jsxs = (type: any, props: any, maybeKey: any) => {
    return createNode(type, props, maybeKey);
};
