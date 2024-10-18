import { db, auth } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Obtener solo las páginas que tengan de id 'home'
    const snapshot = await db.collection('metadata').get();
    const homeMetadata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).find(metadata => metadata.id === 'home');

    return NextResponse.json({ homeMetadata }, { status: 200 });

  }
  catch (error) {
    console.error('Error al obtener el homeMetadata:', error);
    return NextResponse.json({ error: 'Error al obtener el homeMetadata.' }, { status: 500 });
  }
}