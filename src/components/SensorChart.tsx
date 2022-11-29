import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SensorChart = () => {
  const [data, setData] = useState([
    { name: "", uv: 400, pv: 2400, amt: 2400 },
    { name: "", uv: 500, pv: 2400, amt: 2400 },
    { name: "", uv: 600, pv: 2400, amt: 2400 },
  ]);

  useEffect(() => {
    setInterval(() => {
      setData([...data, { name: "", uv: 400, pv: 2400, amt: 2400 }]);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
