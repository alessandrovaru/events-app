// src/components/GenerateTokenButton.js

'use client'; // Indica que este componente se ejecuta solo en el cliente

import { useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/lib/firebaseClient"; // Asegúrate de que la ruta sea correcta

const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY; // Define tu VAPID Key en .env.local

export const GenerateTokenButton = () => {
  const [token, setToken] = useState("");

  const handleGenerateToken = async () => {
    try {
      const messaging = getMessaging(app);
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        setToken(currentToken);
        console.log("Token de acceso:", currentToken);
        // Envía este token a tu servidor para gestionar notificaciones
      } else {
        console.log("No se encontró ningún token. Solicita permisos para obtener uno.");
      }
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerateToken}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Obtener Token de Notificación
      </button>
      {token && (
        <div className="mt-4">
          <p>Token de Notificación:</p>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            readOnly
            value={token}
          ></textarea>
        </div>
      )}
    </div>
  );
}
