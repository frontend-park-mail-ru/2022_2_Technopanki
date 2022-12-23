import { ProfileState } from './type';
import { Action } from '../../../Fluxs/types/action';
import { ApplicantResponse } from '../../services/auth/types';
import { ApplicantProfileType } from '../profile/types';
import { USER_TYPE } from '../../services/auth/authService';
import { IMAGE_URL } from '../../utils/networkConstants';

export const APPLICANT_ACTIONS_TYPE = {
    UPDATE: 'APPLICANT_UPDATE',
    CLEAR: 'APPLICANT_CLEAR',
    UPDATE_FROM_SERVER: 'APPLICANT_UPDATE_FROM_SERVER',
};

export const applicantActions: {
    updateFromServer: (profile: ApplicantResponse) => {
        type: string;
        state: ApplicantProfileType;
    };
} & { [key: string]: (...data: any[]) => Action } = {
    update: (applicantProfile: ProfileState) => ({
        type: APPLICANT_ACTIONS_TYPE.UPDATE,
        applicantProfile,
    }),
    updateFromServer: (profile: ApplicantResponse) => ({
        type: APPLICANT_ACTIONS_TYPE.UPDATE_FROM_SERVER,
        state: {
            id: profile.id.toString(),
            profileType: USER_TYPE.APPLICANT,
            bannerSrc: './',
            avatarSrc: IMAGE_URL + profile.image,
            name: profile.applicant_name,
            surname: profile.applicant_surname,
            status: profile.status,
            description: profile.description,
            basicAvatar: profile.image,
            phone: profile.contact_number,
            email: profile.email,
            location: profile.location ?? '',
            dateOfBirth: profile.date_of_birth,
            averageColor: profile.average_color,
            mailingApproval: profile.mailing_approval
        } as ApplicantProfileType,
    }),
    clear: () => ({
        type: APPLICANT_ACTIONS_TYPE.CLEAR,
    }),
};
