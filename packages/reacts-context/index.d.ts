import { ChildrenType, PropsType, PropType, VNodeType } from '../shared/common';

export interface Provider<T extends PropType> extends VNodeType {
    props: { value: T; children?: ChildrenType };
    _consumers?: Consumer<T>[];
}

export interface Consumer<T extends PropType> extends VNodeType {
    children?: (value: T) => VNodeType;
    _provider?: Provider<T>;
}

export interface Context<T extends PropType> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
}
