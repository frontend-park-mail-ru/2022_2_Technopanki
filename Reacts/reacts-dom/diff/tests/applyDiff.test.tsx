import { UpdateOperation } from '../types';
import { update } from '../operations/operations';
import { updateElementAttributes } from '../operations/update';
import { renderNode } from '../../render/renderNode';
import '@testing-library/jest-dom';

describe('updateElementAttributes', () => {
    /**
     * @jest-environment jsdom
     */
    it('should remove', () => {
        const func = () => {};
        const node = <div onClick={func}></div>;
        renderNode(document.createElement('div'), node);
        const operation: UpdateOperation = update(node, [], {
            set: [['onClick', func]],
            remove: [],
        });

        updateElementAttributes(operation, node);
        expect(node.eventMap.size).toEqual(1);
    });
});
