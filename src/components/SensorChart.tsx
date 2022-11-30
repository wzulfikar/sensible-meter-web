import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

import { useSensorReading } from "../hooks/useSensorReading";

export const SensorChart = ({ sensor_id }) => {
  const query = useSensorReading({ sensor_id, limit: 100 });
  // console.log("query.data:", query.data);

  const data = query.data?.result || [];

  data.forEach((item, i) => {
    // Extract hh:mm from created_at. (from `2022-11-30T10:26:26.913398` to `10:26`)
    data[i].created_at_short = item.created_at
      .split("T")[1]
      .split(":")
      .splice(0, 2)
      .join(":");
  });

  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        isAnimationActive={false}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="created_at_short" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
