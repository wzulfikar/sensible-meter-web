import { Layout } from "@components/layout";
import { useRouter } from "next/router";

const SensorPage = () => {
  const sensor_id = useRouter().query.sensor_id as string;
  return <Layout>hello sensor {sensor_id}</Layout>;
};

export default SensorPage;
