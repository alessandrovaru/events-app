// src/app/api/user/route.js

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
    const uid = decodedToken.uid;

    // Obtener datos del usuario
    const snapshotUser = await db.collection('users').doc(uid).get();

    if (!snapshotUser.exists) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    const user = snapshotUser.data();

    // Crear un objeto plano del usuario
    const plainUser = {
      uid: uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
      enrolledCourses: user.enrolledCourses?.map(course => course.docId) || [],
    };

    return NextResponse.json({ user: plainUser }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return NextResponse.json({ error: 'Error al obtener datos del usuario.' }, { status: 500 });
  }
}
