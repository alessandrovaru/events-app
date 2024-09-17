// src/app/api/deleteCourse/route.js

import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    // Parsear el cuerpo de la solicitud
    const { docId, token } = await request.json();

    // Verificar si se proporciona un token
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar y decodificar el token
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar que se proporcione el docId
    if (!docId) {
      return NextResponse.json({ error: 'ID del documento requerido.' }, { status: 400 });
    }

    // Obtener la referencia del documento
    const docRef = db.collection('champs').doc(docId);
    const docSnap = await docRef.get();

    // Verificar si el documento existe
    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Documento no encontrado.' }, { status: 404 });
    }

    const champsData = docSnap.data();

    // Verificar si el usuario que intenta eliminar es el creador del campeón
    if (champsData.createdBy !== uid) {
      return NextResponse.json({ error: 'No tienes permiso para eliminar este campeón.' }, { status: 403 });
    }

    // Eliminar el documento
    await docRef.delete();

    return NextResponse.json({ message: 'Campeón eliminado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el campeón:', error);
    return NextResponse.json({ error: 'Error al eliminar el campeón.' }, { status: 500 });
  }
}