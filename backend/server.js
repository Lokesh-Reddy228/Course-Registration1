import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, courses } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now(),
    name,
    email,
    password: hashed,
    enrolledCourses: []
  });

  res.json({ message: "Registered successfully!" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.json({ message: "Email not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user.id }, "secret");

  res.json({
    message: "Login success",
    token,
    user
  });
});

// GET ALL COURSES
app.get("/courses", (req, res) => {
  res.json(courses);
});

// ENROLL
app.post("/enroll/:id", (req, res) => {
  const { token } = req.headers;

  if (!token) return res.json({ message: "Not logged in" });

  const decoded = jwt.verify(token, "secret");
  const user = users.find(u => u.id === decoded.id);

  const courseId = Number(req.params.id);

  if (user.enrolledCourses.includes(courseId)) {
    return res.json({ message: "Already enrolled" });
  }

  user.enrolledCourses.push(courseId);

  res.json({ message: "Enrolled successfully" });
});

// MY COURSES
app.get("/mycourses", (req, res) => {
  const { token } = req.headers;

  if (!token) return res.json({ message: "Not logged in" });

  const decoded = jwt.verify(token, "secret");
  const user = users.find(u => u.id === decoded.id);

  const myCourses = courses.filter(c => user.enrolledCourses.includes(c.id));

  res.json(myCourses);
});

// START SERVER
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));