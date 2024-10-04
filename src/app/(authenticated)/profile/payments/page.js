import { UserPayments } from "@/components/profile/payments/UserPayments";
import { HeaderLogged } from "@/components/shared/Header";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/config";

export default async function Page() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  return (
    <>
      <HeaderLogged tokens={tokens} />
      <section className="text-white ">
        <div className="container px-5 pt-24 pb-10 mx-auto">
          <h1 className="text-3xl font-medium title-font text-white mb-12 ">Payments</h1>
          <p className="text-white">Esta es la sección de pagos. Puedes dejar tu comprobante de pago o revisar tus pagos antiguos</p>
        </div>
        <UserPayments />
        
      </section>
    </>
  );
}