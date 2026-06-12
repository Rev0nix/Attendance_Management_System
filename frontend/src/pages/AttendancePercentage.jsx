import { useState } from "react";
import axios from "axios";

function AttendancePercentage() {
  const [studentId, setStudentId] = useState("");
  const [percentage, setPercentage] = useState(0);

  const calculatePercentage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/student/${studentId}`
      );

      const records = res.data;

      const present = records.filter(
        (r) => r.status === "Present"
      ).length;

      const total = records.length;

      const percent =
        total === 0 ? 0 : (present / total) * 100;

      setPercentage(percent.toFixed(2));

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div>
      <h1>Attendance Percentage</h1>

      <input
        placeholder="Student ID"
        onChange={(e) =>
          setStudentId(e.target.value)
        }
      />

      <button onClick={calculatePercentage}>
        Calculate
      </button>

      <h2>{percentage}%</h2>
    </div>
  );
}

export default AttendancePercentage;