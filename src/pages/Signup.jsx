import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", branch: "", year: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users/register", form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Signup</h2>
      {["name", "email", "password", "branch", "year"].map((f) => (
        <input
          key={f}
          placeholder={f}
          type={f === "password" ? "password" : "text"}
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          style={{ display: "block", margin: "10px 0" }}
        />
      ))}
      <button>Register</button>
    </form>
  );
}
