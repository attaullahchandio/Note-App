import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNotes } from "../context/NoteContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchNotes, fetchNotes } = useNotes();

  // SUBMIT SEARCH
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      fetchNotes(); // reset
    } else {
      searchNotes(query);
    }
  };

  // LIVE SEARCH (optional UX upgrade)
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      fetchNotes(); // reset instantly
    } else {
      searchNotes(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

        <input
          type="text"
          placeholder="Search your notes..."
          value={query}
          onChange={handleChange}
          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-l-xl
            bg-white/10
            backdrop-blur-md
            border border-white/10
            border-r-0
            text-white
            placeholder:text-slate-400
            outline-none
            focus:ring-2
            focus:ring-indigo-500/50
            transition-all
          "
        />
      </div>

      <button
        type="submit"
        className="
          px-5
          py-3
          rounded-r-xl
          bg-linear-to-r
          from-indigo-500
          to-purple-600
          text-white
          font-semibold
          hover:opacity-90
          active:scale-95
          transition-all
          cursor-pointer
        "
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;