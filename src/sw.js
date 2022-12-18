import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { clientsClaim } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

registerRoute(
  'http://localhost:4000/some-data',
  new StaleWhileRevalidate({ plugins: [new BroadcastUpdatePlugin()] }),
);
