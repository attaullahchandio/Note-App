import React from "react";
import { FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import { useNotes } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const { deleteNote, setEditingNote } = useNotes();

  return (
    <div className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white truncate pr-3">
          {note.title}
        </h3>

        <button className="text-yellow-300 hover:scale-110 transition-transform">
          <FiStar />
        </button>
      </div>

      {/* CONTENT */}
      <p className="text-slate-300 text-sm leading-6 line-clamp-4">
        {note.content}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5">

        <span className="text-xs text-slate-400">
          {note.createdAt
            ? new Date(note.createdAt).toLocaleDateString()
            : "No date"}
        </span>

        <div className="flex items-center gap-3">

          {/* EDIT */}
          <button
            onClick={() => setEditingNote(note)}
            className="text-indigo-300 hover:text-indigo-200 hover:scale-110 transition-all cursor-pointer"
          >
            <FiEdit2 />
          </button>

          {/* DELETE */}
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-300 hover:text-red-200 hover:scale-110 transition-all cursor-pointer"
          >
            <FiTrash2 />
          </button>

        </div>
      </div>

    </div>
  );
};

export default NoteCard;