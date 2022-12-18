const files = ['index.html'];

const CACHE = {
    STATIC: 'jobflow_static-v1',
    HTML: 'jobflow_html-v1',
    JS: 'jobflow_js-v1',
    IMAGES: 'jobflow_image-v1',
    SERVER_RESPONSES: 'jobflow_resp-v1',
};

// const CACHE = 'cache';

self.addEventListener('install', event => {
    console.log('Установлен');
    event.waitUntil(async () => {
        caches.open(CACHE.HTML).then(cache => cache.addAll([]));
        caches.open(CACHE.JS).then(cache => cache.addAll([]));
        caches.open(CACHE.STATIC).then(cache => cache.addAll([]));
        caches.open(CACHE.IMAGES).then(cache => cache.addAll([]));
        caches.open(CACHE.SERVER_RESPONSES).then(cache => cache.addAll([]));
    });
});

self.addEventListener('activate', event => {
    console.log('Активирован');
});

// const fetchFromCache = event => {
//     return caches.open(CACHE_NAME).then(cache => {
//         cache.match(event).then(matched => {
//             if (!matched) {
//                 throw new Error(`${event} not found in cache`);
//             }

//             return matched;
//         });
//     });
// };

const serveCache = (event, cacheName) => {
    event.respondWith(
        (async () => {
            const request = await caches.match(event.request);
            console.log(
                `[Service Worker] Fetching resourse from: ${event.request.url}`,
            );

            // return cached response
            if (request) {
                return request;
            }

            // get response from server
            const response = await fetch(event.request);
            const cache = await caches.open(cacheName);

            console.log(
                `[Service Worker] Caching new resource: ${event.request.url}`,
            );

            // save response to cache
            await cache.put(event.request, response.clone());
            return response;
        })(),
    );
};

const getCacheName = url => {
    if (/\.html$/.test(url)) {
        return CACHE.HTML;
    } else if (/.js$/.test(url)) {
        return CACHE.JS;
    } else if (/\^api\/user/.test(url)) {
        return CACHE.SERVER_RESPONSES;
    } else if (/.webp\??.*?$/.test(url)) {
        return CACHE.IMAGES;
    } else {
        return CACHE.STATIC;
    }
};

self.addEventListener('fetch', event => {
    console.log('Происходит запрос на сервер');
    event.respondWith(
        (async () => {
            try {
                // get response from server
                const response = await fetch(event.request);
                const cache = await caches.open(
                    getCacheName(event.request.url),
                );

                console.log(
                    `[Service Worker] Caching new resource: ${event.request.url}`,
                );

                // save response to cache
                await cache.put(event.request, response.clone());
                return response;
            } catch (e) {
                const request = await caches.match(event.request);
                
                // return cached response
                if (request) {
                    return request;
                }
            }
        })(),
    );
});

// matched || Promise.reject('no-matched')
