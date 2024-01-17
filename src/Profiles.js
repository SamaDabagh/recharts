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

// const data = [
//   {
//     name: "Page A",
//     UCE: 4000,
//     UGE: 6400,
//     UIE: 2000,
//     amt: 2400,
//     sama: "ch0",
//   },
//   {
//     name: "Page B",
//     UCE: 3000,
//     UGE: 4398,
//     UIE: 2000,
//     amt: 2210,
//     sama: "ch1",
//   },
//   {
//     name: "Page C",
//     UCE: 2000,
//     pv: 9800,
//     UIE: 2000,
//     amt: 2290,
//     sama: "ch2",
//   },
//   {
//     name: "Page D",
//     UCE: 2780,
//     UGE: 3908,
//     UIE: 2000,
//     amt: 2000,
//     sama: "ch3",
//   },
//   {
//     name: "Page E",
//     UCE: 1890,
//     UGE: 4800,
//     UIE: 2000,
//     amt: 2181,
//     sama: "ch4",
//   },
//   {
//     name: "Page F",
//     UCE: 2390,
//     UGE: 3800,
//     UIE: 2000,
//     amt: 2500,
//     sama: "ch5",
//   },
//   {
//     name: "Page G",
//     UCE: 3490,
//     UGE: 4300,
//     UIE: 2000,
//     amt: 2100,
//     sama: "ch6",
//     "Slope (%)": 1.4,
//   },
// ];
// [
//   {
//       "Profil": "Node 3-5",
//       "Pipe": 2,
//       "Unode": 3,
//       "Dnode": 4,
//       "UGE": 101.2,
//       "DGE": 101.5,
//       "Diameter": 1,
//       "Slope (%)": 1.4,
//       "Length": 50,
//       "UCE": 101,
//       "DCE": 100.4,
//       "UIE": 100,
//       "DIE": 99.4
//   },
//   {
//       "Profil": "Node 3-5",
//       "Pipe": 3,
//       "Unode": 4,
//       "Dnode": 5,
//       "UGE": 101.5,
//       "DGE": 0,
//       "Diameter": 1.2,
//       "Slope (%)": 1.6,
//       "Length": 55,
//       "UCE": 100.5,
//       "DCE": 99.7,
//       "UIE": 99.3,
//       "DIE": 98.5
//   },
//   {
//       "Profil": "\n",
//       "Pipe": null,
//       "Unode": null,
//       "Dnode": null,
//       "UGE": null,
//       "DGE": null,
//       "Diameter": null,
//       "Slope (%)": null,
//       "Length": null,
//       "UCE": null,
//       "DCE": null,
//       "UIE": null,
//       "DIE": null
//   }
// ]
const CustomizedLabel = (props) => {
  // console.log("props: ", props);
  const { x, y, index } = props;
  return null;
  // return (
  // <foreignObject x={x - 40} y={y - 20} width={100} height={100}>
  //   <div>
  //     {data[index].UCE}-{data[index]["Slope (%)"]}
  //   </div>
  // </foreignObject>
  // );
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
/* =======>
seState(initialState);
    const zoom = () => {
      let {
        refAreaLeft,
        refAreaRight
      } = zoomGraph;
      const {
        data
      } = zoomGraph;
      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        setZoomGraph(prev => ({
          ...prev,
          refAreaLeft: '',
          refAreaRight: ''
        }));
        return;
      }

      // xAxis domain
      if (refAreaLeft && refAreaRight && refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

      // yAxis domain
      const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
      const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);
      setZoomGraph(prev => ({
        ...prev,
        refAreaLeft: '',
        refAreaRight: '',
        data: data?.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
        bottom2,
        top2
      } as any));
    };
    const zoomOut = () => {
      const {
        data
      } = zoomGraph;
      setZoomGraph(prev => ({
        ...prev,
        data: data?.slice(),
        refAreaLeft: '',
        refAreaRight: '',
        left: 'dataMin',
        right: 'dataMax',
        top: 'dataMax+1',
        bottom: 'dataMin',
        top2: 'dataMax+50',
        bottom2: 'dataMin+50'
      }));
    };
    const {
      data,
      left,
      right,
      refAreaLeft,
      refAreaRight,
      top,
      bottom,
      top2,
      bottom2
    } = zoomGraph;
    return <div className="highlight-bar-charts" style={{
      userSelect: 'none',
      width: '100%'
    }}>
        <button type="button" className="btn update" onClick={() => zoomOut()}>
          Zoom Out
        </button>

        <ResponsiveContainer minHeight={500}>
          <LineChart width={800} height={400} data={data} onMouseDown={e => setZoomGraph(prev => ({
          ...prev,
          refAreaLeft: e.activeLabel
        }))} onMouseMove={e => zoomGraph.refAreaLeft && setZoomGraph(prev => ({
          ...prev,
          refAreaRight: e.activeLabel
        }))} onMouseUp={() => zoom()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="name" domain={left && right ? [left, right] : undefined} type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Line yAxisId="1" type="natural" dataKey="cost" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="impression" stroke="#82ca9d" animationDuration={300} />

            {refAreaLeft && refAreaRight ? <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} /> : null}
          </LineChart>
        </ResponsiveContainer>
      </div>;
  }
};
========>*/
const Profiles = ({ data }) => {
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
          {/* <XAxis
            dataKey="Profil"
            type="number"
            domain={[0, "dataMax + 1000"]}
          /> */}
          <XAxis dataKey="name" />

          <YAxis domain={[95, 105]} />
          <Tooltip pv="UGE" />
          <Legend />
          <Line
            dataKey="UGE"
            stroke="#8884d8"
            label={<CustomizedLabel data={data} offset={20} />}
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
