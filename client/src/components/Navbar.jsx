import React from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Notes App
          </h1>

          <SearchBar />

          {/* AUTH SECTION */}
          <div className="flex items-center gap-3">
            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                  Signup
                </button>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                {/* USER INFO */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white">
                  <FiUser />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>

                {/* LOGOUT BUTTON */}
                <button
                  onClick={logout}
                  className="p-3 cursor-pointer rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                >
                  <FiLogOut />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
