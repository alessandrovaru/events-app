import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../config";

import { Hero } from "@/components/home/Hero"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { Testimonials } from "@/components/home/Testimonials"
import { CallToAction } from "@/components/home/CallToAction/CallToAction"

import Logout from "./Logout";

export default async function Component() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    return (
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
    )
  }

  return (
    <main className="flex-1">
      <p>
        Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key to this kingdom!"
      </p>
      <Logout email={tokens?.decodedToken.email} />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  )
}