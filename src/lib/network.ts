import { requestHeaders } from '../services/headers';

const sendRequest = async (
    method: string,
    url: string,
    payload: string | File | FormData,
    headers: HeadersInit,
    credentials: boolean,
) => {
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: method === 'GET' ? undefined : payload,
        mode: 'cors',
        credentials: credentials ? 'include' : 'omit',
    });

    return {
        status: response.status,
        body:
            headers === requestHeaders.jsonHeader
                ? await response.json().catch(err => {
                      console.error(err, response);
                      return {};
                  })
                : await response,
    };
};

class Network {
    async GET(
        url: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return sendRequest('GET', url, '', headers, credentials);
    }
    async PUT(
        url: string,
        payload: string | File | FormData,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return sendRequest('PUT', url, payload, headers, credentials);
    }
    async POST(
        url: string,
        payload: string | File | FormData,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return sendRequest(
            'POST',
            url,
            payload,
            {
                ...headers,
                'X-CSRF-Token': localStorage.getItem('CSRF') as string,
            },
            credentials,
        );
    }
    async DELETE(
        url: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return sendRequest('DELETE', url, '', headers, credentials);
    }
}

export default new Network();
