export const validateTitleLength = (value: string): [boolean, string] => {
    return [
        value.length > 0 && value.length < 50,
        'Длина названия компании должна быть между 1 и 50 символами',
    ];
};

export const validateTitleSymbols = (value: string): [boolean, string] => {
    return [
        /^[a-zA-Zа-яА-Я]+(?:[a-zA-Zа-яА-Я \-(){}]+)*$/.test(value),
        'Название вакансии должно состоять из букв русского, английского алфавита или из символов {}()',
    ];
};

export const validateSalary = (value: string): [boolean, string] => {
    return [
        /^[0-9]+(?:[0-9.0]+)*$/.test(value),
        'Зарплата должна содержать только цифры или точки',
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
