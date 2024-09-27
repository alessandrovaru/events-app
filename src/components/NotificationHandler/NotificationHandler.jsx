// src/components/NotificationHandler.js

'use client'; // Indica que este componente se ejecuta solo en el cliente

import { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/lib/firebaseClient"; // Asegúrate de que la ruta sea correcta

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY; // Define tu VAPID Key en .env.local

export const NotificationHandler = () => {
  useEffect(() => {
    if (typeof window === "undefined") return; // Asegura que estamos en el cliente

    const messaging = getMessaging(app);

    // Solicitar permisos de notificación y obtener el token
    const requestPermissionAndGetToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, { vapidKey });
          if (currentToken) {
            console.log("Token de acceso:", currentToken);
            // Envía este token a tu servidor para gestionar notificaciones
          } else {
            console.log("No se encontró ningún token. Solicita permisos para obtener uno.");
          }
        } else {
          console.log("Permiso para notificaciones no concedido.");
        }
      } catch (error) {
        console.error("Error al obtener el token de acceso:", error);
      }
    };

    requestPermissionAndGetToken();

    // Escuchar mensajes en primer plano
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Mensaje recibido:", payload);
      // Maneja el mensaje según tus necesidades
      // Por ejemplo, muestra una notificación personalizada
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // Este componente no necesita renderizar nada
}
