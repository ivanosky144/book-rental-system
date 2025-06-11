"use client";
import React, { useEffect, useState } from "react";

export default function AuthorManagement() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name: "", bio: "", nationality: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch authors from backend
  const fetchAuthors = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to manage authors.");
      return;
    }
    let success = false;
    if (isEditing) {
      const res = await fetch(`http://localhost:3000/api/authors/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        alert("Session expired or unauthorized. Please login as admin again.");
        return;
      }
      success = res.ok;
    } else {
      const res = await fetch("http://localhost:3000/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        alert("Session expired or unauthorized. Please login as admin again.");
        return;
      }
      success = res.ok;
    }
    if (success) {
      setForm({ name: "", bio: "", nationality: "" });
      setIsEditing(false);
      setEditId(null);
      fetchAuthors(); // Always fetch fresh data
    }
  };

  const handleEdit = (author) => {
    setForm({
      name: author.name || "",
      bio: author.bio || "",
      nationality: author.nationality || "",
    });
    setIsEditing(true);
    setEditId(author.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to delete authors.");
      return;
    }
    await fetch(`http://localhost:3000/api/authors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAuthors(); // Fetch fresh data after delete
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Author Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md mb-8">
        <label className="block mb-1 font-semibold text-gray-900">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded text-gray-900"
          required
        />
        <label className="block mb-1 font-semibold text-gray-900">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded text-gray-900"
          required
        />
        <label className="block mb-1 font-semibold text-gray-900">Nationality</label>
        <input
          type="text"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded text-gray-900"
          required
        />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full font-bold">
          {isEditing ? "Update Author" : "Add Author"}
        </button>
      </form>
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Authors List</h2>
        {loading ? (
          <div className="text-gray-900">Loading...</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 text-left text-gray-900">ID</th>
                <th className="py-2 px-2 text-left text-gray-900">Name</th>
                <th className="py-2 px-2 text-left text-gray-900">Bio</th>
                <th className="py-2 px-2 text-left text-gray-900">Nationality</th>
                <th className="py-2 px-2 text-left text-gray-900">Book Count</th>
                <th className="py-2 px-2 text-left text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="py-2 px-2 font-semibold text-gray-900">{author.id}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{author.name}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{author.bio}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{author.nationality}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{author.book_count ?? 0}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleEdit(author)} className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(author.id)} className="text-red-600 hover:underline">Delete</button>
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
