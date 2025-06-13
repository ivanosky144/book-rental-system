"use client";
import apiURI from "./api/config";
import { Card } from "./components/card"; // Import Card component
import './styles/globals.css';

import React, { useState } from "react";

export default function Home() {
  // Admin login modal state
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Ambil nama admin dari localStorage jika sudah login
  const [adminName, setAdminName] = useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const admin = localStorage.getItem('admin');
      if (token && admin) {
        try {
          const adminObj = JSON.parse(admin);
          setAdminName(adminObj.name || null);
        } catch {
          setAdminName(null);
        }
      } else {
        setAdminName(null);
      }
    }
  }, [showAdminLogin]);

  // Dummy handler for admin login (replace with real logic)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError(null);
    try {
      const response = await fetch(`${apiURI}api/admins/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminUsername, // send as email
          password: adminPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // <-- simpan token
        localStorage.setItem('admin', JSON.stringify(data.admin)); // <-- simpan nama admin
        setShowAdminLogin(false);
        setAdminUsername("");
        setAdminPassword("");
        setAdminName(data.admin.name || null); // update state langsung
      } else {
        const data = await response.json();
        setAdminError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("[Login] - network error:", err);
      setAdminError("Network error");
    }
    setAdminLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-200 text-black">
      {/* Welcome Section */}
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-4 text-teal-500 pixel-font drop-shadow-[2px_2px_0_#000]">
          Welcome to BookRent
        </h1>
        <p className="text-2xl text-gray-700 pixel-font">
          Discover, rent, and enjoy your favorite books with ease.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {/* Card for Browse Collection */}
        <div className="group transition-transform duration-200 hover:scale-105">
          <Card className="bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#a78bfa] px-8 py-10 flex flex-col items-center pixel-font text-black transition-colors duration-200 group-hover:border-[#a78bfa]">
            <div className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-[#a78bfa]">Browse Collection</div>
            <div className="mb-4">Explore a wide variety of books across genres and authors.</div>
            <a href="/books" className="font-bold underline underline-offset-2 decoration-[#a78bfa] hover:text-[#a78bfa]">Browse Books</a>
          </Card>
        </div>
        <div className="group transition-transform duration-200 hover:scale-105">
          <Card className="bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#a78bfa] px-8 py-10 flex flex-col items-center pixel-font text-black transition-colors duration-200 group-hover:border-[#a78bfa]">
            <div className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-[#a78bfa]">Admin Management</div>
            <div className="mb-4">Manage genres, authors, publishers, and more as an admin.</div>
            <a href="/management" className="font-bold underline underline-offset-2 decoration-[#a78bfa] hover:text-[#a78bfa]">Go to Management</a>
          </Card>
        </div>
        <div className="group transition-transform duration-200 hover:scale-105">
          <Card className="bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#a78bfa] px-8 py-10 flex flex-col items-center pixel-font text-black transition-colors duration-200 group-hover:border-[#a78bfa]">
            <div className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-[#a78bfa]">Your Account</div>
            <div className="mb-4">Track your rentals, payments, returns, and manage your profile.</div>
            <a href="/account" className="font-bold underline underline-offset-2 decoration-[#a78bfa] hover:text-[#a78bfa]">Go to Account</a>
          </Card>
        </div>
      </div>

      {/* Admin Login Button under the cards */}
      {adminName ? (
        <>
          <div className="mt-8 text-l text-teal-700 font-bold pixel-font">Hello, admin {adminName}!</div>
          <button
            className="mt-4 px-4 py-2 bg-[#ffffdd] text-black border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#f87559] pixel-font text-l font-normal transition hover:bg-[#f5bab1] hover:text-black focus:outline-none"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('admin');
              setAdminName(null);
              window.location.reload();
            }}
            type="button"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="mt-8 px-5 py-2 bg-[#d1fae5] text-[#134e4a] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] pixel-font text-l font-normal transition hover:bg-[#5eead4] hover:text-black focus:outline-none"
          onClick={() => setShowAdminLogin(true)}
          type="button"
        >
          Admin Login
        </button>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-teal-600 pixel-font">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Email"
                className="border rounded px-3 py-2"
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#d1fae5] text-[#134e4a] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] pixel-font text-xl font-normal px-8 py-3 transition hover:bg-[#5eead4] hover:text-black focus:outline-none"
                disabled={adminLoading}
              >
                {adminLoading ? "Logging in..." : "Login"}
              </button>
              {adminError && (
                <div className="text-red-500 text-sm">{adminError}</div>
              )}
            </form>
            <button
              className="mt-4 text-gray-500 hover:underline"
              onClick={() => setShowAdminLogin(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
