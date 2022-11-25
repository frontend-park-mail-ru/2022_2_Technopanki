import {
    validateAvatarImageFormat,
    validateAvatarImageSize,
    validateCompanyName,
    validateEmail,
    validateNameSymbols,
} from '../../../utils/validation/validation';
import {
    AVATAR_FORMAT_ERROR,
    AVATAR_SIZE_ERROR,
    EMAIL_ERROR,
    NAME_SYMBOLS_ERROR,
    PHONE_ERROR,
    SURNAME_SYMBOLS_ERROR,
} from '../../../utils/validation/messages';
import { validateLocation } from '../../Vacancy/settingsValidators';

export const nameLengthValidation = (value: string): [boolean, string] => {
    return [
        value.length >= 1 && value.length <= 150,
        'Длина имени должна быть между 1 и 50 символами',
    ];
};

export const surnameLengthValidation = (value: string): [boolean, string] => {
    return [
        value.length >= 1 && value.length <= 150,
        'Длина фамилии должна быть между 1 и 50 символами',
    ];
};

export const nameSymbolsValidation = (value: string): [boolean, string] => {
    return [validateNameSymbols(value), NAME_SYMBOLS_ERROR];
};

export const surnameSymbolsValidation = (value: string): [boolean, string] => {
    return [validateNameSymbols(value), SURNAME_SYMBOLS_ERROR];
};

export const dateOfBirthValidation = (value: string): [boolean, string] => {
    const [year, month, day] = value.split('-');

    const yearIsValid = parseInt(year) > 1900 && parseInt(year) < 2100;
    if (!yearIsValid) {
        return [yearIsValid, 'Год не может быть меньше 1900 или больше 2100'];
    }

    const monthIsValid = parseInt(month) >= 0 && parseInt(month) <= 12;
    if (!monthIsValid) {
        return [yearIsValid, 'Ошибка в месяце'];
    }

    const dayIsValid = parseInt(day) >= 0 && parseInt(day) <= 31;
    if (!dayIsValid) {
        return [dayIsValid, 'Ошибка в месяце'];
    }

    return [true, ''];
};

export const phoneValidation = (value: string): [boolean, string] => {
    return [
        /^\+[0-9]{1,4} \([0-9]{1,4}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(value),
        PHONE_ERROR,
    ];
};

export const fileSizeValidation = (file: File): [boolean, string] => {
    return [validateAvatarImageSize(file), AVATAR_SIZE_ERROR];
};

export const fileFormatValidation = (file: File): [boolean, string] => {
    return [validateAvatarImageFormat(file), AVATAR_FORMAT_ERROR];
};

export const locationValidation = (value: string): [boolean, string] => {
    return validateLocation(value);
};

// export const experinceValidation = (value: string): [boolean, string] => {};

export const emailValidation = (value: string): [boolean, string] => {
    return [validateEmail(value), EMAIL_ERROR];
};
