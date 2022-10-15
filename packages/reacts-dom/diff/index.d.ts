import { VNodeType } from '../common';

export interface Updater {
    remove: any;
    set: any;
}

export interface Operation {
    type: string;
    [key: string]: VNodeType | Updater | string;
}
