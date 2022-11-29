import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useSensorReading } from "../hooks/useSensorReading";

export const SensorChart = ({ sensor_id }) => {
  const query = useSensorReading({ sensor_id, limit: 100 });
  // console.log("query.data:", query.data);

  const data = query.data?.result || [];

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
      <XAxis dataKey="created_at" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
