import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CourseList } from "@/components/dashboard/courses/CourseList";
import { NextClass } from "@/components/dashboard/courses/NextClass";
import { AdminInstructors } from "@/components/admin/instructors/AdminInstructors";
import { AdminChamps, ChampsList } from "@/components/admin/champs";
import { AdminUsers } from "@/components/admin/users";
import { AdminHome  } from "@/components/admin/home";
import Link from "next/link";
import { ImageUpload } from "@/components/blob/ImageUpload";


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

  
  if(role !== 'admin') {
    return notFound();
  }

  return (
    <main className="flex-1">
      <HeaderLogged tokens={tokens} />
        <div className="container mx-auto ">
          <h1 className="text-2xl font-bold text-white mb-6 ps-6 pt-6">Panel de administración</h1>
          <p className="text-white ps-6 mb-6">Bienvenido al panel de administración. Aquí podrás gestionar los cursos, instructores, campeonatos y usuarios de la plataforma.</p>
          <Link href="/admin/analytics" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6 ms-6">Ir a panel de analíticas</Link>
          
        </div>
        <CourseList tokens={tokens}/>
        <AdminInstructors tokens={tokens}/>
        <AdminChamps tokens={tokens}/>
        <AdminUsers/>
        <AdminHome />
      <Footer />
    </main>
  )
}