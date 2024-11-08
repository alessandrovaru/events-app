import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, country, city, description, image_url, token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!name || !country || !city || !description || !image_url) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      name,
      country,
      city,
      description,
      image_url,
      createdAt: new Date(Date.now()).toISOString(),
      createdBy: uid,
    };

    // Agregar el documento a la colección 'instructors' con un ID automático
    const docRef = await db.collection('events').add(data);

    return NextResponse.json({ message: 'Event created', docId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error creating the event', error);
    return NextResponse.json({ error: 'Error creating the event.' }, { status: 500 });
  }
}