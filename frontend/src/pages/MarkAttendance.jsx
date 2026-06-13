import { useState } from "react";
import axios from "axios";

function MarkAttendance() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");

  const markAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://attendance-management-system-8rhj.onrender.com/api/attendance/mark",
        {
          studentId,
          status
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert(res.data.message);

      setStudentId("");
      setStatus("Present");

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Attendance Marking Failed"
      );
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <br />
      <br />

      <button onClick={markAttendance}>
        Submit
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          window.location.href = "/teacher";
        }}
      >
        Back
      </button>
    </div>
  );
}

export default MarkAttendance;