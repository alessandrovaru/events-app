import { notFound } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import Image from "next/image";
import { EnrollButton } from "@/components/EnrollButton";


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
  const baseUrl = 
  process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_BASE_URL;

  const events = await fetch(`${baseUrl}/api/events`, {
    headers: {
      Authorization: `Bearer ${tokens.token}`,
    },
  }).then((res) => res.json())
  .catch((error) => {
    console.error("Error fetching events:", error);
    return [];
  });

  const enrollments = await fetch(`${baseUrl}/api/enrollments`, {
    headers: {
      Authorization: `Bearer ${tokens.token}`,
    },
  }).then((res) => res.json())
  .catch((error) => {
    console.error("Error fetching enrollments:", error);
    return [];
  });

  console.log(enrollments);



  return (
    <main className="flex-1 bg-gradient-to-b from-black via-gray-900 to-black p-8">
      <HeaderLogged tokens={tokens} />
      <div className="container mx-auto min-h-[80vh]">
        <h1 className="text-2xl font-bold mt-12 mb-8 ">Next seminars</h1>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.events.map((event, index) => (
            <div 
              key={index} 
              className="relative cursor-pointer group overflow-hidden bg-gradient-to-t from-gray-800 to-gray-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300  h-[300px] "
            >
              <div className="absolute inset-0 w-full h-full z-0">
                <Image 
                  src={event.image_url} 
                  alt={`Event ${index + 1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 transform group-hover:scale-110 opacity-50"
                  fill
                />
              </div>
              <div className="z-20 w-full text-left bg-opacity-70 bg-black p-4 rounded-lg h-full flex flex-col justify-end">
                <h2 className="relative text-xl font-semibold text-white mb-2">
                  {event.name}
                </h2>
                <p className="relative text-sm text-gray-300">
                  {event.country}
                </p>
                <p className="relative text-sm text-gray-300">
                  {event.city}
                </p>
                <p className="relative text-sm text-gray-300 mb-2">
                  {event.description}
                </p>
                <EnrollButton user={tokens?.decodedToken} eventId={event.id} enrollments={enrollments} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}