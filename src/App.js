import "./App.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import profiles_input_node_2_3 from "./assets/profiles_input.csv";
import Profiles from "./components/Profiles";
function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(profiles_input_node_2_3, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          console.log("result.data.length - 1: ", result.data);
          const finalData = result?.data
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
  // console.log("rowData", rowData);
  return (
    <div className="App">
      {rowData.length > 0 && <Profiles data={rowData} />}
    </div>
  );
}

export default App;
