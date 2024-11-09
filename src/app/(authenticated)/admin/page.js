import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CourseList } from "@/components/dashboard/courses/CourseList";
import { NextClass } from "@/components/dashboard/courses/NextClass";
import { AdminChamps, ChampsList } from "@/components/admin/champs";
import { AdminUsers } from "@/components/admin/users";
import { AdminHome  } from "@/components/admin/home";
import Link from "next/link";
import { ImageUpload } from "@/components/blob/ImageUpload";
import { AdminMetadata } from "@/components/admin/metadata";
import { AdminEvents } from "@/components/admin/events";


export default async function Page() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    return notFound();
  }

  const checkAdmin = async () => {
    const baseUrl = 
    process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/api/user`, {
      headers: {
        'Authorization': `Bearer ${tokens.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.user.role;
    } else {
      console.error('Error al obtener los datos del usuario:', response.statusText);
    }
  }

  const role = await checkAdmin();

  const getEnrollments =  async () => {
    const baseUrl = 
    process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/api/enrollments`, {
      headers: {
        'Authorization': `Bearer ${tokens.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.enrollments;
    } else {
      console.error('Error al obtener los datos del usuario:', response.statusText);
    }
  }

  const enrollments = await getEnrollments();

  
  if(role !== 'admin') {
    return notFound();
  }

  return (
    <main className="flex-1">
      <HeaderLogged tokens={tokens} />
        {/* <div className="container mx-auto ">
          <h1 className="text-2xl font-bold text-white mb-6 ps-6 pt-6">Panel de administración</h1>
          <p className="text-white ps-6 mb-6">Bienvenido al panel de administración. Aquí podrás gestionar los cursos, instructores, campeonatos y usuarios de la plataforma.</p>
          <Link href="/admin/analytics" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6 ms-6">Ir a panel de analíticas</Link>
        </div> */}
        <AdminEvents />
        <div className="container mx-auto text-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-white">Enrollments</h2>
          <table className="min-w-full bg-white text-black rounded-lg shadow-lg mb-8">
            <thead className="text-black">
              <tr>
                <th className="py-2 px-4 border text-left">Seminar</th>
                <th className="py-2 px-4 border text-left">User</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr key={enrollment.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{enrollment.eventId}</td>
                  <td className="py-2 px-4 border">{enrollment.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AdminUsers/>
        <AdminHome />
        <AdminMetadata />
      <Footer />
    </main>
  )
}