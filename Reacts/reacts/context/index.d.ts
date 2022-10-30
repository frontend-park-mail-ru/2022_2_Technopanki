import {
    ChildrenType,
    PropsType,
    PropType,
    VNodeType,
} from '../../shared/common';

// @ts-ignore
export interface Context<T extends PropType> extends VNodeType {
    props: { children?: Function | ChildrenType } & PropsType;
    value: T;
    Consumer: Context<T>;
    Provider: {
        $$typeof: Symbol;
        _context: Context<T>;
    };
}
