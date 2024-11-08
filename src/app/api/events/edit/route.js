// src/app/api/editCourse/route.js
import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { docId, name, country, city, description, image_url, token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!docId || !name || !country || !city || !description || !image_url) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      name,
      country,
      city,
      description,
      image_url,
      updatedAt: new Date(Date.now()).toISOString(),
      updatedBy: uid,
    };

    // Actualizar el documento en Firestore
    await db.collection('events').doc(docId).update(data);

    return NextResponse.json({ message: 'Curso actualizado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    return NextResponse.json({ error: 'Error al actualizar el curso.' }, { status: 500 });
  }
}
