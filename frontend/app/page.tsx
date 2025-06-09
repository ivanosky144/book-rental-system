"use client";
import { Card } from "./components/card"; // Import Card component

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
      const response = await fetch("http://localhost:3000/api/admins/login", {
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
      setAdminError("Network error");
    }
    setAdminLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-200 text-black">
      {/* Welcome Section */}
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-4 text-teal-500 pixel-font">
          Welcome to BookRent
        </h1>
        <p className="text-2xl text-gray-700 pixel-font">
          Discover, rent, and enjoy your favorite books with ease.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {/* Card for Browse Collection */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Browse Collection
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Explore a wide variety of books across genres and authors.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/books"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Browse Books
            </a>
          </Card.Content>
        </Card>

        {/* Card for Admin Management */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Admin Management
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Manage genres, authors, publishers, and more as an admin.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/management"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Go to Management
            </a>
          </Card.Content>
        </Card>

        {/* Card for Manage Account */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Your Account
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Track your rentals, returns, and manage your profile.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/account"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Go to Account
            </a>
          </Card.Content>
        </Card>
      </div>

      {/* Admin Login Button under the cards */}
      {adminName ? (
        <div className="mt-8 text-xl text-teal-700 font-bold pixel-font">Welcome, {adminName}!</div>
      ) : (
        <button
          className="mt-8 px-6 py-3 bg-teal-500 text-white rounded pixel-font hover:bg-teal-600"
          onClick={() => setShowAdminLogin(true)}
          type="button"
        >
          Admin Login
        </button>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
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
                className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600"
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
