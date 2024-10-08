import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { payment_type, reference, userId, payment_for, token } = await request.json();

    // Verificar la autenticación del usuario
    if (!token) {
      return NextResponse.json({ error: 'Token de autenticación requerido.' }, { status: 401 });
    }

    // Verificar el token usando Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Validar los datos recibidos
    if (!payment_type || !reference || !userId) {
      return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // Estructurar los datos para Firestore
    const data = {
      payment_type,
      reference,
      userId,
      payment_for, 
      createdAt: new Date(Date.now()).toLocaleString("en-US", { timeZone: "America/Caracas" }),
      createdBy: uid,
    };

    const docRef = await db.collection('payments').add(data);

    return NextResponse.json({ message: 'payment creado exitosamente.', docId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error al agregar el payment:', error);
    return NextResponse.json({ error: 'Error al agregar el payment.' }, { status: 500 });
  }
}