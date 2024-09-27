// src/app/api/editCourse/route.js
import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { heroTitle, heroDescription, heroImage,  docId,  token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!heroTitle || !heroDescription || !heroImage || !docId) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      heroTitle,
      heroDescription,
      heroImage,
      updatedAt: new Date(Date.now()).toISOString(),
      updatedBy: uid,
    };

    // Actualizar el documento en Firestore
    await db.collection('pages').doc(docId).update(data);

    return NextResponse.json({ message: 'Page actualizado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar la page:', error);
    return NextResponse.json({ error: 'Error al actualizar la page.' }, { status: 500 });
  }
}
