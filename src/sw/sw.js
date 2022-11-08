const files = ['index.html'];
const cacheName = 'jobflowPWA-v1';

self.addEventListener('install', event => {
    console.log('Установлен');
    event.waitUntil(async () => {
        const cache = await caches.open(cacheName);
    });
});

self.addEventListener('activate', event => {
    console.log('Активирован');
});

// More about cache: https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
// More about PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
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
