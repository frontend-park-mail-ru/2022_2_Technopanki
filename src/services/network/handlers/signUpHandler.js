export const sendSignUpData = async formData => {
    return await fetch('http://localhost:8080/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.get('email'),
            name: formData.get('name'),
            surname: formData.get('surname'),
            password: formData.get('password'),
            role: formData.get('toggle'),
        }),
        credentials: 'include',
    });
};
