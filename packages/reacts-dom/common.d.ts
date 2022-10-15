export type KeyType = string | Symbol;
export type JSXElementType = string | Function;
export type PropsType = any & { children: VNodeType[] | VNodeType | null };

export type VNodeType = {
    $$typeof: Symbol;
    type: string | Function;
    props: any & { children: VNodeType[] | VNodeType | null };
    key: KeyType;

    // ---------
    // TODO
    _parent?: VNodeType | null;
    _depth?: number;
    // From preact source code
    // "_nextDom must be initialized to undefined b/c it will eventually
    // be set to dom.nextSibling which can return `null` and it is important
    // to be able to distinguish between an uninitialized _nextDom and
    // a _nextDom that has been set to `null`"
    _nextDom?: VNodeType | null | undefined;
    _instance?: ComponentType | null;
    constructor?: Function | undefined;
};

export interface ComponentType {
    _vnode?: VNodeType;
    _baseElement?: Element;
    render(): VNodeType;
}
