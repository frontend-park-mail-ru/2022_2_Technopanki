export const setTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'light';
    if (theme === 'light') {
        document.documentElement.style.setProperty('--background-900', '#fff');
        document.documentElement.style.setProperty(
            '--background-800',
            '#f8f8f8',
        );
        document.documentElement.style.setProperty(
            '--background-700',
            '#dadae0',
        );
        document.documentElement.style.setProperty(
            '--background-600',
            '#c3c3cb',
        );
        document.documentElement.style.setProperty(
            '--background-500',
            '#adadb7',
        );
        document.documentElement.style.setProperty(
            '--background-400',
            '#9797a2',
        );
        document.documentElement.style.setProperty(
            '--background-300',
            '#81818e',
        );
        document.documentElement.style.setProperty(
            '--background-200',
            '#6d6d7a',
        );
        document.documentElement.style.setProperty(
            '--background-100',
            '#595965',
        );
        document.documentElement.style.setProperty(
            '--background-50',
            '#464651',
        );
        document.documentElement.style.setProperty('--background-0', '#33333c');
    } else {
        document.documentElement.style.setProperty('--background-0', '#fff');
        document.documentElement.style.setProperty(
            '--background-50',
            '#f8f8f8',
        );
        document.documentElement.style.setProperty(
            '--background-100',
            '#dadae0',
        );
        document.documentElement.style.setProperty(
            '--background-200',
            '#c3c3cb',
        );
        document.documentElement.style.setProperty(
            '--background-300',
            '#adadb7',
        );
        document.documentElement.style.setProperty(
            '--background-400',
            '#9797a2',
        );
        document.documentElement.style.setProperty(
            '--background-500',
            '#81818e',
        );
        document.documentElement.style.setProperty(
            '--background-600',
            '#6d6d7a',
        );
        document.documentElement.style.setProperty(
            '--background-700',
            '#595965',
        );
        document.documentElement.style.setProperty(
            '--background-800',
            '#464651',
        );
        document.documentElement.style.setProperty(
            '--background-900',
            '#33333c',
        );
    }
};

export const toggleTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'light';
    if (theme === 'light') {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    setTheme();
};
