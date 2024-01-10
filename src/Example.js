import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 6400,
    amt: 2400,
    sama: "ch0",
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 4398,
    amt: 2210,
    sama: "ch1",
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    sama: "ch2",
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    sama: "ch3",
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    sama: "ch4",
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    sama: "ch5",
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    sama: "ch6",
  },
];

const CustomizedLabel = (props) => {
  console.log("props: ", props);
  const { x, y, index } = props;

  return (
    <foreignObject x={x - 40} y={y - 20} width={100} height={100}>
      <div>
        {data[index].uv}-{data[index].sama}
      </div>
    </foreignObject>
  );
};

// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((firstSeriesPoint, index) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        key={firstSeriesPoint.payload.name}
        width={10}
        height={yDifference}
        x={secondSeriesPoint.x - 5}
        y={secondSeriesPoint.y}
        stroke="#000"
        fill="transparent"
      />
    );
  });
};

const Example = () => {
  return (
    <div className="container">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="pv"
            stroke="#8884d8"
            label={<CustomizedLabel data={data} offset={20} />}
          />
          <Line dataKey="uv" stroke="#82ca9d" />
          <Customized component={CustomizedRectangle} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Example.demoUrl = "https://codesandbox.io/s/customized-line-chart-cbd9ey";

export default Example;
