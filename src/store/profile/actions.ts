import { Action } from '../../../Fluxs/types/action';
import { ProfileState } from './types';

export const PROFILE_ACTION_TYPES = {
    UPDATE: 'PROFILE_UPDATE',
};

// TODO: внести в общий тип
export const profileActions: { [key: string]: (...data: any[]) => Action } = {
    update: (newState: { [key: string]: any }) => ({
        type: PROFILE_ACTION_TYPES.UPDATE,
        state: newState,
    }),
};
