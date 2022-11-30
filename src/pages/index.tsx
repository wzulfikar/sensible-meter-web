import { type NextPage } from "next";
import Link from "next/link";
import { Layout } from "@ui/layout";
import { H1 } from "@ui/typography/Heading";
import { Logo } from "@components/Logo";
import { Button } from "@src/ui/design/Button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const router = useRouter();

  const handleNewSession = () => {
    // TODO: send api to create new session
    console.log("new");

    // toast.promise(
    //   saveSettings(settings),
    //    {
    //      loading: 'Creating session...',
    //      success: <b>Redirecting..</b>,
    //      error: <b>Could not create session</b>,
    //    }
    //  );

    // timeout to simulate fetch
    setTimeout(() => {
      // We'll use sensor 1 for demo so we'll hardcode it here
      router.push("/sensors/1");
    }, 1000);
  };

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
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={handleNewSession}>New Session →</Button>
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
