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

export default async function Component() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  // Function to fetch 'home' data from the API route
  // const fetchHomeData = async () => {
  //   const baseUrl =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000"
  //       : process.env.NEXT_PUBLIC_BASE_URL;

  //   try {
  //     const response = await fetch(`${baseUrl}/api/home`, {
  //       headers: {
  //         // Include Authorization header if your API route requires authentication
  //       },
  //       // Ensure credentials are included if needed
  //       // credentials: 'include',
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to fetch home data:", response.statusText);
  //       return null;
  //     }

  //     const data = await response.json();
  //     return data.home;
  //   } catch (error) {
  //     console.error("Error fetching home data:", error);
  //     return null;
  //   }
  // };

  // Fetch the 'home' data
  // const homeData = await fetchHomeData();

  return (
    <main className="flex-1">
      {tokens ? <HeaderLogged tokens={tokens} /> : <Header />}
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
