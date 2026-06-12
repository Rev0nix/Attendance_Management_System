function StudentDashboard() {

  const name =
    localStorage.getItem("name");

  const studentId =
    localStorage.getItem("studentId");

  const rollNumber =
    localStorage.getItem("rollNumber");

  return (
    <div>
      <h1>Student Dashboard</h1>

      <h3>Name: {name}</h3>

      <h3>
        Student ID: {studentId}
      </h3>

      <h3>
        Roll Number: {rollNumber}
      </h3>

      <button
        onClick={() => {
          window.location.href =
            "/view-attendance";
        }}
      >
        View Attendance
      </button>

      <br /><br />

      <button
        onClick={() => {
          window.location.href =
            "/percentage";
        }}
      >
        Attendance Percentage
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

export default StudentDashboard;