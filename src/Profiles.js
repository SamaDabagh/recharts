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
  // console.log("props[index]: ", props);
  // console.log("props.data.index: ", props.data[index]);
  // console.log("  props.index :", props.index);
  // console.log("  props.data.Length - 1:", props.data.length - 1);
  return (
    props.index !== props.data.length - 1 &&
    (props.data.length < 5 ? (
      <foreignObject
        x={x + props.data[index].Length}
        y={y + (props.data[index].UGE - props.data[index].UCE) / 2}
        width={100}
        height={100}
        style={{
          background: "white",
          width: "120px",
          height: "70px",
          padding: "5px",
          textAlign: "left",
          marginLeft: "auto",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#253858" }}>
          Slope(%): {props.data[index]["Slope (%)"]}
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#253858",
          }}
        >
          Length: {props.data[index].Length} m
        </div>
      </foreignObject>
    ) : (
      <foreignObject
        x={x + 5}
        y={y + (props.data[index].UGE - props.data[index].UCE) / 2}
        width={100}
        height={100}
        style={{
          background: "white",
          width: "90px",
          height: "70px",
          padding: "4px",
          textAlign: "left",
          marginLeft: "10px",
        }}
      >
        <div style={{ fontSize: "8px", fontWeight: "bold", color: "#253858" }}>
          Slope(%): {props.data[index]["Slope (%)"]}
        </div>
        <div
          style={{
            fontSize: "8px",
            fontWeight: "bold",
            color: "#253858",
          }}
        >
          Length: {props.data[index].Length} m
        </div>
      </foreignObject>
    ))
  );
};
const [surfaceWidth, surfaceHeight] = [600, 300];

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
        key={firstSeriesPoint.payload["x-axis-key"]}
        width={6}
        height={yDifference}
        x={secondSeriesPoint.x - 3}
        y={secondSeriesPoint.y}
        stroke="#253858"
        fill="transparent"
      />
    );
  });
};

export const CustomTooltip = ({ active, payload, label }) => {
  // console.log("active", active);
  // console.log("payload: ", payload);
  // console.log("pipe: ", payload[0]?.payload.Pipe);
  // console.log("label", label);

  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "white",
          border: "1px solid rgb(136, 132, 216)",
          textAlign: "center",
          paddingLeft: "4px",
          paddingRight: "4px",
          marginTop: "3px",
          paddingBottom: "8px",
          width: "100px",
          height: "120px",
        }}
      >
        <h4
          style={{
            color: "#253858",
            marginBottom: "0px",
            paddingBottom: "0px",
            paddingTop: "2x",
          }}
        >
          Node: {payload[0]?.payload.Unode}
        </h4>
        <div
          style={{
            color: `${payload[2]?.color}`,
            fontSize: "14px",
            fontWeight: "bolder",
            marginTop: "4px",
            paddingTop: "2px",
          }}
        >
          <p
            style={{
              color: `${payload[0]?.color}`,
              marginBottom: "0px",
              paddingBottom: "0px",
              marginTop: "0px",
              paddingTop: "2px",
            }}
          >
            UGE : {payload[0]?.payload.UGE}
          </p>
          <p
            style={{
              color: `${payload[2]?.color}`,
              marginBottom: "0px",
              paddingBottom: "0px",
              marginTop: "0px",
              paddingTop: "2px",
            }}
          >
            UCE : {payload[0]?.payload.UCE}
          </p>
          <p
            style={{
              color: `${payload[1]?.color}`,
              marginBottom: "0px",
              paddingBottom: "0px",
              marginTop: "0px",
              paddingTop: "2px",
            }}
          >
            UIE : {payload[0]?.payload.UIE}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const Profiles = ({ data }) => {
  // console.log("data in profile: ", data);

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
      <ResponsiveContainer width="100%" height={surfaceHeight}>
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="x-axis-key" padding={{ left: 0, right: 30 }} />

          <YAxis
            domain={[Math.floor(minDIE - 1), Math.ceil(maxUGE + 1)]}
            type="number"
            dataKey="y"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Line
            dataKey="UGE"
            stroke="#82ca9d"
            label={<CustomizedLabel data={data} />}
          />
          <Line dataKey="UIE" stroke="#ffbc99" />

          <Line dataKey="UCE" stroke="#ffbc99" />

          <Customized component={CustomizedRectangle} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Profiles.demoUrl = "https://codesandbox.io/s/customized-line-chart-cbd9ey";

export default Profiles;
