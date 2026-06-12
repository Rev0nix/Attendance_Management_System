import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AttendanceChart() {

  const [report, setReport] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/attendance/report",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setReport(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          report.presentCount || 0,
          report.absentCount || 0
        ]
      }
    ]
  };

  return (
    <div>
      <h1>Attendance Chart</h1>

      <div style={{
        width: "400px",
        margin: "auto"
      }}>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AttendanceChart;