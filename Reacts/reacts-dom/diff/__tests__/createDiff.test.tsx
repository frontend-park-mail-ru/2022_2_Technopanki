import { compareProps, createDiff } from '../createDiff';
import { replace, skip, update } from '../operations/operations';
import { childrenDiff } from '../childrenDiff';
import { ReactsComponent } from '../../../reacts/src/Component';

describe('compareProps', () => {
    let oldProps: { [key: string]: any } & { children: string } = {
        children: '',
    };
    let newProps: { [key: string]: any } & { children: string } = {
        children: '',
    };

    beforeEach(() => {
        oldProps = { children: 'oldProps' };
        newProps = { children: 'newProps' };
    });

    const oldPropsFunction = () => {};
    const newPropsFunction = () => {};

    const tests = [
        {
            testName: 'equal',
            oldProps: { test: 'Hello' },
            newProps: { test: 'Hello' },
            result: {
                set: [],
                remove: [],
            },
        },
        {
            testName: 'update string',
            oldProps: { test: 'Hello' },
            newProps: { test: 'World' },
            result: {
                set: [['test', 'World']],
                remove: [],
            },
        },
        {
            testName: 'update one prop',
            oldProps: { test: 'Hello', value: '__tests__ value' },
            newProps: { test: 'World', value: '__tests__ value' },
            result: {
                set: [['test', 'World']],
                remove: [],
            },
        },
        {
            testName: 'update number',
            oldProps: { test: 2 },
            newProps: { test: 3 },
            result: {
                set: [['test', 3]],
                remove: [],
            },
        },
        {
            testName: 'update function',
            oldProps: { test: oldPropsFunction },
            newProps: { test: newPropsFunction },
            result: {
                set: [['test', newPropsFunction]],
                remove: [],
            },
        },
        {
            testName: 'remove string',
            oldProps: { value: 'Hello world!' },
            newProps: {},
            result: {
                set: [],
                remove: [['value', 'Hello world!']],
            },
        },
        {
            testName: 'set string',
            oldProps: {},
            newProps: { test: 'World' },
            result: {
                set: [['test', 'World']],
                remove: [],
            },
        },
    ];

    tests.forEach(test => {
        it(test.testName, () => {
            oldProps = { ...oldProps, ...test.oldProps };
            newProps = { ...newProps, ...test.newProps };
            expect(compareProps(oldProps, newProps)).toEqual(test.result);
        });
    });
});

describe('createDiff primitive nodes', () => {
    const tests = [
        {
            name: 'should skip null',
            oldNode: null,
            newNode: null,
            result: skip(),
        },
        {
            name: 'should skip undefined',
            oldNode: undefined,
            newNode: undefined,
            result: skip(),
        },

        {
            name: 'should replace null - string',
            oldNode: null,
            newNode: 'Hello world',
            result: replace(null, 'Hello world'),
        },
    ];

    tests.forEach(test => {
        it(test.name, () => {
            const result = createDiff(test.oldNode, test.newNode);
            expect(result).toEqual(test.result);
        });
    });
});

describe('createDiff DOM nodes', () => {
    let oldNode = <div></div>;
    let newNode = <div></div>;

    it('should skip - empty', () => {
        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(skip());
    });

    it('should skip - with text in div', () => {
        oldNode = <div>Hello world!</div>;
        newNode = <div>Hello world!</div>;
        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(skip());
    });

    it('should update - with text in div', () => {
        oldNode = <div>Hello</div>;
        newNode = <div>World</div>;
        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(
            update(oldNode, createDiff('Hello', 'World'), {
                set: [],
                remove: [],
            }),
        );
    });

    it('should update - with p in div', () => {
        oldNode = (
            <div>
                <p>Hello world</p>
            </div>
        );
        newNode = (
            <div>
                <p>World hello</p>
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(JSON.stringify(result)).toEqual(
            JSON.stringify(
                update(
                    oldNode,
                    createDiff(<p>Hello world</p>, <p>World hello</p>),
                    {
                        set: [],
                        remove: [],
                    },
                ),
            ),
        );
    });

    it('should update - with p and attributes in div', () => {
        oldNode = (
            <div prop={'1'}>
                <p>Hello world</p>
            </div>
        );
        newNode = (
            <div prop={'2'}>
                <p>World hello</p>
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(JSON.stringify(result)).toEqual(
            JSON.stringify(
                update(
                    oldNode,
                    createDiff(<p>Hello world</p>, <p>World hello</p>),
                    {
                        set: [['prop', '2']],
                        remove: [],
                    },
                ),
            ),
        );
    });

    it('should skip - with p, attributes in div and nested', () => {
        oldNode = (
            <div prop={'1'}>
                <div>
                    <div>
                        <div>
                            <p>Hello world</p>
                        </div>
                    </div>
                </div>
            </div>
        );
        newNode = (
            <div prop={'1'}>
                <div>
                    <div>
                        <div>
                            <p>Hello world</p>
                        </div>
                    </div>
                </div>
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(skip());
    });

    it('should skip - with dynamic generation in div', () => {
        oldNode = (
            <div prop={'1'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
            </div>
        );
        newNode = (
            <div prop={'1'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(skip());
    });

    it('should skip - with dynamic generation in div and children', () => {
        oldNode = (
            <div prop={'1'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
                <h1>Hello world!</h1>
            </div>
        );
        newNode = (
            <div prop={'1'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
                <h1>Hello world!</h1>
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(result).toEqual(skip());
    });

    it('should update - with dynamic generation in div and children', () => {
        oldNode = (
            <div prop={'1'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem}</p>
                ))}
                <h1>Hello world!</h1>
            </div>
        );
        newNode = (
            <div prop={'2'}>
                {[1, 2, 3].map(elem => (
                    <p key={elem}>{elem + 1}</p>
                ))}
                <h1>World hello!</h1>
            </div>
        );

        const result = createDiff(oldNode, newNode);
        expect(JSON.stringify(result)).toEqual(
            JSON.stringify(
                update(
                    oldNode,
                    childrenDiff(
                        oldNode.props.children,
                        newNode.props.children,
                    ),
                    {
                        set: [['prop', '2']],
                        remove: [],
                    },
                ),
            ),
        );
    });
});

describe('createDiff Component nodes', () => {
    class TestClass extends ReactsComponent {
        render() {
            return <div>Hello world!</div>;
        }
    }
    class NewComponentClass extends ReactsComponent {
        render() {
            return <div>Hello world!</div>;
        }
    }

    const tests = [
        {
            name: 'should skip',
            oldNode: <TestClass />,
            newNode: <TestClass />,
            result: skip(),
        },
        {
            name: 'should replace - different type of components',
            oldNode: <TestClass />,
            newNode: <NewComponentClass />,
            result: replace(<TestClass />, <NewComponentClass />),
        },
        {
            name: 'should replace - component and dom element',
            oldNode: <TestClass />,
            newNode: <div></div>,
            result: replace(<TestClass />, <div></div>),
        },
        {
            name: 'should replace - dom element and component',
            oldNode: <div></div>,
            newNode: <TestClass />,
            result: replace(<div></div>, <TestClass />),
        },
    ];

    tests.forEach(test => {
        it(test.name, () => {
            const diff = createDiff(test.oldNode, test.newNode);
            expect(JSON.stringify(diff)).toEqual(JSON.stringify(test.result));
        });
    });
});
