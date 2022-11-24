import {
    validateCompanyName,
    validatePasswordLength,
    validatePasswordSymbols,
    validateStatusSymbols,
} from '../../utils/validation/validation';
import {
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';

export const nameLengthValidation = (value: string): [boolean, string] => {
    return [
        value.length >= 1 && value.length <= 150,
        'Длина названия компании должна быть между 1 и 150 символами',
    ];
};

export const nameSymbolsValidation = (value: string): [boolean, string] => {
    return [
        validateCompanyName(value),
        'Название компании должно содержать только буквы русского или английского алфавита',
    ];
};

export const sloganLengthValidation = (value: string): [boolean, string] => {
    return [
        value.length < 100,
        'Длина слогана должна быть меньше 100 символов',
    ];
};

export const sloganZeroLengthValidation = (
    value: string,
): [boolean, string] => {
    return [value.length > 0, 'Слоган не может быть пустым'];
};

export const sloganSymbolsValidation = (value: string): [boolean, string] => {
    return [
        validateStatusSymbols(value),
        'Слоган содержать только буквы русского или английского алфавита',
    ];
};

export const locationValidation = (value: string): [boolean, string] => {
    return [
        value === '' ? true : /^[A-ZА-Я]+(?:[a-zA-Zа-яА-Я\-\s]+)*$/.test(value),
        'Ошибка в названии города',
    ];
};

export const validateSizeSymbols = (value: string): [boolean, string] => {
    return [
        /^[1-9]+(?:[1-9\.0]+)*$/.test(value),
        'Размер компании должен содежрать только цифры и точки',
    ];
};

export const validateSizeLength = (value: string): [boolean, string] => {
    return [
        value.length > 0 && value.length <= 10,
        'Размер компании должен содержать от 1 до 10 символов',
    ];
};

export const passwordSymbolsValidation = (value: string): [boolean, string] => {
    return [validatePasswordSymbols(value), PASSWORD_SYMBOLS_ERROR];
};

export const passwordLengthValidation = (value: string): [boolean, string] => {
    return [validatePasswordLength(value), PASSWORD_LENGTH_ERROR];
};
