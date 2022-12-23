export const validateTitleLength = (value: string): [boolean, string] => {
    return [
        value.length > 0 && value.length < 30,
        'Длина названия резюме должна быть между 1 и 30 символами',
    ];
};


export const validateTitleSymbols = (value: string): [boolean, string] => {
    return [
        !value.split('').some(value => !/[a-zA-Z а-яА-Я+#\-!{}()]/.test(value)),
        'Название резюме должно состоять из букв русского, английского алфавита или спец. символов',
    ];
};
