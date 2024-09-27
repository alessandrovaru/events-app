import { serverConfig } from '@/config';
import admin from 'firebase-admin';


// Inicializa la aplicación de Firebase Admin solo si no está ya inicializada
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serverConfig.serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();
const messaging = admin.messaging();

export { admin, db, auth, messaging };