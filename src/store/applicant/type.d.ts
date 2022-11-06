import { ResumeListItemPropsType } from '../../components/UI-kit/resumeList/ResumeListItem';

export type ProfileState = {
    id: string;
    imgSrc: string;
    name: string;
    surname: string;
    status: string;
    phone: string;
    email: string;
    resumeList: ResumeListItemPropsType[];
    location: string;
    dateOfBirth: string;
    skills: string[];
    vk: string | null | undefined;
    facebook: string | null | undefined;
    telegram: string | null | undefined;
}