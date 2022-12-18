import React, { useState, useEffect } from 'react';

export default () => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/some-data')
      .then((x) => x.json())
      .then((x) => {
        setData(x.name);
      });

    const handleMessage = async (e) => {
      if (e.data.meta === 'workbox-broadcast-update') {
        const { cacheName, updatedURL } = e.data.payload;
        const cache = await caches.open(cacheName);
        const resp = await cache.match(updatedURL);
        const data = await resp.json();

        setData(data.name);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>Workbox Webpack Experiment</h1>
      <h2>{data}</h2>
    </div>
  );
};
