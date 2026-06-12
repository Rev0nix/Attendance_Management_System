import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          rollNumber,
          email,
          password,
          role: "student"
        }
      );

      alert("Student Registered Successfully");

      window.location.href = "/";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div>

      <h1>Student Registration</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Roll Number"
        onChange={(e) =>
          setRollNumber(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;