import { notFound } from "next/navigation";
import Logout from "../Logout";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../config";



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

  return (
    <main className="flex-1">
      <p>
        Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key to this kingdom!"
      </p>
      <Logout email={tokens?.decodedToken.email} />
    </main>
  )
}