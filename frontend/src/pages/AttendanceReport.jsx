import { useEffect, useState } from "react";
import axios from "axios";

function AttendanceReport() {
  const [report, setReport] = useState({});

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");

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

  return (
    <div>
      <h1>Attendance Report</h1>

      <p>Total Records: {report.totalRecords}</p>
      <p>Present: {report.presentCount}</p>
      <p>Absent: {report.absentCount}</p>
    </div>
  );
}

export default AttendanceReport;