import {
    ChildrenType,
    PropsType,
    PropType,
    VNodeType,
} from '../../shared/common';

export interface Context<T extends PropType> extends VNodeType {
    value: T;
    Consumer: {};
    Provider: {};
}
