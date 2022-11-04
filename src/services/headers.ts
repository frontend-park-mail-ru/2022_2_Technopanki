import { HeadersType } from './types';

export const requestHeaders: HeadersType = {
    jsonHeader: { 'Content-type': 'application/json' },
    imgHeader: { 'Content-Type': 'multipart/form-data' },
};
