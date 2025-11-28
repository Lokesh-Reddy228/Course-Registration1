import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ Load enrolled courses once
  useEffect(() => {
    const key = user?.email ? `${user.email}_enrolled` : "guest_enrolled";
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setEnrolled(data);
  }, [user]);

  // ✅ Cancel a course
  const cancelCourse = (courseId) => {
    if (window.confirm("❌ Are you sure you want to cancel this course?")) {
      const updated = enrolled.filter((c) => c.id !== courseId);
      setEnrolled(updated);

      const key = user?.email ? `${user.email}_enrolled` : "guest_enrolled";
      localStorage.setItem(key, JSON.stringify(updated));

      alert("⚠️ Course cancelled successfully!");
    }
  };

  // ✅ Back to Courses
  const handleBackToCourses = () => navigate("/courses");

  return (
    <div className="course-container">
      <h2>My Enrolled Courses</h2>

      {enrolled.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="course-grid">
          {enrolled.map((c) => (
            <div key={c.id} className="course-card enrolled-card">
              <h3>{c.title}</h3>
              <p>{c.code}</p>
              {c.faculty && (
                <p className="faculty-info">
                  <strong>Faculty:</strong>{" "}
                  <span className="faculty-badge">{c.faculty}</span>
                </p>
              )}
              <button
                className="cancel-course-btn"
                onClick={() => cancelCourse(c.id)}
              >
                Cancel Course
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={handleBackToCourses}>
        ← Back to Courses
      </button>
    </div>
  );
}
