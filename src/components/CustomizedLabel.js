const CustomizedLabel = (props) => {
  const { x, y, index } = props;

  return (
    props.index !== props.data.length - 1 &&
    (props.data.length < 7 ? (
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
        <div style={{ fontSize: "9px", fontWeight: "bold", color: "#253858" }}>
          Slope(%): {props.data[index]["Slope (%)"]}
        </div>
        <div
          style={{
            fontSize: "9px",
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

export default CustomizedLabel;
