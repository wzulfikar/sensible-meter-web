import { Logo } from "@components/Logo";
import { Layout } from "@ui/layout";
import { H2 } from "@ui/typography/Heading";
import { useRouter } from "next/router";
import { customToast } from "@src/components/Toast";
import dynamic from "next/dynamic";
import { Button } from "@src/ui/design/Button";
import toast from "react-hot-toast";
import { useEstimator } from "@src/hooks/useEstimator";

const SensorChart = dynamic(
  async () => (await import("@components/SensorChart")).SensorChart,
  { ssr: false }
);

const SensorPage = () => {
  const router = useRouter();
  const sensor_id = router.query.sensor_id as string;

  const session_id = (router.query.session_id || "1") as string;

  const result = useEstimator({ session_id });
  const futureCo2 = result.data?.slice(-1)[0];

  console.log("session_id:", session_id);
  console.log("futureCo2:", futureCo2);

  // useEffect(() => {
  //   // --tw-gradient-from
  //   rgb(46 2 109)
  // }, [futureCo2])

  const triggerNotification = () => {
    customToast({
      title: "CO2 Alert",
      subtitle:
        "The CO2 level in this room is raising. You may want to take a break in 10 minutes.",
    });
  };

  const handleStopSession = () => {
    console.log("stop session");
    // TODO: fetch api to termniate session

    toast("Session stopped", {
      icon: "✅",
      style: {
        borderRadius: "15px",
      },
    });
    router.push("/");
  };

  return (
    <Layout className="flex-col items-center justify-center">
      <div className="p-4">
        <H2>
          <Logo />
        </H2>
      </div>
      <h1 className="pb-2 text-white">
        <strong>Sensor {sensor_id} </strong>
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
      <div className="flex flex-col items-center justify-center gap-4">
        <Button onClick={handleStopSession}>Stop Session</Button>
      </div>
      <p className="pt-4 text-sm text-gray-300">
        {futureCo2
          ? `Estimated CO2 in next 10 minutes: ${futureCo2.toFixed(1)}`
          : ""}
      </p>
    </Layout>
  );
};

export default SensorPage;
