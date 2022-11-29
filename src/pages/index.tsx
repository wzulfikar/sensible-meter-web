import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Layout } from "@ui/layout";
import { H1 } from "@ui/typography/Heading";
import { trpc } from "../utils/trpc";
import { Logo } from "@components/Logo";

const Home: NextPage = () => {
  return (
    <Layout className="flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12">
        <H1>
          <Logo />
        </H1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/sensors/1"
          >
            <h3 className="text-2xl font-bold">Sensor 1 →</h3>
            <div className="text-lg">See the graph from sensor id #1.</div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/sensors/2"
          >
            <h3 className="text-2xl font-bold">Sensor 2 →</h3>
            <div className="text-lg">See the graph from sensor id #2.</div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-base text-white">
            <small>
              CS Project 2022. Presented by: Olli Bisi, Anh-Duc Vu, <br />
              Robert Pakkanen, Wildan Zulfikar
            </small>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
