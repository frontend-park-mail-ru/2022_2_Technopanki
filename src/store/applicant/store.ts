import { ProfileState } from './type';
import { ResumeListItemPropsType } from '../../components/UI-kit/resumeList/ResumeListItem';
import Store from '../../../Fluxs/store';
import { applicantProfileReducer } from './reducer';

export const defaultApplicantProfile: ProfileState = {
    id: '',
    avatar_src: '',
    applicant_name: '',
    applicant_surname: '',
    status: '',
    contact_number: '',
    experiene: '',
    email: '',
    location: '',
    dateOfBirth: '',
    skills: [],
    vk: '',
    facebook: '',
    telegram: '',
    mailingApproval: false,
};

export const applicantProfileStore = new Store<ProfileState>(
    applicantProfileReducer,
    defaultApplicantProfile,
    [],
);
