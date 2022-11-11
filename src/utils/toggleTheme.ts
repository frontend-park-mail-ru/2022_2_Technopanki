export const setTheme = () => {
    const theme = localStorage.getItem('theme') ?? 'light';
    if (theme === 'light') {
        // @ts-ignore
        document.querySelector(':root').removeAttribute('theme');
        // @ts-ignore
        document.querySelector(':root').setAttribute('theme', 'light');
    } else {
        // @ts-ignore
        document.querySelector(':root').removeAttribute('theme');
        // @ts-ignore
        document.querySelector(':root').setAttribute('theme', 'dark');
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
