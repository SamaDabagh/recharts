import React from "react";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";
import { scaleLinear } from "d3-scale";
const scale = scaleLinear();

const CostumLegend = (props) => {
  console.log("--------payload: ", props);
  const { payload } = props;

  return (
    <>
      <h3 style={{ fontWeight: "bold", color: "#253858" }}>{props.title}</h3>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "0px",
        }}
      >
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{ color: `${entry.color}`, marginLeft: "10px" }}
          >
            &mdash; {entry.value}
          </li>
        ))}
      </ul>
    </>
  );
};

const CustomizedLabel = (props) => {
  const { x, y, index } = props;
  console.log("props[index]: ", props);
  console.log("props.data.index: ", props.data[index]["x-axis-key"]);
  console.log("  props.index :", props.index);
  // console.log("  props.data:", props.data);
  // console.log("  props.index :", props.index);
  // console.log("  props.index :", props.index);

  return (
    props.index !== props.data.length - 1 &&
    (props.data["x-axis-key"] < 350 && props.data.length < 7 ? (
      <foreignObject
        x={x + props.data[index].Length}
        y={props.data[index].UIE + 12}
        width={70}
        height={30}
        style={{
          background: "white",
          width: "100px",
          height: "50px",
          padding: "5px",
          textAlign: "left",
          marginLeft: "auto",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#ff8858" }}>
          Slope(%): {props.data[index]["Slope (%)"]}
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#bb3858",
          }}
        >
          Length: {props.data[index].Length} m
        </div>
      </foreignObject>
    ) : (
      <foreignObject
        x={x + props.data[index].Length / 2}
        y={+132}
        width={70}
        height={30}
        style={{
          background: "white",
          width: "70px",
          height: "30px",
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
          marginTop: "1px",
          paddingBottom: "9px",
          paddingTop: "0px",
          width: "80px",
          height: "80px",
        }}
      >
        <h5
          style={{
            color: "#253858",
            marginBottom: "0px",
            paddingBottom: "0px",
            paddingTop: "1px",
            marginTop: "4px",
          }}
        >
          Node: {payload[0]?.payload.Unode}
        </h5>
        <div
          style={{
            color: `${payload[2]?.color}`,
            fontSize: "12px",
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

const CartesianGridNoDashVertical = (props) => {
  console.log("props---from---CartesianGridNoDashVertical", props);
  return <></>;
};

const Profiles = ({ data }) => {
  // console.log("aaaaaaaaaaaaaaa====>", data[data.length - 1]["x-axis-key"]);
  const [surfaceWidth, surfaceHeight] = [700, 300];
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDivDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, "myChart.png");
    }
  }, [getPng]);

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

  let verticalPointsArr = data.map((element) => element["x-axis-key"]);

  console.log("verticalPointsArr---->", verticalPointsArr.slice(1));
  console.log(
    "X-axis data values:",
    data.map((element) => element["x-axis-key"])
  );

  return (
    <div className="container">
      <ResponsiveContainer width="100%" height={surfaceHeight}>
        <LineChart
          width={surfaceWidth}
          height={surfaceHeight}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          ref={ref}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="x-axis-key"
            scale={scale}
            // padding={{ left: 0, right: 0 }}
            domain={[0, Math.ceil(data[data.length - 1]["x-axis-key"])]}
            type="number"
          />

          <YAxis
            domain={[Math.floor(minDIE - 1), Math.ceil(maxUGE + 1)]}
            type="number"
            dataKey="y"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          <Legend content={<CostumLegend title={data[0]?.name} />} />

          <Line
            dataKey="UGE"
            stroke="#82ca9d"
            label={<CustomizedLabel data={data} />}
          />
          <Line dataKey="UIE" stroke="#bb3858" />

          <Line dataKey="UCE" stroke="#bb3858" />

          <Customized component={CustomizedRectangle} />
          <h2 style={{ color: "#253858" }}>{data[0]?.name}</h2>
        </LineChart>
      </ResponsiveContainer>

      <br />
      <button
        style={{
          background: "#82ca9d",
          border: "1px solid #f7f7f4",
          padding: "20px",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "4px",
          color: "white",
          marginLeft: "5px",
        }}
        onClick={handleDivDownload}
      >
        {isLoading ? "Downloading..." : "Download Chart"}
      </button>
    </div>
  );
};

Profiles.demoUrl = "https://codesandbox.io/s/customized-line-chart-cbd9ey";

export default Profiles;
