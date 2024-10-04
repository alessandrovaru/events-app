import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {

    // Obtener solo las páginas que tengan de id 'home'
    const snapshot = await db.collection('pages').get();
    const home = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(page => page.id === 'home');

    return NextResponse.json({ home }, { status: 200 });

  }
  catch (error) {
    console.error('Error al obtener el home:', error);
    return NextResponse.json({ error: 'Error al obtener el home.' }, { status: 500 });
  }
}