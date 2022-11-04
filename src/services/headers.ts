import { HeadersType } from './types';

export const requestHeaders: HeadersType = {
    jsonHeader: { 'Content-Type': 'application/json' },
    imgHeader: { 'Content-Type': 'multipart/form-data' },
};
