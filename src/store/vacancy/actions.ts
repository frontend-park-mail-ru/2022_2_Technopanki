import { VacancyState } from './type';
import { Action } from '../../../Fluxs/types/action';
import { VacancyResponse } from '../../services/vacancy/types';

export const VACANCY_ACTION_TYPES = {
    UPDATE: 'VACANCY_UPDATE',
    UPDATE_FROM_SERVER: 'VACANCY_UPDATE_FROM_SERVER',
    CLEAR: 'VACANCY_CLEAR',
    SET_RESPONSES: 'SET_RESPONSES',
};

export const vacancyActions: {
    updateFromServer: (vacancy: VacancyResponse) => {
        type: string;
        vacancy: VacancyState;
    };
} & { [key: string]: (...data: any[]) => Action } = {
    update: (vacancy: VacancyState) => ({
        type: VACANCY_ACTION_TYPES.UPDATE,
        vacancy,
    }),
    updateFromServer: (vacancy: VacancyResponse) => ({
        type: VACANCY_ACTION_TYPES.UPDATE_FROM_SERVER,
        vacancy: {
            id: vacancy.id.toString(),
            postedByUserID: vacancy.postedByUserId.toString(),
            jobType: '',
            title: vacancy.title,
            description: vacancy.description,
            tasks: vacancy.tasks,
            requirements: vacancy.requirements,
            extra: vacancy.extra,
            createdDate: vacancy.createdDate,
            salary: vacancy.salary.toString(),
            location: vacancy.location,
            experience: vacancy.experience,
            isActive: vacancy.isActive,
            format: vacancy.format,
            hours: vacancy.hours ?? '',
            skills: [],
        } as VacancyState,
    }),
    clear: () => ({
        type: VACANCY_ACTION_TYPES.CLEAR,
    }),
    setResponses: (responses: any) => ({
        type: VACANCY_ACTION_TYPES.SET_RESPONSES,
        responses,
    }),
};
