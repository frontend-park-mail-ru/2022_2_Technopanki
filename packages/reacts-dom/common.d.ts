export type KeyType = Symbol | string | number | undefined | null;
export type JSXElementType = string | ComponentType;
export type ConstructorType<T> = new (...args: any[]) => T;

type PropType = Function | string | number | null | undefined;
export type PropsType = { [key: string]: PropType };
export type ChildrenType = VNodeType[] | VNodeType | string | null | undefined;

export type VNodeType = {
    $$typeof: Symbol;
    type: string | ComponentType;
    props: { children: ChildrenType } & PropsType;
    key: KeyType;

    _instance?: ComponentType;

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
    domRef?: HTMLElement;
    // unmout()
    render(): VNodeType;
}
