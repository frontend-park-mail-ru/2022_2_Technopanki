// React Nodes
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L162

// React src
// https://github.com/facebook/react/tree/main/packages/react

import {
    ChildrenType,
    PropsType,
    PropType,
    VNodeType,
} from '../../shared/common';
import { Component } from './Component';

type ComponentChildren =
    | Exclude<ChildrenType, VNodeType[] | VNodeType>
    | ReactsNode
    | ReactsNode[]
    | null;

export interface ReactsNode<P extends PropsType = {}> extends VNodeType {
    props: { children: ComponentChildren } & P;
    _instance?: Component<P>;
}
