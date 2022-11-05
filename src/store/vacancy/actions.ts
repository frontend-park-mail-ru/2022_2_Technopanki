import { VacancyState } from './type';
import { Action } from '../../../Fluxs/types/action';
import vacancy from '../../views/Vacancy';

export const VACANCY_ACTION_TYPES = {
    UPDATE: 'VACANCY_UPDATE',
    CLEAR: 'VACANCY_CLEAR',
    SET_RESPONSES: 'SET_RESPONSES',
};

export const vacancyActions: { [key: string]: (...data: any[]) => Action } = {
    update: (vacancy: VacancyState) => ({
        type: VACANCY_ACTION_TYPES.UPDATE,
        vacancy,
    }),
    clear: () => ({
        type: VACANCY_ACTION_TYPES.CLEAR,
    }),
    setResponses: (responses: any) => ({
        type: VACANCY_ACTION_TYPES.SET_RESPONSES,
        responses,
    }),
};
