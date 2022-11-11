import { Action } from '../../../Fluxs/types/action';
import { ProfileState } from './types';

export const PROFILE_ACTION_TYPES = {
    UPDATE: 'PROFILE_UPDATE',
    UPDATE_FROM_FORM: 'PROFILE_UPDATE_FROM_FORM',
};

// TODO: внести в общий тип
export const profileActions: { [key: string]: (...data: any[]) => Action } = {
    update: (newState: { [key: string]: any }) => ({
        type: PROFILE_ACTION_TYPES.UPDATE,
        state: newState,
    }),
    updateFromFormData: (
        profileID: string,
        userType: string,
        avatarSrc: string,
        formData: FormData,
    ) => ({
        type: PROFILE_ACTION_TYPES.UPDATE_FROM_FORM,
        profileID: profileID,
        avatarSrc: avatarSrc,
        formData: formData,
    }),
};
