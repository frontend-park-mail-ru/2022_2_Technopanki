import Store from '../../../Fluxs/store';
import { profileReducer } from './reducer';
import { ProfileState } from './types';

export const defaultProfileState: ProfileState = {
    id: '',
    profileType: '',
    bannerSrc: '',
    avatarSrc: '',
    name: '',
    status: '',
    description: '',
    phone: '',
    email: '',
    location: '',
    size: '',
    fieldOfActivity: [],
    socialNetworks: {
        vk: undefined,
        facebook: undefined,
        telegram: undefined,
        youtube: undefined,
        twitter: undefined,
        instagram: undefined,
    },
};

export const profileStore = new Store(profileReducer, defaultProfileState);
