// src/app/api/addCourse/route.js
import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, description, discipline, location, days, time, color, image_url, isReservable, token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!name || !description || !discipline || !location || !days || !time || !color || !image_url  ) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      name,
      description,
      discipline,
      location,
      days: Array.isArray(days) ? days.map(Number) : [Number(days)], // Asegurar que 'days' es un array de números
      time,
      color,
      image_url, 
      isReservable,
      createdAt: new Date(Date.now()).toISOString(),
      createdBy: uid,
    };

    // Agregar el documento a la colección 'courses' con un ID automático
    const docRef = await db.collection('courses').add(data);

    return NextResponse.json({ message: 'Curso creado exitosamente.', docId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error al agregar el curso:', error);
    return NextResponse.json({ error: 'Error al agregar el curso.' }, { status: 500 });
  }
}
