import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { GraphqlProvider } from "@src/lib/graphql/Provider";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GraphqlProvider>
        <Component {...pageProps} />
      </GraphqlProvider>
      <Toaster />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
