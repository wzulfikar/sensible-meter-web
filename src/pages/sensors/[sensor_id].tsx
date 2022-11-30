import { Logo } from "@components/Logo";
import { Layout } from "@ui/layout";
import { H2 } from "@ui/typography/Heading";
import { useRouter } from "next/router";
import { customToast } from "@src/components/Toast";
import dynamic from "next/dynamic";
import { Button } from "@src/ui/design/Button";
import toast from "react-hot-toast";
import { useSessionData } from "@src/hooks/useSessionData";
import { useEffect } from "react";
import { API_ENDPOINT } from "@src/config";

const SensorChart = dynamic(
  async () => (await import("@components/SensorChart")).SensorChart,
  { ssr: false }
);

const SessionPage = () => {
  const router = useRouter();
  const sensor_id = router.query.sensor_id as string;
  const num_people = router.query.num_people as string;

  const session_id = router.query.session_id as string;

  const result = useSessionData({ session_id });
  const futureCo2 = 0; // result.data?.estimation.slice(-1)[0];

  console.log("result:", result);

  console.log("session_id:", session_id);
  console.log("futureCo2:", futureCo2);

  useEffect(() => {
    if (!futureCo2) return;

    const initialColor = 46; // From rgb value
    let newColor = futureCo2 / 2 + initialColor;
    if (newColor > 255) {
      newColor = 255;
    }
    console.log("newColor:", newColor);
    const mainEl = document.querySelector("main") as HTMLDivElement;
    mainEl.style.setProperty("--tw-gradient-from", `rgb(${newColor}, 2,109)`);
  }, [futureCo2]);

  const triggerNotification = () => {
    customToast({
      title: "CO2 Alert",
      subtitle:
        "The CO2 level in this room is raising. You may want to take a break in 10 minutes.",
    });
  };

  const handleStopSession = () => {
    if (!session_id) {
      router.push("/");
      return;
    }

    console.log("stopping session..");

    toast.promise(
      fetch(API_ENDPOINT + "/api/v1/session/terminate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session: session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("session stopped:", data);
          router.push("/");
        }),
      {
        loading: "Stopping session...",
        success: <b>Redirecting..</b>,
        error: <b>Could not stop session</b>,
      }
    );
  };

  return (
    <Layout className="flex-col items-center justify-center">
      <div className="p-4">
        <H2>
          <Logo />
        </H2>
      </div>
      <h1 className="pb-2 text-white">
        <strong>
          Sensor #{sensor_id}. {num_people ? `Count people: ${num_people}` : ""}
        </strong>
      </h1>
      <div className="container flex flex-col items-center justify-center gap-12 bg-gray-200 px-4 py-16">
        <div>
          <SensorChart sensor_id={sensor_id} />
        </div>
      </div>
      <button
        className="w-full cursor-default text-center"
        onClick={triggerNotification}
      >
        –––
      </button>
      {session_id ? (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button onClick={handleStopSession}>Stop Session</Button>
          </div>
          <p className="pt-4 text-sm text-gray-300">
            Estimated CO2 in next 10 minutes:
            {futureCo2 ? futureCo2.toFixed(1) : " ..."}
          </p>
        </>
      ) : null}
    </Layout>
  );
};

export default SessionPage;
