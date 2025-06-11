"use client";
import React, { useEffect, useState } from "react";

export default function GenreManagementPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch genres
  const fetchGenres = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Add genre
  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Admin only!");
    const res = await fetch("http://localhost:3000/api/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      fetchGenres();
    } else {
      alert("Failed to add genre");
    }
  };

  // Edit genre
  const handleEdit = (genre) => {
    setEditId(genre.id);
    setEditName(genre.name);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Admin only!");
    const res = await fetch(`http://localhost:3000/api/genres/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editName }),
    });
    if (res.ok) {
      setEditId(null);
      setEditName("");
      fetchGenres();
    } else {
      alert("Failed to update genre");
    }
  };

  // Delete genre
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this genre?")) return;
    const token = localStorage.getItem("token");
    if (!token) return alert("Admin only!");
    const res = await fetch(`http://localhost:3000/api/genres/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchGenres();
    else alert("Failed to delete genre");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Genre Management</h1>
      <form onSubmit={editId ? handleUpdate : handleAdd} className="mb-6 flex flex-col md:flex-row gap-2 w-full max-w-lg items-center bg-white rounded shadow p-4">
        <input
          type="text"
          placeholder="Genre name"
          value={editId ? editName : name}
          onChange={(e) => (editId ? setEditName(e.target.value) : setName(e.target.value))}
          className="p-2 border rounded flex-1 text-lg text-gray-900 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
          required
        />
        <div className="flex gap-2 w-full md:w-auto">
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full md:w-auto font-bold text-lg">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setEditName(""); }} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full md:w-auto font-bold text-lg">Cancel</button>
          )}
        </div>
      </form>
      <div className="w-full max-w-lg bg-white rounded shadow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : genres.length === 0 ? (
          <div>No genres found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 text-gray-900 font-bold bg-gray-100">Name</th>
                <th className="py-2 text-gray-900 font-bold bg-gray-100">Book Count</th>
                <th className="py-2 text-gray-900 font-bold bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((g) => (
                <tr key={g.id}>
                  <td className="py-2 text-gray-900 font-semibold">{g.name}</td>
                  <td className="py-2 text-gray-900 font-semibold">{g.book_count ?? 0}</td>
                  <td className="py-2 flex gap-2 text-gray-900 font-semibold">
                    <button onClick={() => handleEdit(g)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(g.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
