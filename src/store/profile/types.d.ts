import { IMAGE_URL } from '../../utils/networkConstants';

export type EmployerSocialNetworks = {
    vk?: string;
    facebook?: string;
    telegram?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
};

export type EmployerProfile = {
    id: string;
    profileType: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    status: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    size: string;
    fieldOfActivity: string[];
    socialNetworks: EmployerSocialNetworks;
    businessType: string;
    averageColor: string;
};

export type ApplicantProfileType = {
    id: string;
    profileType: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    surname: string;
    status: string;
    description: string;
    basicAvatar: string;
    phone: string;
    email: string;
    location: string;
    dateOfBirth: string;
    skills: string[];
    experience: string;
    socialNetworks: EmployerSocialNetworks;
    averageColor: string;
};

export type ProfileState = EmployerProfile & {
    profileType: string;
    surname: string;
    dateOfBirth: string;
};
