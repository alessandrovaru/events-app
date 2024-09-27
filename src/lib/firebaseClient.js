import { clientConfig } from '@/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from "firebase/messaging";



// Inicializar Firebase solo si no está ya inicializado
const app = !getApps().length ? initializeApp(clientConfig) : getApp();

// Instancias de Auth y Firestore para el cliente
const auth = getAuth(app);
const db = getFirestore(app);
let messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);  // Solo en el cliente
}


export { app, auth, db, messaging };