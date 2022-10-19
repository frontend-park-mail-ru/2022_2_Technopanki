'use strict';

module.exports = {
    types: [
        {
            value: 'build',
            name: 'build:     Сборка проекта или изменения внешних зависимостей',
        },
        { value: 'docs', name: 'docs:      Обновление документации' },
        { value: 'feat', name: 'feat:      Добавление нового функционала' },
        { value: 'fix', name: 'fix:       Исправление ошибок' },
        {
            value: 'perf',
            name: 'perf:      Изменения направленные на улучшение производительности',
        },
        {
            value: 'refactor',
            name: 'refactor:  Правки кода без исправления ошибок или добавления новых функций',
        },
        { value: 'revert', name: 'revert:    Откат на предыдущие коммиты' },
        {
            value: 'style',
            name: 'style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)',
        },
        {
            value: 'JSDoc',
            name: 'JSDoc:   Добавления JSDoc в файлы',
        },
        { value: 'test', name: 'test:      Добавление тестов' },
    ],

    // Область. Она характеризует фрагмент кода, которую затронули изменения
    scopes: [
        { name: 'components' },
        { name: 'views' },
        { name: 'services' },
        { name: 'server' },
        { name: 'reacts library' },
        { name: 'git' },
        { name: 'configs' },
        { name: 'docker' },
    ],

    // Поменяем дефолтные вопросы
    messages: {
        type: 'Какие изменения вы вносите?',
        scope: '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
        // Спросим если allowCustomScopes в true
        customScope: 'Укажите свою ОБЛАСТЬ:',
        subject: 'Напишите КОРОТКОЕ описание в ПОВЕЛИТЕЛЬНОМ наклонении:\n',
        body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
        confirmCommit: 'Вас устраивает получившийся коммит?',
    },

    // Разрешим собственную ОБЛАСТЬ
    allowCustomScopes: true,

    subjectLimit: 120,
};
