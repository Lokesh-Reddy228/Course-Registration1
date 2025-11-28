import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  return (
    <Router>
      {currentUser && <Navbar setCurrentUser={setCurrentUser} />}
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/courses" />
            ) : (
              <Login setCurrentUser={setCurrentUser} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={currentUser ? <Courses /> : <Navigate to="/" />}
        />
        <Route
          path="/mycourses"
          element={currentUser ? <MyCourses /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
