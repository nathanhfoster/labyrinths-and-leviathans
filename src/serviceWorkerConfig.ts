import { ServiceWorkerConfiguration } from "./types";

const { PUBLIC_URL } = process.env;

const receivePushNotification = (event: NotificationEvent, registration: ServiceWorkerRegistration) => {
  console.log('[Service Worker] Push Received.');

  alert(JSON.stringify(event));

  // const { image, tag, url, title, text } = event.data.json()

  const image = 'https://via.placeholder.com/128/ff0000';
  const tag = 'tag';
  const url = PUBLIC_URL;
  const title = 'title';
  const text = 'text';

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag,
    image,
    badge: 'https://spyna.it/icons/favicon.ico',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000'
      }
    ]
  };
  event.waitUntil(registration.showNotification(title, options));
};

const openPushNotification = (event: NotificationEvent) => {
  console.log('[Service Worker] Notification click Received.', event.notification.data);

  event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data))
};

const config: ServiceWorkerConfiguration = () => ({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        const serviceWorker = event?.target as ServiceWorker;

        if (serviceWorker.state === 'activated') {

          const handleReloadWindow = () => {
            window.location.reload();
          };

          handleReloadWindow();
          alert('Update Available! Please refresh your browser.');
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    window.addEventListener('push', (e) => receivePushNotification(e as NotificationEvent, registration));
    window.addEventListener('notificationclick', (e) => openPushNotification(e as NotificationEvent));
  }
});

export default config;