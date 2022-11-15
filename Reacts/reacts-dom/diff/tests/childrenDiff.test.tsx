import { childrenDiff } from '../childrenDiff';
import { skip } from '../operations/operations';

describe('childrenDiff', () => {
    it('should return skip', () => {
        const oldNode = (
            <div>
                <p>Hello</p>
                <p>World</p>
            </div>
        );
        const newNode = (
            <div>
                <p>Hello</p>
                <p>World</p>
            </div>
        );

        const diff = childrenDiff(
            oldNode.props.children,
            newNode.props.children,
        );
        expect(diff).toEqual([skip(), skip()]);
    });

    it('should return skip - with map', () => {
        const oldNode = (
            <div>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
                <p>Hello world</p>
            </div>
        );
        const newNode = (
            <div>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
                <p>Hello world</p>
            </div>
        );

        const diff = childrenDiff(
            oldNode.props.children,
            newNode.props.children,
        );

        expect(diff).toEqual([[skip(), skip(), skip()], skip()]);
    });
});
