import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { first_name, last_name, description, token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!first_name || !last_name || !description) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      first_name,
      last_name,
      description,
      createdAt: new Date(Date.now()).toISOString(),
      createdBy: uid,
    };

    // Agregar el documento a la colección 'instructors' con un ID automático
    const docRef = await db.collection('instructors').add(data);

    return NextResponse.json({ message: 'Instructor creado exitosamente.', docId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error al agregar el instructor:', error);
    return NextResponse.json({ error: 'Error al agregar el instructor.' }, { status: 500 });
  }
}