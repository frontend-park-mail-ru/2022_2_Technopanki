export const EMAIL_ERROR = 'Некорректный email';

export const PASSWORD_SYMBOLS_ERROR =
    'Пароль должен содержать буквы латиницы, цифры и спецсимволы(!#%^$)';
export const PASSWORD_LENGTH_ERROR =
    'Длина пароля должна быть между 8 и 20 символами';
export const PASSWORD_REPEAT_ERROR = 'Пароли должны совпадать';

export const NAME_LENGTH_ERROR =
    'Длина имени должна быть между 1 и 20 символами';
export const SURNAME_LENGTH_ERROR =
    'Длина фамилии должна быть между 1 и 20 символами';

export const NAME_SYMBOLS_ERROR =
    'Имя должно содержать буквы русского или английского алфавита';
export const SURNAME_SYMBOLS_ERROR =
    'Фамилия должна содержать буквы русского или английского алфавита';

export const DEFAULT_MESSAGE = 'Ошибка. Проверьте email или пароль';

export const RESUME_TITLE_ERROR = 'Это поле должно быть заполнено';

export const RESUME_DESCRIPTION_ERROR = 'Это поле должно быть заполнено';

export const PHONE_ERROR =
    'Номер телефона должен быть в формате: +7 (999) 999-99-99';

export const COMPANY_NAME_ERROR =
    'Название компании должно содержать только русские или английские буквы и не быть пустым';

// Max size of avatar in bytes (1MB)
export const MAX_PHOTO_SIZE = 1024 * 1024;

export const AVATAR_SIZE_ERROR = 'Размер файла не должен превышать 1МБ';
export const AVATAR_FORMAT_ERROR =
    'Поддерживаемые форматы файлов: png, jpg, gif';
