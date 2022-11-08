const CACHE = 'cache'

self.addEventListener('install', event => {
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
    event.respondWith(fromCachce(event.request))
});

const fromCachce = (request) => {
    return caches.open(CACHE)
        .then(cache => {
            cache.match(request)
                .then(matched => matched || Promise.reject('no-matched'));
        })
}
