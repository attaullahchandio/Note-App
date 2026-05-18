// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./configs/db.js";
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
// import  dns from 'dns';
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config()

// Database connectivity
connectDB()

// Create app
const app = express();


// Allow frontend to access backend
app.use(cors({origin: "*", }));

// Parse JSON data
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Notes API is running 🚀" });
});

// Start server only in development mode
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}else {
  // Export app for production/serverless deployment (e.g. Vercel)
  export default app;
}
