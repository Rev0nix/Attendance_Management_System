import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceReport from "./pages/AttendanceReport";
import ViewAttendance from "./pages/ViewAttendance";
import AttendancePercentage from "./pages/AttendancePercentage";
import Register from "./pages/Register";
import AttendanceChart from "./pages/AttendanceChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/mark-attendance"
          element={<MarkAttendance />}
        />

        <Route
          path="/report"
          element={<AttendanceReport />}
        />

        <Route
          path="/view-attendance"
          element={<ViewAttendance />}
        />

        <Route
          path="/percentage"
          element={<AttendancePercentage />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/chart"
          element={<AttendanceChart />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;