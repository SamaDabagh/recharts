import { Rectangle } from "recharts";

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

export default CustomizedRectangle;
