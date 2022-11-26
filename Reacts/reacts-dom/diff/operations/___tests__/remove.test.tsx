import { removeNode } from '../remove';
import {
    ReactsComponentNode,
    ReactsDOMNode,
} from '../../../../shared/types/node';
import { renderNode } from '../../../render/renderNode';
import { ReactsComponent } from '../../../../reacts/src/Component';

describe('removeNode', () => {
    it('should remove DOM node', function () {
        const node: ReactsDOMNode = <div>Hello world</div>;
        const elem = document.createElement('div');

        renderNode(elem, node);
        removeNode(node.ref, node);

        expect(node.ref).toEqual(null);
        expect(node.props.children).toEqual(null);
        expect(elem).toEqual(null);
    });

    it('should remove Component node', function () {
        let isCalledUnmount = false;
        class TestComponent extends ReactsComponent {
            componentWillUnmount() {
                isCalledUnmount = true;
            }

            render() {
                return <div>Hello world!</div>;
            }
        }

        const node: ReactsComponentNode = <TestComponent />;
        const elem = document.createElement('div');

        renderNode(elem, node);
        removeNode(node.ref, node);

        expect(node.ref).toEqual(null);
        expect(node.props.children).toEqual(null);
        expect(node.instance?.ref).toEqual(null);
        expect(node.instance?.currentNode).toEqual(null);
        expect(isCalledUnmount).toEqual(true);
    });
});
