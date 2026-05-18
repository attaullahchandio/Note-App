import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NoteContext";
import { toast } from "react-toastify";

const NoteForm = () => {
  const {
    createNote,
    updateNote,
    editingNote,
    setEditingNote,
  } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================
  // FILL FORM WHEN EDITING
  // ======================
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  // ======================
  // SUBMIT (CREATE or UPDATE)
  // ======================
  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (editingNote) {
        // UPDATE MODE
        await updateNote(editingNote._id, title, content);
        toast.success("Note updated successfully!");
      } else {
        // CREATE MODE
        await createNote(title, content);
        toast.success("Note created successfully!");
      }

      // reset form
      setTitle("");
      setContent("");
      setEditingNote(null);

    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // CANCEL EDIT / RESET
  // ======================
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setEditingNote(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
      
      {/* DYNAMIC TITLE */}
      <h2 className="text-2xl font-bold text-white mb-6">
        {editingNote ? "Update Note" : "Create Note"}
      </h2>

      <div className="space-y-4">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* CONTENT */}
        <textarea
          rows="6"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">

          {/* SAVE / UPDATE BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer
              ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:opacity-90 active:scale-[0.98]"
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {editingNote ? "Updating..." : "Saving..."}
              </>
            ) : (
              editingNote ? "Update Note" : "Save Note"
            )}
          </button>

          {/* CANCEL */}
          <button
            onClick={handleCancel}
            className="px-6 py-3 rounded-xl bg-red-500/20 text-red-300 font-semibold hover:bg-red-500/30 transition-all cursor-pointer"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default NoteForm;