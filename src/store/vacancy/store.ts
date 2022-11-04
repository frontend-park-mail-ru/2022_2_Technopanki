import Store from '../../../Fluxs/store';
import { VacancyState } from './type';
import { vacancyReducer } from './reducer';

export const defaultVacancy: VacancyState = {
    id: 'test',
    postedByUserID: 'test',
    jobType: 'test',
    title: 'test',
    createdDate: 'test',
    description: 'test',
    salary: 'test',
    location: 'test',
    isActive: true,
    tasks: '',
    requirements: '',
    extra: '',
    experience: '',
    format: '',
    hours: '',
    skills: [],
};

export const vacancyStore = new Store<VacancyState>(
    vacancyReducer,
    defaultVacancy,
    [],
);
