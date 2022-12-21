import { PathType } from '../router/navigator.tsx';
import { VNodeType } from '../../__Reacts__old_version__/shared/common';
import StartPage from '../views/StartPage/StartPage';
import SignUp from '../views/SignUp/SignUp';
import SignIn from '../views/SignIn/SignIn';
import Profile from '../views/Employer/Profile';
import ProfileSettings from '../views/Employer/ProfileSettings';
import Vacancy from '../views/Vacancy';
import VacancySettings from '../views/Vacancy/VacancySettings';
import VacancyResponses from '../views/Vacancy/VacancyResponses';
import Vacancies from '../views/Vacancies/Vacancies';
import Resume from '../views/Applicant/Resume/Resume';
import ApplicantProfile from '../views/Applicant/Profile/Profile';
import ApplicantSettings from '../views/Applicant/Profile/ProfileSettings';
import ResumeSettings from '../views/Applicant/Resume/ResumeSettings';
import Search from '../views/Search/Search';
import { RESUME_PATHS, SEARCH_PATHS, SIGN_IN_PATH, SIGN_UP_PATH, VACANCY_PATHS } from '../utils/routerConstants';
import EmailConfirm from '../views/SignUp/EmailConfirm';

export const ROUTER_PATHS: { path: PathType; component: Function }[] = [
    {
        path: { path: '/start', validator: (url: string) => url === '/start' },
        component: StartPage,
    },
    {
        path: {
            path: SIGN_UP_PATH,
            validator: (url: string) => url === SIGN_UP_PATH,
        },
        component: SignUp,
    },
    {
        path: {
            path: '/confirm/signup',
            validator: (url: string) => url === '/confirm/signup',
        },
        component: EmailConfirm,
    },
    {
        path: {
            path: '/confirm/signin',
            validator: (url: string) => url === '/confirm/signin',
        },
        component: EmailConfirm,
    },
    {
        path: {
            path: SIGN_IN_PATH,
            validator: (url: string) => url === SIGN_IN_PATH,
        },
        component: SignIn,
    },
    {
        path: {
            path: '/employer',
            validator: (url: string) => /employer\/[0-9]+/.test(url),
        },
        component: Profile,
    },
    {
        path: {
            path: '/employer/settings',
            validator: (url: string) => /employer\/settings\/[0-9]+/.test(url),
        },
        component: ProfileSettings,
    },
    {
        path: {
            path: '/vacancy',
            validator: (url: string) => /vacancy\/[1-9]+/.test(url),
        },
        component: Vacancy,
    },
    {
        path: {
            path: VACANCY_PATHS.NEW,
            validator: (url: string) => url === VACANCY_PATHS.NEW,
        },
        component: VacancySettings,
    },
    {
        path: {
            path: '/vacancy/settings',
            validator: (url: string) => /vacancy\/settings\/[0-9]+/.test(url),
        },
        component: VacancySettings,
    },
    {
        path: {
            path: '/vacancy/responses',
            validator: (url: string) => /vacancy\/responses\/[0-9]+/.test(url),
        },
        component: VacancyResponses,
    },
    {
        path: {
            path: SEARCH_PATHS.VACANCIES,
            validator: (url: string) => url === SEARCH_PATHS.VACANCIES,
        },
        component: Search,
    },
    {
        path: {
            path: SEARCH_PATHS.APPLICANTS,
            validator: (url: string) => url === SEARCH_PATHS.APPLICANTS,
        },
        component: Search,
    },
    {
        path: {
            path: SEARCH_PATHS.EMPLOYERS,
            validator: (url: string) => url === SEARCH_PATHS.EMPLOYERS,
        },
        component: Search,
    },
    {
        path: {
            path: SEARCH_PATHS.RESUMES,
            validator: (url: string) => url === SEARCH_PATHS.RESUMES,
        },
        component: Search,
    },
    {
        path: {
            path: '/resume',
            validator: (url: string) => /resume\/[0-9]+/.test(url),
        },
        component: Resume,
    },
    {
        path: {
            path: '/applicant',
            validator: (url: string) => /applicant\/[0-9]+/.test(url),
        },
        component: ApplicantProfile,
    },
    {
        path: {
            path: '/applicant/settings',
            validator: (url: string) => /applicant\/settings\/[0-9]+/.test(url),
        },
        component: ApplicantSettings,
    },
    {
        path: {
            path: '/resume/settings',
            validator: (url: string) => /resume\/settings\/[0-9]+/.test(url),
        },
        component: ResumeSettings,
    },
    {
        path: {
            path: RESUME_PATHS.NEW,
            validator: (url: string) => url === RESUME_PATHS.NEW,
        },
        component: ResumeSettings,
    },
];
