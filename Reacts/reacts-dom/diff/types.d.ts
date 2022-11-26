import { PropType, ReactsNode } from '../../shared/types/node';

export type PropsUpdater = {
    set: [string, PropType][];
    remove: [string, PropType][];
};

export type Operation = {
    type: string;
    [key: string]:
        | ReactsNode
        | PropsUpdater
        | Operation[]
        | Operation
        | string
        | number;
};

export interface UpdateOperation extends Operation {
    attrUpdater: PropsUpdater;
    childrenUpdater: Operation | Operation[];
    node: ReactsNode;
}

export interface ReplaceOperation extends Operation {
    oldNode: ReactsNode;
    newNode: ReactsNode;
}

export interface SkipOperation extends Operation {}

export interface RemoveOperation extends Operation {
    node: ReactsNode;
}

export interface InsertOperation extends Operation {
    node: ReactsNode;
}
