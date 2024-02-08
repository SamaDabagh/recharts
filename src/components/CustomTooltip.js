const CustomTooltip = ({ active, payload, label }) => {
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


export default CustomTooltip;
