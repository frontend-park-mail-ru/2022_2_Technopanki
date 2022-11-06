import { ProfileState } from './type';
import { ResumeListItemPropsType } from '../../components/UI-kit/resumeList/ResumeListItem';
import Store from '../../../Fluxs/store';
import { applicantProfileReducer } from './reducer';

export const defaultApplicantProfile: ProfileState ={
    id: 'test',
    imgSrc: 'test',
    name: 'test',
    surname: 'test',
    status: 'test',
    phone: 'test',
    email: 'test',
    location: 'test',
    dateOfBirth: 'test',
    skills: ['test'],
}

export const applicantProfileStore = new Store<ProfileState>(
    applicantProfileReducer,
    defaultApplicantProfile,
    [],
);