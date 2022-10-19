export type KeyType = Symbol | string | number | undefined | null;
export type JSXVnodeType = {
    $$typeof: Symbol;
    type: string;
    [key: string]: any;
};
export type JSXElementType = string | ComponentConstructor | JSXVnodeType;
export type ConstructorType<T> = new (...args: any[]) => T;

type PropType = Function | string | number | null | undefined;
export type PropsType = { [key: string]: PropType } | {};
export type ChildrenType = VNodeType[] | VNodeType | string | string[] | null;

export type VNodeType = {
    $$typeof: Symbol;
    type: string | ComponentConstructor;
    props: { children?: ChildrenType } & PropsType;
    key: KeyType;

    _instance?: ComponentType;
    _domElement?: HTMLElement;

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
    // unmout()
    render(): VNodeType;
}

export interface ComponentConstructor {
    new (props: PropsType): ComponentType;
}
