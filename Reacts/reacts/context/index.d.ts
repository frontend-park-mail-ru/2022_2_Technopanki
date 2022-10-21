import {
    ChildrenType,
    PropsType,
    PropType,
    VNodeType,
} from '../../shared/common';

export interface Provider<T extends PropType> extends VNodeType {
    props: { value: T; children: ChildrenType };
    _consumers?: Consumer<T>[];
}

export interface Consumer<T extends PropType> extends VNodeType {
    props: { children: (value: T) => VNodeType };
    _context: Context<T>;
}

export interface Context<T extends PropType> extends VNodeType {
    value: T;
    Consumer: {};
    Provider: {};
}
