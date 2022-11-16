import { UpdateOperation } from '../types';
import { update } from '../operations/operations';
import { updateElementAttributes } from '../operations/update';
import { renderNode } from '../../render/renderNode';
import '@testing-library/jest-dom';
import { ReactsComponent } from '../../../reacts/src/Component';
import { ReactsComponentNode } from '../../../shared/types/node';

describe('updateElementAttributes', () => {
    it('should set new Event', () => {
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

    it('should remove Event', () => {
        const func = () => {};
        const node = <div onClick={func}></div>;
        renderNode(document.createElement('div'), node);

        const operation: UpdateOperation = update(node, [], {
            set: [],
            remove: [['onClick', func]],
        });

        updateElementAttributes(operation, node);
        expect(node.eventMap.size).toEqual(0);
    });
});

describe('onClick applyDiff', () => {
    it('should update state', () => {
        const oldState = { value: 'Hello' };
        const newState = { value: 'World' };

        class TestComponent extends ReactsComponent {
            state = oldState;
            onClick = () => {
                this.setState(() => newState);
            };
            render() {
                return <div onClick={this.onClick}>Hello world!</div>;
            }
        }

        const node = <TestComponent />;
        // @ts-ignore
        (node as ReactsComponentNode).instance.onClick();
        expect(node.instance.state).toEqual(newState);
    });

    it('should update render', () => {
        const oldState = { value: 'Hello' };
        const newState = { value: 'World' };

        class TestComponent extends ReactsComponent {
            state = oldState;
            onClick = () => {
                this.setState(() => newState);
            };
            render() {
                return <div onClick={this.onClick}>{this.state.value}</div>;
            }
        }

        const node = <TestComponent />;
        // @ts-ignore
        (node as ReactsComponentNode).instance.onClick();
        expect(node.children.children).toEqual('World');
    });
});
