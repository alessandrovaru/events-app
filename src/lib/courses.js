// lib/courses.js
import { db, auth } from '@/lib/firebaseAdmin';
import { doc, getDoc } from "firebase/firestore";


/**
 * Obtiene los datos de un curso por su ID.
 * @param {string} id - ID del curso.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Datos del curso.
 * @throws {Error} - Si el token es inválido o el curso no se encuentra.
 */
export async function getCourseById(id, token) {
  if (!token) {
    throw new Error('Token de autenticación requerido.');
  }

  // Verificar el token
  const decodedToken = await auth.verifyIdToken(token);

  console.log(`ID del curso solicitado: ${id}`);

  try {
    // Obtener la referencia del documento usando Admin SDK
    const docRef = db.collection('courses').doc(id);
    const docSnap = await docRef.get();

    // Verificar si el documento existe
    if (!docSnap.exists) {
      throw new Error('Curso no encontrado.');
    }

    // Devolver los datos del curso
    return docSnap.data();
  } catch (error) {
    console.error('Error al acceder a Firestore:', error);
    throw new Error('Error al acceder a la base de datos.');
  }
}