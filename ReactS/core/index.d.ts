// Пример элемента VDOM
// e = {
//     type: 'h1',
//     props: { className: 'Hello', children: 'Hello world' },
//     key: undefined,
// };

type VNodeElementSymbol = Symbol;

/**
 * VDOM type interface
 */
export interface VNode<P = {}> {
    $$typeof: VNodeElementSymbol | string;
    type: VNodeType<P>;
    props: PropsType<P>;
    key: Key;
    ref?: null; // TODO
    _owner?: null; // TODO
}

export type VNodeType<P = {}, S = {}> = string | Component<P, S>;
export type PropsType<P = {}> = P & { children?: ComponentChildren };

// React Nodes
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L162

// React src
// https://github.com/facebook/react/tree/main/packages/react

export type Key = Symbol | string | number | undefined | null;

// TODO: переработать детей элемента (оставить только VNode<any>, string, int и null)
export type ComponentChild =
    | VNode<any>
    | object
    | string
    | number
    | bigint
    | boolean
    | null
    | undefined;

type ComponentChildren = ComponentChild[] | ComponentChild;

//
// Component API
// ----------------------------------------------------------------------

interface ComponentClass<P = {}, S = {}> {
    // new (props: P): Component<P, S>;
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    shouldComponentUpdate?(): boolean;
}

export abstract class Component<P = {}, S = {}>
    implements ComponentClass<P, S>
{
    constructor(props?: Readonly<P>);

    setState<K extends keyof S>(state: S, callback?: () => void): void;

    componentWillMount: () => {};
    componentDidMount: () => {};
    componentWillUnmount: () => {};
    shouldComponentUpdate: () => false;

    state: Readonly<S>;
    readonly props: Readonly<PropsType<P>>;

    render(): VNode;
}
