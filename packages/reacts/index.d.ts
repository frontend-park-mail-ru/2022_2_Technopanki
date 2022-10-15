// React Nodes
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L162

// React src
// https://github.com/facebook/react/tree/main/packages/react

//
// VNode API
// -------------------------------------------------------------------

import { VNodeType } from '../reacts-dom/common';

/**
 * VDOM type interface
 */
export interface ReactsElement<P = {}> {
    $$typeof: Symbol;
    type: ReactsElementType<P>;
    props: PropsType<P>;
    key: Key;
    ref?: null; // TODO
    _owner?: null; // TODO
}

export type ReactsElementType<P = {}, S = {}> = string | ComponentClass<P, S>;
export type PropsType<P = {}> = P & { children?: ComponentChildren };

export type Key = Symbol | string | number | undefined | null;

export type ComponentChild =
    | ReactsElement<any>
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
// -------------------------------------------------------------------

interface ComponentLifecycle<P, S> {
    /**
     * @deprecated
     */
    componentWillMount?(): void;

    componentDidMount?(): void;
    componentWillUnmount?(): void;
    shouldComponentUpdate?(): boolean;
}

//
// ComponentClass API
// -------------------------------------------------------------------

// interface Component<P = {}, S = {}> extends ComponentLifecycle<P, S> {}
export abstract class ComponentClass<P, S> implements ComponentLifecycle<P, S> {
    // fields
    readonly props: Readonly<P>;
    state: Readonly<S>;
    context: unknown;

    // TODO: rework to queue maybe
    _vnode?: VNodeType;
    _baseElement?: Element;

    // TODO static fields
    static displayName?: string;
    static defaultProps?: any;

    // @ts-ignore
    constructor(props: Readonly<P> | P) {
        this.props = props;
    }

    // action methods
    setState<K extends keyof S>(
        /** Function for state update */
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S | null,
        callback?: () => void,
    ): void;
    // From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L402
    // // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
    // // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
    // setState<K extends keyof S>(
    //     state: | ((prevState: Readonly<S>, props: Readonly<P>,) => Pick<S, K> | Partial<S> | null) | (Pick<S, K> | Partial<S> | null),
    //     callback?: () => void,
    // ): void;

    componentDidMount?(): void;

    render(): ReactsElement;
}
