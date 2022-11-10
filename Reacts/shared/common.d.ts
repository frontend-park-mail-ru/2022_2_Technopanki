export type KeyType = Symbol | string | number | undefined | null;
export type JSXVnodeType = {
    $$typeof: Symbol;
    type: string;
    [key: string]: any;
};
export type JSXElementType = string | ComponentConstructor | JSXVnodeType;

type PropType =
    | ((ev: keyof HTMLElementEventMap) => any)
    | string
    | null
    | undefined;
export type PropsType = { [key: string]: PropType } | {};
export type ChildrenType = VNodeType[] | VNodeType | string | number | null;

export type VNodeType = {
    $$typeof: Symbol;
    type: string | ComponentConstructor;
    props: { children?: ChildrenType } & PropsType;
    key: KeyType;

    unmount: Function;

    _instance?: ComponentType;
    _domElement: HTMLElement;
    // ---------
    // TODO
    _parent?: VNodeType | null;
    _depth?: number;
    // From preact source code:
    // "_nextDom must be initialized to undefined b/c it will eventually
    // be set to dom.nextSibling which can return `null` and it is important
    // to be able to distinguish between an uninitialized _nextDom and
    // a _nextDom that has been set to `null`"
    _nextDom?: VNodeType | null;

    constructor?: Function;
};

export interface ComponentType {
    rootDomRef?: HTMLElement;
    prevRenderVNodeRef?: VNodeType;

    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;

    unmount(): void;
    render(): VNodeType;
}

export interface ComponentConstructor {
    new (props: PropsType): ComponentType;
}
