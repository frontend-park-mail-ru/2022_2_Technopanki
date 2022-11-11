import { PathType } from '../router/navigator.tsx';
import { VNodeType } from '../../Reacts/shared/common';
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

export const ROUTER_PATHS: { path: PathType; component: Function }[] = [
    {
        path: { path: '/start', validator: (url: string) => url === '/start' },
        component: StartPage,
    },
    {
        path: {
            path: '/signup',
            validator: (url: string) => url === '/signup',
        },
        component: SignUp,
    },
    {
        path: {
            path: '/signin',
            validator: (url: string) => url === '/signin',
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
        // component: ProfileSettings key={'profileSettings'},
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
            path: '/vacancy/new',
            validator: (url: string) => url === '/vacancy/new',
        },
        component: VacancySettings,
        // component: VacancySettings isNew={true},
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
            path: '/vacancies',
            validator: (url: string) => url === '/vacancies',
        },
        component: Vacancies,
    },
    {
        path: {
            path: '/resume',
            validator: (url: string) => /resume\/[1-9]+/.test(url),
        },
        component: Resume,
    },
    {
        path: {
            path: '/applicant',
            validator: (url: string) => /applicant\/[1-9]+/.test(url),
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
            path: '/resume/new',
            validator: (url: string) => url === '/resume/new',
        },
        component: ResumeSettings,
    },
];
