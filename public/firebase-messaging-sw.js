// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries


// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCMQ3f3baXs0ZV0p_p95V4m6xQUpASk9aA",
  authDomain: "total-elite-training.firebaseapp.com",
  projectId: "total-elite-training",
  storageBucket: "total-elite-training.appspot.com",
  messagingSenderId: "355745487804",
  appId: "1:355745487804:web:9ab80e039ee3fd9e4ba9b9",
  measurementId: "G-PP4SYLBVBG"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});