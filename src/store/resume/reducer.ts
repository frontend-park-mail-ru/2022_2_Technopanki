import { Reducer } from '../../../Fluxs/types/reducer';
import { ResumeState } from './type';
import { RESUME_ACTIONS_TYPE } from './actions';
import { defaultResume } from './store';

export const resumeReducer: Reducer<ResumeState> = (state, action) => {
    switch (action.type) {
        case RESUME_ACTIONS_TYPE.UPDATE:
            return {
                ...state,
                ...action.resume,
                id:
                    typeof action.resume.id === 'string'
                        ? action.resume.id
                        : action.resume.id.toString(),
                postedByUserID: action.resume.user_account_id.toString(),
                title: action.resume.title,
                description: action.resume.description,
                status: action.resume.education_detail.certificate_degree_name,
                university: action.resume.education_detail.university_name,
                faculty: action.resume.education_detail.major,
                timeWhenCreated: action.resume.created_date,
                location: action.resume.location,
                dateOfBirth: action.resume.date_of_birth,
                skills: action.resume.skills,
            };
        case RESUME_ACTIONS_TYPE.CLEAR:
            return {
                postedByUserID: action.postedByUserID.toString(),
                defaultResume,
            };
        default:
            return state;
    }
};
