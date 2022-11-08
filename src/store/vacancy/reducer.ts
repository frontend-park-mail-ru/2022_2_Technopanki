import { Reducer } from '../../../Fluxs/types/reducer';
import { VacancyState } from './type';
import { VACANCY_ACTION_TYPES } from './actions';
import { defaultVacancy } from './store';

export const vacancyReducer: Reducer<VacancyState> = (state, action) => {
    switch (action.type) {
        case VACANCY_ACTION_TYPES.UPDATE:
            console.log('VACANCY REDUCER: ', action);
            return {
                ...state,
                ...action.vacancy,
                id: action.vacancy.id.toString(),
                postedByUserID: action.vacancy.postedByUserId.toString(),
            };
        case VACANCY_ACTION_TYPES.CLEAR:
            return defaultVacancy;
        default:
            return state;
    }
};
