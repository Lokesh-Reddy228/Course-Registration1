import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setCurrentUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (!found) return alert("❌ No account found. Please register!");
    if (found.password !== form.password)
      return alert("❌ Incorrect password!");

    localStorage.setItem("currentUser", JSON.stringify(found));
    setCurrentUser(found);
    alert(`✅ Welcome back, ${found.name}!`);
    navigate("/courses");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
