// app/courses/[id]/page.js
import { getCourseById } from '@/lib/courses';
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/config";
import { CourseDetail } from '@/components/courses/CourseDetail';

export default async function Page({ params: { id } }) {
  try {
    // Obtener las cookies de la solicitud y los tokens
    const tokenData = await getTokens(cookies(), {
      apiKey: clientConfig.apiKey,
      cookieName: serverConfig.cookieName,
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      serviceAccount: serverConfig.serviceAccount,
    });

    if (!tokenData || !tokenData.token) {
      return notFound();
    }

    // Obtener los datos del curso usando el servicio compartido
    const course = await getCourseById(id, tokenData.token);

    return (
      <div>
        <CourseDetail course={course} />
      </div>
    );

  } catch (error) {
    console.error('Error al cargar el curso:', error);
    return <div className="text-red-500 p-4">Error al cargar el curso: {error.message}</div>;
  }
}
