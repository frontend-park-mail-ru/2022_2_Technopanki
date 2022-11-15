import { ReactsNode } from '../../shared/types/node';

export const isPrimitive = (node: ReactsNode): boolean => {
    return !node || typeof node === 'string' || typeof node === 'number';
};

export const isPrimitiveNodes = (...nodes: ReactsNode[]): boolean => {
    let flag = false;
    nodes.forEach(node => {
        if (isPrimitive(node)) {
            flag = true;
        }
    });
    return flag;
};
