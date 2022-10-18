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
    [key: string]: VNodeType | AttributeUpdater | Operation[] | string;
}
