const CostumLegend = (props) => {
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

export default CostumLegend;
