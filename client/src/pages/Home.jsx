import React from "react";
import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-2">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <NoteForm />
          </div>

          <div className="xl:col-span-2">
            <NoteList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;