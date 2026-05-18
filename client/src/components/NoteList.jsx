import React from "react";
import NoteCard from "./NoteCard";
import { useNotes } from "../context/NoteContext";

const NoteList = () => {
  const { notes, loading } = useNotes();

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Your Notes
      </h2>

      {/* LOADING SKELETON */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/10"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-slate-400 text-lg mb-2">
            No notes found
          </div>
          <p className="text-slate-500 text-sm">
            Start by creating your first note ✨
          </p>
        </div>
      )}

      {/* NOTES GRID */}
      {!loading && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;