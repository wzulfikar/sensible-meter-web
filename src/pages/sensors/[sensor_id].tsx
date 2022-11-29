import { Logo } from "@components/Logo";
import { Layout } from "@ui/layout";
import { H2 } from "@ui/typography/Heading";
import { useRouter } from "next/router";
import { customToast } from "@src/components/Toast";
import dynamic from "next/dynamic";

const SensorChart = dynamic(
  async () => (await import("@components/SensorChart")).SensorChart,
  { ssr: false }
);

const SensorPage = () => {
  const sensor_id = useRouter().query.sensor_id as string;

  const triggerNotification = () => {
    customToast({
      title: "CO2 Alert",
      subtitle:
        "The CO2 level in this room is raising. You may want to take a break in 10 minutes.",
    });
  };

  return (
    <Layout className="flex-col items-center justify-center">
      <div className="p-4">
        <H2>
          <Logo />
        </H2>
      </div>
      <h1 className="pb-2 text-white">Sensor {sensor_id}</h1>
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
    </Layout>
  );
};

export default SensorPage;
