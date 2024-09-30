import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/config";
import { HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CourseList } from "@/components/dashboard/courses/CourseList";
import { NextClass } from "@/components/dashboard/courses/NextClass";
import { AdminInstructors } from "@/components/admin/instructors/AdminInstructors";
import { AdminChamps, ChampsList } from "@/components/admin/champs";
import { AdminUsers } from "@/components/admin/users";
import { AdminLanding } from "@/components/admin/landing";


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
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 ps-6 pt-6">Panel de Analíticas</h1>
          <p className="text-white ps-6 w-[30%]">Bienvenido al panel de analíticas. Aquí podrás ver información relevante sobre los cursos y usuarios de la plataforma.</p>
          <hr className="border-white border-1 mt-6 " />
        </div>
        
        <CourseList tokens={tokens} analytics={true} />
        <hr className="border-white border-1 " />
        <AdminUsers tokens={tokens} analytics={true} />
      <Footer />
    </main>
  )
}