import { useEffect, useState } from "react";
import axios from "axios";

function TeacherDashboard() {

  const [report, setReport] = useState({});

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

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

  return (
    <div>

      <h1>Teacher Dashboard</h1>

      <h3>
        Total Records:
        {" "}
        {report.totalRecords || 0}
      </h3>

      <h3>
        Present:
        {" "}
        {report.presentCount || 0}
      </h3>

      <h3>
        Absent:
        {" "}
        {report.absentCount || 0}
      </h3>

      <br />

      <button
        onClick={() => {
          window.location.href =
            "/mark-attendance";
        }}
      >
        Mark Attendance
      </button>

      <br /><br />

      <button
        onClick={() => {
          window.location.href = "/chart";
        }}
      >
        Attendance Chart
      </button>
      
      <br /><br />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default TeacherDashboard;