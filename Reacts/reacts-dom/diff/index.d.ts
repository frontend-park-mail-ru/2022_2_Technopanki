import {
    ChildrenType,
    PropsType,
    PropType,
    VNodeType,
} from '../../shared/common';

// For algorithms purpose we make Attribute type as tuple
export type Attribute = [string, PropType];

export interface AttributeUpdater {
    remove: string[];
    set: Attribute[];
    update: Attribute[];
}

export interface Operation {
    type: string;
    [key: string]:
        | VNodeType
        | VNodeType[]
        | AttributeUpdater
        | Operation[]
        | Operation
        | string;
}

export interface Update extends Operation {
    attrUpdater: AttributeUpdater;
    childrenUpdater: Operation[];
    node: VNodeType;
}

export interface Remove extends Operation {
    node: VNodeType;
}

export interface Insert extends Operation {
    node: VNodeType;
}

export interface Replace extends Operation {
    remove: Remove;
    insert: Insert;
}
