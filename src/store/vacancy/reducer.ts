import { Reducer } from '../../../Fluxs/types/reducer';
import { VacancyState } from './type';
import { VACANCY_ACTION_TYPES } from './actions';
import { defaultVacancy } from './store';

export const vacancyReducer: Reducer<VacancyState> = (state, action) => {
    console.info('VACANCY REDUCER');
    console.info(action);
    switch (action.type) {
        case VACANCY_ACTION_TYPES.UPDATE:
            console.log({ ...state, ...action.vacancy });
            return { ...state, ...action.vacancy };
        case VACANCY_ACTION_TYPES.CLEAR:
            return defaultVacancy;
        default:
            return state;
    }
};
