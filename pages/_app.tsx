import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";

import { GlobalProvider } from "../context/GlobalState";
import { BitacoraProvider } from "../context/BitacoraState";
import { EventsProvider } from "../context/EventState";
import Header from "../components/Header";

interface Auth0ProviderProps {
  children: React.ReactNode;
  onRedirectCallback: (any: any) => any;
  domain: string;
  clientId: string;
  redirectUri: string;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <GlobalProvider>
        <BitacoraProvider>
          <EventsProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <title>Person Bitacora</title>
            </Head>

            <Header />

            <main className="py-1">
              <Component {...pageProps} />
            </main>
          </EventsProvider>
        </BitacoraProvider>
      </GlobalProvider>
    </Auth0Provider>
  );
}
