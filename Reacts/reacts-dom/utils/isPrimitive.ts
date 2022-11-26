import { ReactsNode } from '../../shared/types/node';

export const isPrimitive = (node: any): boolean => {
    return !node || typeof node === 'string' || typeof node === 'number';
};

/**
 * Checks if nodes have at least 1 primitive node
 * @param nodes
 */
export const isPrimitiveNodes = (...nodes: ReactsNode[]): boolean => {
    let flag = false;
    nodes.forEach(node => {
        if (isPrimitive(node)) {
            flag = true;
        }
    });
    return flag;
};
