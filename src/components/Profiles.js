import React from "react";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { useCallback } from "react";
import { scaleLinear, scaleLog } from "d3-scale";

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
} from "recharts";

import CostumLegend from "../components/CostumLegend";
import CustomizedLabel from "../components/CustomizedLabel";
import CustomizedRectangle from "../components/CustomizedRectangle";
import CustomTooltip from "../components/CustomTooltip";

const Profiles = ({ data }) => {
  const [surfaceWidth, surfaceHeight] = [700, 300];
  const scale = scaleLinear();
  const yScale = scaleLog().base(Math.E);
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDivDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, "myChart.png");
    }
  }, [getPng]);

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
          <CartesianGrid strokeDasharray="10 10" />

          <XAxis
            dataKey="x-axis-key"
            scale={scale}
            domain={[0, Math.ceil(data[data.length - 1]["x-axis-key"])]}
            type="number"
          />

          <YAxis
            domain={[Math.floor(minDIE - 1), Math.ceil(maxUGE + 1)]}
            type="number"
            dataKey="y"
            scale={yScale}
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
          cursor: "pointer",
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
