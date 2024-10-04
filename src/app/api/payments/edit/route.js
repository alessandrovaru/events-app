// src/app/api/editCourse/route.js
import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { docId, verified,  token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!docId ) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      verified,
      updatedAt: new Date(Date.now()).toISOString(),
      updatedBy: uid,
    };

    // Actualizar el documento en Firestore
    await db.collection('payments').doc(docId).update(data);

    return NextResponse.json({ message: 'payment actualizado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el payment:', error);
    return NextResponse.json({ error: 'Error al actualizar el payment.' }, { status: 500 });
  }
}
