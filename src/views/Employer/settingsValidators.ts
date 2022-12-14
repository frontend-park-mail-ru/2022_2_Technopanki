import {
    validateAvatarImageFormat,
    validateAvatarImageSize,
    validateCompanyName,
    validatePasswordLength,
    validatePasswordSymbols,
    validateStatusSymbols,
} from '../../utils/validation/validation';
import {
    AVATAR_FORMAT_ERROR,
    AVATAR_SIZE_ERROR,
    MAX_PHOTO_SIZE,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import {
    employerNameLengthValidator,
    employerNameSymbolsValidator,
} from '../../utils/validation/commonValidators';

export const nameLengthValidation = (value: string): [boolean, string] => {
    return employerNameLengthValidator(value);
};

export const nameSymbolsValidation = (value: string): [boolean, string] => {
    return employerNameSymbolsValidator(value);
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

// TODO: вынести в общий модуль
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
        value.length < 10,
        'Размер компании должен быть меньше 10 символов',
    ];
};

export const fileSizeValidation = (file: File): [boolean, string] => {
    return [validateAvatarImageSize(file), AVATAR_SIZE_ERROR];
};

export const fileFormatValidation = (file: File): [boolean, string] => {
    return [validateAvatarImageFormat(file), AVATAR_FORMAT_ERROR];
};

export const businessTypeValidation = (value: string): [boolean, string] => {
    return [
        validateStatusSymbols(value),
        'Тип бизнеса должен содержать только буквы русского или английского алфавита',
    ];
};
