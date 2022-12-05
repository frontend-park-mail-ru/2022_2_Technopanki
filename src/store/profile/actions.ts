import { Action } from '../../../Fluxs/types/action';
import { ApplicantProfileType, EmployerProfile, ProfileState } from './types';
import { EmployerResponse } from '../../services/auth/types';
import { USER_TYPE } from '../../services/auth/authService';
import { IMAGE_URL } from '../../utils/networkConstants';

export const PROFILE_ACTION_TYPES = {
    UPDATE: 'PROFILE_UPDATE',
    UPDATE_FROM_FORM: 'PROFILE_UPDATE_FROM_FORM',
    UPDATE_FROM_SERVER: 'PROFILE_UPDATE_FROM_SERVER',
    UPDATE_AVATAR: 'PROFILE_UPDATE_AVATAR',
};

export const profileActions: {
    updateEmployerFromServer: (state: EmployerResponse) => {
        type: string;
        state: EmployerProfile;
    };
    updateFromFormData: (
        profileID: string,
        userType: string,
        formData: FormData,
    ) => {
        type: string;
        profileID: string;
        formData: FormData;
    };
    updateProfileAvatar: (image: string) => {
        type: string;
        avatarSrc: string;
    };
} & { [key: string]: (...data: any[]) => Action } = {
    updateEmployerFromServer: (serverState: EmployerResponse) => ({
        type: PROFILE_ACTION_TYPES.UPDATE_FROM_SERVER,
        state: {
            id: serverState.id.toString(),
            profileType: USER_TYPE.EMPLOYER,
            name: serverState.company_name,
            surname: '',
            location: serverState.location,
            status: serverState.status,
            description: serverState.description,
            phone: serverState.contact_number,
            email: serverState.email,
            avatarSrc: IMAGE_URL + serverState.image,
            size: serverState.company_size.toString(),
            bannerSrc: '',
            fieldOfActivity: [],
            socialNetworks: [],
            businessType: serverState.business_type,
        } as EmployerProfile,
    }),
    update: (newState: { [key: string]: any }) => ({
        type: PROFILE_ACTION_TYPES.UPDATE,
        state: newState,
    }),
    updateFromFormData: (
        profileID: string,
        userType: string,
        formData: FormData,
    ) => ({
        type: PROFILE_ACTION_TYPES.UPDATE_FROM_FORM,
        userType,
        profileID: profileID,
        formData: formData,
    }),
    updateProfileAvatar: (image: string) => ({
        type: PROFILE_ACTION_TYPES.UPDATE_AVATAR,
        avatarSrc: image,
    }),
};
