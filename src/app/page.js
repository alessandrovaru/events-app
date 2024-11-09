import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../config";

import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction/CallToAction";
import { Header, HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Instructors } from "@/components/home/Instructors";
import { Champs } from "@/components/home/Champs";
import { Banner } from "@/components/home/Banner";
import Image from "next/image";
import Link from "next/link";

export default async function Component() {
  // const tokens = await getTokens(cookies(), {
  //   apiKey: clientConfig.apiKey,
  //   cookieName: serverConfig.cookieName,
  //   cookieSignatureKeys: serverConfig.cookieSignatureKeys,
  //   serviceAccount: serverConfig.serviceAccount,
  // });

  const baseUrl = 
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL;

  const events = await fetch(`${baseUrl}/api/events`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching events:", error);
      return [];
    });

  return (
    <main className="flex-1">
      { /* {tokens ? <HeaderLogged tokens={tokens} /> : <Header />} */ }
      <Header />
      <section className="relative w-full h-[80dvh] overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover opacity-50" autoPlay muted loop playsInline>
          <source 
            src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2FUntitled%20(1)%20(2).mp4?alt=media&token=35e7eaf3-1f3c-4286-8a3b-ef4ecde8b9ad" 
            type="video/mp4" />
          <track
              src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2FUntitled%20(1)%20(2).mp4?alt=media&token=35e7eaf3-1f3c-4286-8a3b-ef4ecde8b9ad"
              kind="subtitles"
              srcLang="es"
              label="Español"
            />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Craig Jones Seminars</h1>
          <p className="mt-4 text-lg md:text-2xl">Seminars about Brazilian Jiu-Jitsu</p>
        </div>
      </section>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8">
          {events.events.map((event, index) => (
            <Link key={index} href={`/login`}>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      {/* Existing Components */}
      {/* <Hero data={homeData} />
      <WhyChooseUs />
      <Testimonials />
      <Instructors />
      <Champs />
      <Banner />
      <CallToAction /> */}
      <Footer />
    </main>
  );
}
