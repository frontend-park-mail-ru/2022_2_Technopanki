import { requestHeaders } from '../services/headers';

class Network {
    async GET(
        url: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            credentials: credentials ? 'include' : 'omit',
        });

        return {
            status: response.status,
            body: await response.json().catch(err => {
                console.error(err, response);
                return {};
            }),
        };
    }
    async PUT(
        url: string,
        payload: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: payload,
            mode: 'cors',
            credentials: credentials ? 'include' : 'omit',
        });

        return {
            status: response.status,
            body: await response.json().catch(err => {
                console.error(err);
                return {};
            }),
        };
    }
    async POST(
        url: string,
        payload: string | File,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload,
            mode: 'cors',
            credentials: credentials ? 'include' : 'omit',
        });

        return {
            status: response.status,
            body: await response.json().catch(err => {
                console.error(err);
                return {};
            }),
        };
    }
    async DELETE(
        url: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            credentials: credentials ? 'include' : 'omit',
        });

        return {
            status: response.status,
            body: await response.json().catch(err => {
                console.error(err);
                return {};
            }),
        };
    }
}

export default new Network();
