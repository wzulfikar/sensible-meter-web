import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useSensorReading } from "../hooks/useSensorReading";

function convertUTCDateToLocalDate(date) {
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;
}

export const SensorChart = ({ sensor_id }) => {
  const query = useSensorReading({ sensor_id, limit: 100 });
  // console.log("query.data:", query.data);

  const data = query.data?.result || [];

  data.forEach((item, i) => {
    // Extract hh:mm from created_at. (from `2022-11-30T10:26:26.913398` to `10:26`)
    const localTime = convertUTCDateToLocalDate(
      new Date(item.created_at)
    ).toLocaleString();
    data[i].created_at_short = localTime.split(", ")?.[1]?.substr(0, 5);
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
