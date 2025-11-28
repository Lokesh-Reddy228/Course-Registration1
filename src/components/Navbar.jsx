import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // ✅ remove from localStorage
    setCurrentUser(null);                   // ✅ reset state
    navigate("/", { replace: true });
    alert("✅ Logged out successfully!");
  };

  return (
    <nav className="navbar">
      <h2 className="nav-title">🎓 B.Tech Course Portal</h2>
      <div className="nav-links">
        <Link to="/courses">Courses</Link>
        <Link to="/mycourses">My Courses</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
