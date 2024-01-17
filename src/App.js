import "./App.css";
import Example from "./Example";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import profiles_input_node_2_3 from "./assets/profiles_input_node_2_3.csv";
import Profiles from "./Profiles";
function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchParseData = async (params) => {
      Papa.parse(profiles_input_node_2_3, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          setRowData(
            result.data
              .slice(1, result.data.length - 1)
              .map((dataOfEachRow) => {
                const rowObject = {};
                result.data[0].forEach((key, index) => {
                  if (index === 0) {
                    rowObject["name"] = dataOfEachRow[index];
                  } else rowObject[key] = Number(dataOfEachRow[index]);
                });
                return rowObject;
              })
          );
        },
      });
    };
    fetchParseData();
  }, []);
  console.log("data:", rowData);
  return (
    <div className="App">
      <Example data={rowData} />
      {rowData.length > 0 && <Profiles data={rowData} />}
    </div>
  );
}

export default App;
