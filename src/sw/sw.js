const files = ['index.html'];
const cacheName = 'jobflowPWA-v1';

const CACHE = 'cache'

self.addEventListener('install', event => {
    console.log('Установлен');
    event.waitUntil(async () => {
        const cache = await caches.open(cacheName);
    });
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => {
                return cache.addAll([

                ])
            })
    )
});

self.addEventListener('activate', event => {
    console.log('Активирован');
});

self.addEventListener('fetch', event => {
    console.log('Происходит запрос на сервер');
    event.respondWith(async () => {
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
    });
});

const fromCachce = (request) => {
    return caches.open(CACHE)
        .then(cache => {
            cache.match(request)
                .then(matched => matched || Promise.reject('no-matched'));
        })
}
