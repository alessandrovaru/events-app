import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../config";

import { Hero } from "@/components/home/Hero"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Testimonials } from "@/components/home/Testimonials"
import { CallToAction } from "@/components/home/CallToAction/CallToAction"

import Logout from "./Logout";
import { Header, HeaderLogged } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Instructors } from "@/components/home/Instructors";
import { Champs } from "@/components/home/Champs";
import { Banner } from "@/components/home/Banner";
import listData from "@/firebase/firestore/listData";
import listStorageData from "@/firebase/storage/listStorageData";

export default async function Component() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  // const images = await listStorageData("images");

  // console.log(images);

  

  if (!tokens) {
    return (
      <main className="flex-1">
        <Header />
        <Hero />
        <WhyChooseUs />
        <Testimonials />
        <Instructors />
        <Champs />
        <Banner />
        <CallToAction />
        <Footer />
      </main>
    )
  }

  return (
    <main className="flex-1">
      <HeaderLogged tokens={tokens} />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <Champs />
      <Banner />
      <CallToAction />
      <Footer />
    </main>
  )
}