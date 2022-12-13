import Store from '../../../Fluxs/store';
import { ResumeState } from './type';
import { resumeReducer } from './reducer';

export const defaultResume: ResumeState = {
    id: '',
    postedByUserID: '',
    avatarSrc: '',
    experience: '',
    title: '',
    description: '',
    university: '',
    faculty: '',
    status: '',
    timeWhenCreated: '',
    // Sidebar
    location: '',
    dateOfBirth: '',
    vk: '',
    facebook: '',
    telegram: '',
    isActive: true,
    skills: [],
};

export const resumeStore = new Store<ResumeState>(
    resumeReducer,
    defaultResume,
    [],
);
