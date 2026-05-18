import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const { token } = useAuth();

  // ======================
  // GET ALL NOTES
  // ======================
  const fetchNotes = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await api.get("/api/notes/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CREATE NOTE
  // ======================
  const createNote = async (title, content) => {
    try {
      const res = await api.post(
        "/api/notes/note/create",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Create failed";
    }
  };

  // ======================
  // SEARCH NOTES
  // ======================
  const searchNotes = async (keyword) => {
    try {
      const res = await api.get(`/api/notes/search?q=${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || "Search failed");
    }
  };

  // ======================
  // UPDATE NOTE
  // ======================
  const updateNote = async (id, title, content) => {
    try {
      const res = await api.put(
        `/api/notes/note/update/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data : note))
      );

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Update failed";
    }
  };

  // ======================
  // DELETE NOTE
  // ======================
  const deleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      throw err.response?.data?.message || "Delete failed";
    }
  };

  // ======================
  // LOAD NOTES WHEN TOKEN READY
  // ======================
  useEffect(() => {
    if (token) {
      fetchNotes();
    }else{
      setNotes([])
    }
  }, [token]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        fetchNotes,
        searchNotes,
        updateNote,
        deleteNote,
        editingNote,
        setEditingNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);