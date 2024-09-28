// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Realiza una solicitud a tu API Route para obtener la configuración de Firebase
self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch('/api/firebaseConfig')
      .then((response) => response.json())
      .then((config) => {
        firebase.initializeApp(config);

        const messaging = firebase.messaging();

        messaging.onBackgroundMessage((payload) => {
          console.log('[firebase-messaging-sw.js] Received background message ', payload);

          // Personaliza la notificación aquí
          const notificationTitle = payload.notification?.title || 'Sin título';
          const notificationOptions = {
            body: payload.notification?.body || 'Sin contenido',
            icon: payload.notification?.image || '/next.svg',  // Ruta a tu icono por defecto si no está definido
          };

          self.registration.showNotification(notificationTitle, notificationOptions);
        });
      })
      .catch((error) => {
        console.error('Error al obtener la configuración de Firebase:', error);
      })
  );
});
