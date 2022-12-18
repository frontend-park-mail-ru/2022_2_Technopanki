import { requestHeaders } from '../services/headers';

const sendRequest = async (
    method: string,
    url: string,
    payload: string | File | FormData | undefined,
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
            headers['Content-Type'] === 'application/json'
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
        return await sendRequest('GET', url, '', headers, credentials);
    }
    async PUT(
        url: string,
        payload?: string | File | FormData,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return await sendRequest('PUT', url, payload, headers, credentials);
    }
    async POST(
        url: string,
        payload: string | File | FormData,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return await sendRequest('POST', url, payload, headers, credentials);
    }
    async DELETE(
        url: string,
        headers: HeadersInit = requestHeaders.jsonHeader,
        credentials: boolean = true,
    ) {
        return await sendRequest('DELETE', url, '', headers, credentials);
    }
    WEBSOCKET(
        url: string,
        onMessage: (message: string) => void,
        // protocols?: string[]
    ) {
        const socket = new WebSocket(url)
        socket.onmessage = (event: MessageEvent<string>) => {
            console.log(event)
            onMessage(event.data)
        }
    }
}

export default new Network();
