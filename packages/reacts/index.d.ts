// React Nodes
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L162

// React src
// https://github.com/facebook/react/tree/main/packages/react

//
// VNode API
// -------------------------------------------------------------------
import { ChildrenType, PropsType, VNodeType } from '../reacts-dom/common';

type ComponentChild = Exclude<ChildrenType, VNodeType[] | VNodeType> &
    ReactsElement<any>;
type ComponentChildren = ComponentChild[] | ComponentChild;

export interface ReactsElement<P extends PropsType> extends VNodeType {
    props: { children: ComponentChildren } & P;
    _instance?: ComponentClass<P>;
}

export abstract class ComponentClass<P extends PropsType = {}, S = {}> {
    // fields
    readonly props: Readonly<P>;
    state: Readonly<S>;
    context: unknown; // TODO

    rootDomRef?: HTMLElement;
    prevRenderVNodeRef?: VNodeType;
    // refs: {
    //     [key: string]: ComponentClass<P, S> | Element;
    // };

    // TODO: rework to queue maybe

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
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S,
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
    componentWillUnmount?(): void;
    shouldComponentUpdate?(): boolean;

    render(): ReactsElement<P>;
}
