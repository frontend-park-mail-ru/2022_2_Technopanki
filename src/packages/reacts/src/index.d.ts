// React Nodes
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L162

// React src
// https://github.com/facebook/react/tree/main/packages/react

import { ChildrenType, PropsType, PropType, VNodeType } from '../shared/common';

type ComponentChildren =
    | Exclude<ChildrenType, VNodeType[] | VNodeType>
    | ReactsNode
    | ReactsNode[]
    | null;

export interface ReactsNode<P extends PropsType = {}> extends VNodeType {
    props: { children: ComponentChildren } & P;
    _instance?: ComponentClass<P>;
}

//
// Component
// -------------------------------------------------

export abstract class ComponentClass<P extends PropsType = {}, S = {}> {
    readonly props: Readonly<P>;
    state: Readonly<S>;
    context?: Context<any>;

    rootDomRef?: HTMLElement;
    prevRenderVNodeRef?: VNodeType;

    // TODO static fields
    static displayName?: string;
    static defaultProps?: any;

    // @ts-ignore
    constructor(props: Readonly<P> | P, context?: ReactsContext) {
        this.props = props;
        this.context = context;
    }

    setState<K extends keyof S>(
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S,
        callback?: () => void,
    ): void;

    componentDidMount?(): void;
    componentWillUnmount?(): void;
    shouldComponentUpdate?(props: P | Readonly<P>): boolean;

    unmount?(): void;

    render(): ReactsNode<P>;
}
