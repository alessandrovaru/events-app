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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/user`, {
      headers: {
        'Authorization': `Bearer ${tokens.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.user.role === 'admin');
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
        <CourseList tokens={tokens}/>
        <AdminInstructors tokens={tokens}/>
        <AdminChamps tokens={tokens}/>
        <AdminUsers/>
      <Footer />
    </main>
  )
}