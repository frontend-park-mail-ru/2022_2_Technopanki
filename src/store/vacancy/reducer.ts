import { Reducer } from '../../../Fluxs/types/reducer';
import { VacancyState } from './type';
import { VACANCY_ACTION_TYPES } from './actions';
import { defaultVacancy } from './store';

export const vacancyReducer: Reducer<VacancyState> = (state, action) => {
    switch (action.type) {
        case VACANCY_ACTION_TYPES.UPDATE:
            return {
                ...state,
                id: action.vacancy.id,
                postedByUserID: action.vacancy.postedByUserId,
                jobType: action.vacancy.jobType,
                title: action.vacancy.title,
                description: action.vacancy.description,
                tasks: action.vacancy.tasks,
                requirements: action.vacancy.requirements,
                extra: action.vacancy.extra,
                // Sidebar
                createdDate: action.vacancy.createdDate,
                salary: action.vacancy.salary,
                location: action.vacancy.location,
                isActive: action.vacancy.isActive,
                experience: action.vacancy.experience,
                format: action.vacancy.format,
                hours: action.vacancy.hours,
                skills: action.vacancy.skills,
            };
        case VACANCY_ACTION_TYPES.UPDATE_FROM_SERVER:
            return {
                id: action.vacancy.id,
                postedByUserID: action.vacancy.postedByUserId,
                jobType: action.vacancy.jobType,
                title: action.vacancy.title,
                description: action.vacancy.description,
                tasks: action.vacancy.tasks,
                requirements: action.vacancy.requirements,
                extra: action.vacancy.extra,
                // Sidebar
                createdDate: action.vacancy.createdDate,
                salary: action.vacancy.salary,
                location: action.vacancy.location,
                isActive: action.vacancy.isActive,
                experience: action.vacancy.experience,
                format: action.vacancy.format,
                hours: action.vacancy.hours,
                skills: action.vacancy.skills,
                isFavorite: state.isFavorite
            };
        case VACANCY_ACTION_TYPES.CLEAR:
            return defaultVacancy;
        case VACANCY_ACTION_TYPES.SET_FAVORITE:
            return {
                ...state,
                isFavorite: action.isFavorite
            }
        default:
            return state;
    }
};
