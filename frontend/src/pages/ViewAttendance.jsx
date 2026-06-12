import { useState } from "react";
import axios from "axios";

function ViewAttendance() {
  const [studentId, setStudentId] = useState("");
  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/attendance/student/${studentId}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setAttendance(res.data);

    } catch (error) {
      alert("Error Fetching Attendance");
    }
  };

  return (
    <div>
      <h1>View Attendance</h1>

      <input
        placeholder="Student ID"
        onChange={(e) =>
          setStudentId(e.target.value)
        }
      />

      <button onClick={getAttendance}>
        Search
      </button>

      <hr />

      {attendance.map((item) => (
        <div key={item._id}>
          <p>Status: {item.status}</p>
          <p>Date: {item.date}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ViewAttendance;