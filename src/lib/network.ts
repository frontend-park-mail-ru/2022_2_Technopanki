class Network {
    async GET(url: string, headers: HeadersInit, credentials: boolean = true) {
        console.info(`GET request. URL: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
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
        headers: HeadersInit,
        payload: string,
        credentials: boolean = true,
    ) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload,
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
    async PUT(
        url: string,
        headers: HeadersInit,
        payload: string,
        credentials: boolean = true,
    ) {
        console.info(`GET request. URL: ${url}; Payload: ${payload}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload,
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
        headers: HeadersInit,
        credentials: boolean = true,
    ) {
        console.info(`GET request. URL: ${url}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
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
