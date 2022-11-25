import {
    validateCompanyName,
    validateNameSymbols,
} from '../../../utils/validation/validation';
import {
    NAME_SYMBOLS_ERROR,
    PHONE_ERROR,
    SURNAME_SYMBOLS_ERROR,
} from '../../../utils/validation/messages';

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
    return [
        /^[0-31].[0-12].[1900-2100]$/.test(value),
        'Ошибка в дате рождения',
    ];
};

export const phoneValidation = (value: string): [boolean, string] => {
    return [
        /^\+[0-9]{1,4} \([0-9]{1,4}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(value),
        PHONE_ERROR,
    ];
};
