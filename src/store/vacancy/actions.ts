import { VacancyState } from './type';
import { Action } from '../../../Fluxs/types/action';

export const VACANCY_ACTION_TYPES = {
    UPDATE: 'VACANCY_UPDATE',
    CLEAR: 'VACANCY_CLEAR',
};

export const vacancyActions: { [key: string]: (...data: any[]) => Action } = {
    update: (vacancy: VacancyState) => ({
        type: VACANCY_ACTION_TYPES.UPDATE,
        vacancy,
    }),
    clear: () => ({
        type: VACANCY_ACTION_TYPES.CLEAR,
    }),
};
