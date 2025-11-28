import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // using same style

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === form.email)) {
      return alert("⚠️ User already exists!");
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registered successfully! Please login.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="/" className="link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
