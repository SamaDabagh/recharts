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

const CustomizedLabel = (props) => {
  const { x, y, index } = props;
  console.log("props[index]: ", props);
  return (
    <foreignObject x={x} y={y + 20} width={100} height={100}>
      <div>{props.data[index]["Slope (%)"]}</div>
      <div>{props.data[index].Length}</div>
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
        key={firstSeriesPoint.payload.Pipe}
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

export const CustomTooltip = ({ active, payload, label }) => {
  console.log("active", active);
  console.log("payload: ", payload);
  console.log("pipe: ", payload[0]?.payload.Pipe);
  console.log("label", label);

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p>Pipe: {payload[0]?.payload.Pipe}</p>
        <div>
          {payload.map((pld) => (
            <div style={{ display: "inline-block", padding: 10 }}>
              <div style={{ color: pld.fill }}>{pld.value}</div>
              <div>{pld.dataKey}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const Profiles = ({ data }) => {
  console.log("data in profile: ", data);

  const elementMax = data.reduce((prev, next) => {
    if (prev.UGE > next.UGE) {
      return prev;
    }
    return next;
  });
  let maxUGE = elementMax.UGE;

  const elementMin = data.reduce((prev, next) => {
    if (prev.DIE < next.DIE) {
      return prev;
    }
    return next;
  });
  let minDIE = elementMin.DIE;

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
          <XAxis dataKey="x-axis-key" domain={[0, 600]} type="number" />
          <YAxis domain={[Math.floor(minDIE - 1), Math.ceil(maxUGE + 1)]} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "white" }} />
          {/* <Tooltip /> */}
          <Legend />
          <Line
            dataKey="UGE"
            stroke="#8884d8"
            label={<CustomizedLabel data={data} />}
          />
          <Line dataKey="UIE" stroke="#22bb11" />

          <Line dataKey="UCE" stroke="#82ca9d" />

          <Customized component={CustomizedRectangle} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Profiles.demoUrl = "https://codesandbox.io/s/customized-line-chart-cbd9ey";

export default Profiles;
