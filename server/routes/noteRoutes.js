import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Search route should come before /:id
router.get("/search", searchNotes);

// CRUD routes
router.post("/note/create", createNote);
router.get("/get", getNotes);
router.put("/note/update/:id", updateNote);
router.delete("/note/delete/:id", deleteNote);

export default router;