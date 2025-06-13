"use client";
import React, { useEffect, useState } from "react";

export default function PublisherManagement() {
  const [publishers, setPublishers] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", website: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch publishers from backend
  const fetchPublishers = () => {
    setLoading(true);
    fetch(`${apiURI}api/publishers`)
      .then((res) => res.json())
      .then((data) => setPublishers(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to manage publishers.");
      return;
    }
    let success = false;
    if (isEditing) {
      const res = await fetch(`${apiURI}api/publishers/${editId}`, {
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
      const res = await fetch(`${apiURI}api/publishers`, {
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
      setForm({ name: "", address: "", website: "" });
      setIsEditing(false);
      setEditId(null);
      fetchPublishers();
    }
  };

  const handleEdit = (publisher) => {
    setForm({
      name: publisher.name || "",
      address: publisher.address || "",
      website: publisher.website || "",
    });
    setIsEditing(true);
    setEditId(publisher.id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to delete publishers.");
      return;
    }
    await fetch(`${apiURI}api/publishers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPublishers();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Publisher Management</h1>
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
        <label className="block mb-1 font-semibold text-gray-900">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded text-gray-900"
          required
        />
        <label className="block mb-1 font-semibold text-gray-900">Website</label>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded text-gray-900"
          required
        />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full font-bold">
          {isEditing ? "Update Publisher" : "Add Publisher"}
        </button>
      </form>
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Publishers List</h2>
        {loading ? (
          <div className="text-gray-900">Loading...</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-2 text-left text-gray-900">ID</th>
                <th className="py-2 px-2 text-left text-gray-900">Name</th>
                <th className="py-2 px-2 text-left text-gray-900">Address</th>
                <th className="py-2 px-2 text-left text-gray-900">Website</th>
                <th className="py-2 px-2 text-left text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.id}>
                  <td className="py-2 px-2 font-semibold text-gray-900">{publisher.id}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{publisher.name}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{publisher.address}</td>
                  <td className="py-2 px-2 font-semibold text-gray-900">{publisher.website}</td>
                  <td className="py-2 px-2">
                    <button onClick={() => handleEdit(publisher)} className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(publisher.id)} className="text-red-600 hover:underline">Delete</button>
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
