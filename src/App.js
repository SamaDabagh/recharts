import "./App.css";
// import Example from "./Example";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import profiles_input_node_2_3 from "./assets/profiles_input_node_2_30.csv";
import Profiles from "./Profiles";
function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchParseData = async (params) => {
      Papa.parse(profiles_input_node_2_3, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          const finalData = result.data
            .slice(1, result.data.length - 1)
            .map((dataOfEachRow) => {
              const rowObject = {};
              result.data[0].forEach((key, index) => {
                if (index === 0) {
                  rowObject["name"] = dataOfEachRow[index];
                } else {
                  rowObject[key] = Number(dataOfEachRow[index]);
                }
              });
              return rowObject;
            });
          finalData.forEach((element, index, array) => {
            if (!index) {
              element["x-axis-key"] = 0;
            } else {
              element["x-axis-key"] =
                array[index - 1]["x-axis-key"] + array[index - 1].Length;
            }
          });
          setRowData(finalData);
        },
      });
    };
    fetchParseData();
  }, []);

  return (
    <div className="App">
      {/* <Example data={rowData} /> */}
      {rowData.length > 0 && <Profiles data={rowData} />}
    </div>
  );
}

export default App;
