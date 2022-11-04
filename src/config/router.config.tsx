import { PathType } from '../router/navigator';
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

export const ROUTER_PATHS: { path: PathType; component: VNodeType }[] = [
    {
        path: { path: '/start', validator: (url: string) => url === '/start' },
        component: <StartPage />,
    },
    {
        path: {
            path: '/signup',
            validator: (url: string) => url === '/signup',
        },
        component: <SignUp />,
    },
    {
        path: {
            path: '/signin',
            validator: (url: string) => url === '/signin',
        },
        component: <SignIn />,
    },
    {
        path: {
            path: '/employer',
            validator: (url: string) => /employer\/[1-9]+/.test(url),
        },
        component: <Profile />,
    },
    {
        path: {
            path: '/employer/settings',
            validator: (url: string) => url === '/employer/settings',
        },
        component: <ProfileSettings />,
    },
    {
        path: {
            path: '/vacancy',
            validator: (url: string) => /vacancy\/[1-9]+/.test(url),
        },
        component: <Vacancy />,
    },
    {
        path: {
            path: '/vacancy/new',
            validator: (url: string) => url === '/vacancy/new',
        },
        component: <VacancySettings isNew={true} />,
    },
    {
        path: {
            path: '/vacancy/settings',
            validator: (url: string) => url === '/vacancy/settings',
        },
        component: <VacancySettings />,
    },
    {
        path: {
            path: '/vacancy/responses',
            validator: (url: string) => url === '/vacancy/responses',
        },
        component: <VacancyResponses />,
    },
    {
        path: {
            path: '/vacancies',
            validator: (url: string) => url === '/vacancies',
        },
        component: <Vacancies />,
    },
];
