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
  const fetchHomeData = async () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/home`, {
        headers: {
          // Include Authorization header if your API route requires authentication
          Authorization: tokens ? `Bearer ${tokens.token}` : "",
        },
        // Ensure credentials are included if needed
        // credentials: 'include',
      });

      if (!response.ok) {
        console.error("Failed to fetch home data:", response.statusText);
        return null;
      }

      const data = await response.json();
      return data.home;
    } catch (error) {
      console.error("Error fetching home data:", error);
      return null;
    }
  };

  // Fetch the 'home' data
  const homeData = await fetchHomeData();

  return (
    <main className="flex-1">
      {tokens ? <HeaderLogged tokens={tokens} /> : <Header />}
      {/* Existing Components */}
      <Hero data={homeData} />
      <WhyChooseUs />
      <Testimonials />
      <Instructors />
      <Champs />
      <Banner />
      <CallToAction />
      <Footer />
    </main>
  );
}
