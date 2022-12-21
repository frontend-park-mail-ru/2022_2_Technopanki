import Store from '../../../Fluxs/store';
import { VacancyState } from './type';
import { vacancyReducer } from './reducer';

export const defaultVacancy: VacancyState = {
    id: '',
    postedByUserID: '',
    jobType: '',
    title: '',
    createdDate: '',
    description: '',
    salary: '',
    location: '',
    isActive: true,
    tasks: '',
    requirements: '',
    extra: '',
    experience: '',
    format: '',
    hours: '',
    skills: [],
    isFavorite: false,
};

export const vacancyStore = new Store<VacancyState>(
    vacancyReducer,
    defaultVacancy,
    [],
);
