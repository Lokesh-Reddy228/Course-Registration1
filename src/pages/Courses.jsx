import React, { useState, useEffect } from "react";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [enrolled, setEnrolled] = useState(
    JSON.parse(
      localStorage.getItem(
        user?.email ? `${user.email}_enrolled` : "guest_enrolled"
      )
    ) || []
  );

  // ✅ Load course list
  useEffect(() => {
    setCourses([
      { id: 1, title: "Data Structures", code: "CSE201", faculties: ["Dr. Ramesh", "Dr. Priya"] },
      { id: 2, title: "Database Management Systems", code: "CSE304", faculties: ["Dr. Kiran", "Dr. Meena"] },
      { id: 3, title: "Operating Systems", code: "CSE306", faculties: ["Dr. Neha", "Dr. Varun"] },
      { id: 4, title: "Web Technologies", code: "CSE308", faculties: ["Dr. Arjun", "Dr. Sneha"] },
      { id: 5, title: "Machine Learning", code: "CSE402", faculties: ["Dr. Kavya", "Dr. Rohit"] },
      { id: 6, title: "Computer Networks", code: "CSE310", faculties: ["Dr. Ravi", "Dr. Preeti"] },
      { id: 7, title: "Digital Signal Processing", code: "ECE205", faculties: ["Dr. Manoj", "Dr. Asha"] },
      { id: 8, title: "Power Systems", code: "EEE305", faculties: ["Dr. Karthik", "Dr. Bhavya"] },
      { id: 9, title: "Thermodynamics", code: "MECH201", faculties: ["Dr. Mohan", "Dr. Pooja"] },
      { id: 10, title: "Civil Structures", code: "CIV301", faculties: ["Dr. Suresh", "Dr. Divya"] },
    ]);
  }, []);

  // ✅ Open faculty selection popup
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setSelectedFaculty("");
    setShowPopup(true);
  };

  // ✅ Confirm enrollment
  const confirmEnrollment = () => {
    if (!selectedFaculty) {
      alert("⚠️ Please select a faculty before confirming!");
      return;
    }

    const newEnrollment = { ...selectedCourse, faculty: selectedFaculty };
    const updated = [...enrolled, newEnrollment];
    setEnrolled(updated);

    const key = user?.email ? `${user.email}_enrolled` : "guest_enrolled";
    localStorage.setItem(key, JSON.stringify(updated));

    alert(`🎉 Enrolled in ${selectedCourse.title} under ${selectedFaculty}!`);

    setShowPopup(false);
  };

  // ✅ Cancel popup
  const handleCancelPopup = () => {
    alert("❌ Enrollment cancelled");
    setShowPopup(false);
  };

  return (
    <div className="course-container">
      <h2>Available Courses</h2>

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.title}</h3>
              <span className="course-code">{course.code}</span>
            </div>
            <p>Enhance your technical skills in {course.title}.</p>
            <button
              onClick={() => handleEnrollClick(course)}
              className="enroll-btn"
              disabled={enrolled.some((e) => e.id === course.id)}
            >
              {enrolled.some((e) => e.id === course.id)
                ? "✅ Enrolled"
                : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Select Faculty for</h3>
            <h4 className="course-name">{selectedCourse?.title}</h4>

            <select
              className="faculty-select"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">-- Choose Faculty --</option>
              {selectedCourse?.faculties.map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <div className="popup-actions">
              <button onClick={confirmEnrollment} className="confirm-btn">
                Confirm
              </button>
              <button onClick={handleCancelPopup} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
