import { Action } from '../../../Fluxs/types/action';
import { ApplicantProfileType, EmployerProfile, ProfileState } from './types';
import { EmployerResponse } from '../../services/auth/types';
import { USER_TYPE } from '../../services/auth/authService';
import { IMAGE_URL } from '../../utils/networkConstants';

export const PROFILE_ACTION_TYPES = {
    UPDATE: 'PROFILE_UPDATE',
    UPDATE_FROM_FORM: 'PROFILE_UPDATE_FROM_FORM',
    UPDATE_FROM_SERVER: 'PROFILE_UPDATE_FROM_SERVER',
};

export const profileActions: {
    updateEmployerFromServer: (state: EmployerResponse) => {
        type: string;
        state: EmployerProfile;
    };
} & { [key: string]: (...data: any[]) => Action } = {
    updateEmployerFromServer: (serverState: EmployerResponse) => ({
        type: PROFILE_ACTION_TYPES.UPDATE_FROM_SERVER,
        state: {
            id: serverState.id.toString(),
            profileType: USER_TYPE.EMPLOYER,
            name: serverState.company_name,
            surname: '',
            location: '',
            dateOfBirth: serverState.date_of_birth,
            status: serverState.status,
            description: serverState.description,
            phone: serverState.contact_number,
            email: serverState.email,
            avatarSrc: IMAGE_URL + serverState.image,
            size: serverState.company_size.toString(),
            bannerSrc: '',
            fieldOfActivity: [],
            socialNetworks: [],
        } as EmployerProfile,
    }),
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
