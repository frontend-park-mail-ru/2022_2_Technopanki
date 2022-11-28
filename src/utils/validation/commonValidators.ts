import {
    validateCompanyName,
    validateEmail,
    validateNameSymbols,
    validatePasswordLength,
    validatePasswordSymbols,
} from './validation';
import {
    EMAIL_ERROR,
    NAME_LENGTH_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
    SURNAME_LENGTH_ERROR,
    SURNAME_SYMBOLS_ERROR,
} from './messages';

export const emailValidator = (value: string): [boolean, string] => {
    return [validateEmail(value), EMAIL_ERROR];
};

export const applicantNameSymbolsValidator = (
    value: string,
): [boolean, string] => {
    return [validateNameSymbols(value), NAME_SYMBOLS_ERROR];
};

export const applicantNameLengthValidator = (
    value: string,
): [boolean, string] => {
    return [value.length >= 1 && value.length <= 150, NAME_LENGTH_ERROR];
};

export const applicantSurnameSymbolsValidator = (
    value: string,
): [boolean, string] => {
    return [validateNameSymbols(value), SURNAME_SYMBOLS_ERROR];
};

export const applicantSurnameLengthValidator = (
    value: string,
): [boolean, string] => {
    return [value.length >= 1 && value.length <= 150, SURNAME_LENGTH_ERROR];
};

export const employerNameLengthValidator = (
    value: string,
): [boolean, string] => {
    return [
        value.length >= 1 && value.length <= 150,
        'Длина названия компании должна быть между 1 и 150 символами',
    ];
};

export const employerNameSymbolsValidator = (
    value: string,
): [boolean, string] => {
    return [
        validateCompanyName(value),
        'Название компании должно содержать только буквы русского или английского алфавита',
    ];
};

export const passwordSymbolsValidator = (value: string): [boolean, string] => {
    return [validatePasswordSymbols(value), PASSWORD_SYMBOLS_ERROR];
};

export const passwordLengthValidator = (value: string): [boolean, string] => {
    return [validatePasswordLength(value), PASSWORD_LENGTH_ERROR];
};

/**
 *
 */
export const repeatPasswordValidator = {
    setPassword(value: string) {
        // @ts-ignore
        this.password = value;
    },
    isPasswordsEqualValidators(value: string): [boolean, string] {
        return [this.password === value, 'Пароли должны совпадать'];
    },
};
