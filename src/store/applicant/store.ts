import { ProfileState } from './type';
import { ResumeListItemPropsType } from '../../components/UI-kit/resumeList/ResumeListItem';
import Store from '../../../Fluxs/store';
import { applicantProfileReducer } from './reducer';

export const defaultApplicantProfile: ProfileState = {
    id: '',
    avatarSrc: '',
    name: '',
    surname: '',
    status: '',
    phone: '',
    email: '',
    location: '',
    dateOfBirth: '',
    skills: [],
    vk: '',
    facebook: '',
    telegram: '',
};

export const applicantProfileStore = new Store<ProfileState>(
    applicantProfileReducer,
    defaultApplicantProfile,
    [],
);
