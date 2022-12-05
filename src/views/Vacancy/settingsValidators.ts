export const validateTitleLength = (value: string): [boolean, string] => {
    return [
        value.length > 0 && value.length < 50,
        'Длина названия компании должна быть между 1 и 50 символами',
    ];
};

export const validateTitleSymbols = (value: string): [boolean, string] => {
    return [
        !value.split('').some(value => !/[a-zA-Z а-яА-Я]/.test(value)),
        'Название вакансии должно состоять из букв русского, английского алфавита или из символов {}()',
    ];
};

export const validateSalary = (value: number): [boolean, string] => {
    return [
        value.toString().length < 10,
        'Длина числа зарплаты не может быть больше 10 цифр',
    ];
};

export const validateExperience = (value: string): [boolean, string] => {
    return [
        /^[0-9]+(?:[0-9\-]+)*$/.test(value),
        'Опыт работы должен содержать цифры или -',
    ];
};

export const validateLocation = (value: string): [boolean, string] => {
    return [
        value === '' ? true : /^[A-ZА-Я]+(?:[a-zA-Zа-яА-Я\-\s]+)*$/.test(value),
        'Ошибка в названии города',
    ];
};
