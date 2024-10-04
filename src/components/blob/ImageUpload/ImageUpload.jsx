import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function ImageUpload() {
  async function uploadImage(formData) {
    'use server';
    const imageFile = formData.get('image');
    const blob = await put(`logo/${imageFile.name}`, imageFile, {
      access: 'public',
    });
    revalidatePath('/');
    return blob;
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}