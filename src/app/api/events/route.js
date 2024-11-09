import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Obtener todos los events
    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ events }, { status: 200 });

  }
  catch (error) {
    console.error('Error al obtener los events:', error);
    return NextResponse.json({ error: 'Error al obtener los events.' }, { status: 500 });
  }
}