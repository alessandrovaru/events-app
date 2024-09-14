import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Obtener el token de los headers de la solicitud
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token
    const decodedToken = await auth.verifyIdToken(token);

    // Obtener todos los instructores
    const snapshot = await db.collection('champs').get();
    const champs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ champs }, { status: 200 });

  }
  catch (error) {
    console.error('Error al obtener los campeones:', error);
    return NextResponse.json({ error: 'Error al obtener los campeones' }, { status: 500 });
  }
}