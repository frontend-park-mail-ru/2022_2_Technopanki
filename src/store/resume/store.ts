import Store from '../../../Fluxs/store';
import { ResumeState } from './type'
import { resumeReducer } from './reducer';

export const defaultResume: ResumeState = {
    id: 'test',
    postedByUserID: 'test',
    title: 'test',
    description: 'test',
    university: 'test',
    faculty: 'test',
    status: 'test',
    // Sidebar
    location: 'test',
    dateOfBirth: 'test',
    isActive: true,
}

export const resumeStore = new Store<ResumeState>(
    resumeReducer,
    defaultResume,
    [],
);