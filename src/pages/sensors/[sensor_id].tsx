import { Logo } from "@components/Logo";
import { Layout } from "@ui/layout";
import { H2 } from "@ui/typography/Heading";
import { useRouter } from "next/router";
import { SensorChart } from "@components/SensorChart";

const SensorPage = () => {
  const sensor_id = useRouter().query.sensor_id as string;

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
          <SensorChart />
        </div>
      </div>
    </Layout>
  );
};

export default SensorPage;
