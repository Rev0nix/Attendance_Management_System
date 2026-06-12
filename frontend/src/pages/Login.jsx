import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      localStorage.setItem(
        "studentId",
        res.data.id
      );

      localStorage.setItem(
        "rollNumber",
        res.data.rollNumber
      );

      if (res.data.role === "teacher") {

        window.location.href = "/teacher";

      } else {

        window.location.href = "/student";

      }

    } catch (error) {

      console.error(error);

      alert("Login Failed");

    }

  };

  return (
    <div>

      <h1>
        Attendance Management System
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={loginUser}>
        Login
      </button>

      <br /><br />

      <button
        onClick={() => {
          window.location.href = "/register";
        }}
      >
        Register Student
      </button>

    </div>
  );
}

export default Login;