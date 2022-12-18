const files = ['index.html'];
const CACHE_NAME = 'jobflowPWA-v1';

const CACHE = {
    STATIC: 'jobflow_static-v1',
    HTML: 'jobflow_html-v1',
    JS: 'jobflow_js-v1',
};

// const CACHE = 'cache';

self.addEventListener('install', event => {
    console.log('Установлен');
    event.waitUntil(async () => {
        const cache = await caches.open(CACHE_NAME);
    });
    event.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll([]);
        }),
    );
});

self.addEventListener('activate', event => {
    console.log('Активирован');
});

const fetchFromCache = event => {
    return caches.open(CACHE_NAME).then(cache => {
        cache.match(event).then(matched => {
            if (!matched) {
                throw new Error(`${event} not found in cache`);
            }

            return matched;
        });
    });
};

self.addEventListener('fetch', event => {
    console.log('Происходит запрос на сервер');
    event.respondWith((async () => {
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
        const cache = await caches.open(CACHE_NAME);

        console.log(
            `[Service Worker] Caching new resource: ${event.request.url}`,
        );

        // save response to cache
        await cache.put(event.request, response.clone());
        return response;
    })());
});

// matched || Promise.reject('no-matched')