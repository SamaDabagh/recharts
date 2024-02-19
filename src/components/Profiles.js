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
  const [chartWidth, chartHeight] = [800, 400];

  const margin = { top: 20, right: 30, left: 40, bottom: 20 }; // Adjust margins as needed
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
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart
          width={chartWidth}
          height={chartHeight}
          data={data}
          margin={{
            top: margin.top,
            right: margin.right,
            left: margin.left,
            bottom: margin.bottom,
          }}
          ref={ref}
        >
          <CartesianGrid strokeDasharray="10 10" />

          <XAxis
            dataKey="x-axis-key"
            scale="linear"
            domain={[0, Math.ceil(data[data.length - 1]["x-axis-key"])]}
            type="number"
            tick={{ formatter: (tick) => tick / 100, interval: 5 }} // Divide the tick value by 50 and set interval to 50
          />

          <YAxis
            domain={[Math.floor(minDIE - 1), Math.ceil(maxUGE + 1)]}
            type="number"
            dataKey="y"
            tick={{ formatter: (tick) => tick / 10, interval: 0.5 }} // Divide the tick value by 100 and set interval to 5
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
