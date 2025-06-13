"use client";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

export default function MemberManagementPage() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    membership_date: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all members
  const fetchMembers = () => {
    const token = localStorage.getItem("token");
    fetch("/api/users", {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => setMembers(Array.isArray(data.data) ? data.data : []));
  };
  useEffect(() => { fetchMembers(); }, []);

  // Open modal for add/edit
  const openAddModal = () => {
    setForm({ name: "", email: "", password: "", membership_date: "", phone: "" });
    setModalMode("add");
    setEditId(null);
    setShowModal(true);
    setError("");
  };
  const openEditModal = (member) => {
    setForm({
      name: member.name,
      email: member.email,
      password: "", // don't show password
      membership_date: member.membership_date ? member.membership_date.slice(0,10) : "",
      phone: member.phone,
    });
    setModalMode("edit");
    setEditId(member.id);
    setShowModal(true);
    setError("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || (!form.password && modalMode === "add") || !form.membership_date || !form.phone) {
      setError("All fields are required.");
      return;
    }
    const payload = { ...form };
    if (modalMode === "edit" && !payload.password) delete payload.password;
    const url = modalMode === "add" ? "/api/users" : `/api/users/${editId}`;
    const method = modalMode === "add" ? "POST" : "PUT";
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowModal(false);
      fetchMembers();
    } else {
      const data = await res.json();
      setError(data.message || "Failed to save member.");
    }
  };

  // Delete member
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    });
    if (res.ok) fetchMembers();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-teal-600 pixel-font drop-shadow-[2px_2px_0_#000]">
        Member Management
      </h1>
      <button
        className="bg-[#ffffdd] text-[#134e4a] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] pixel-font text-lg font-normal transition-all duration-200 hover:text-[#29b9b9] focus:outline-none py-3 px-4 mb-6 hover:border-[#29b9b9] hover:scale-105"
        onClick={openAddModal}
      >
        Add Member
      </button>
      <div className="overflow-x-auto w-full max-w-3xl">
        <table className="min-w-full bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] text-black">
          <thead>
            <tr className="bg-[#ffffdd] border-b-2 border-black pixel-font text-lg text-black">
              <th className="px-4 py-2 border-r border-black">ID</th>
              <th className="px-4 py-2 border-r border-black">Name</th>
              <th className="px-4 py-2 border-r border-black">Email</th>
              <th className="px-4 py-2 border-r border-black">Membership Date</th>
              <th className="px-4 py-2 border-r border-black">Phone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className="border-b border-black pixel-font text-base text-black">
                <td className="px-4 py-2 border-r border-black">{member.id}</td>
                <td className="px-4 py-2 border-r border-black">{member.name}</td>
                <td className="px-4 py-2 border-r border-black">{member.email}</td>
                <td className="px-4 py-2 border-r border-black">{member.membership_date?.slice(0,10)}</td>
                <td className="px-4 py-2 border-r border-black">{member.phone}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-300 border-2 border-black rounded px-2 py-1 pixel-font shadow hover:scale-105 transition text-black"
                    onClick={() => openEditModal(member)}
                  >Edit</button>
                  <button
                    className="bg-red-400 border-2 border-black rounded px-2 py-1 pixel-font shadow hover:scale-105 transition text-black"
                    onClick={() => handleDelete(member.id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 text-black">
            <h2 className="pixel-font text-2xl mb-2 text-black">{modalMode === "add" ? "Add Member" : "Edit Member"}</h2>
            <label className="pixel-font text-black">Name:</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="border p-2 rounded text-black"
              required
            />
            <label className="pixel-font text-black">Email:</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="border p-2 rounded text-black"
              required
            />
            <label className="pixel-font text-black">Password:</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="border p-2 rounded text-black"
              required={modalMode === "add"}
              placeholder={modalMode === "edit" ? "Leave blank to keep current password" : ""}
            />
            <label className="pixel-font text-black">Membership Date:</label>
            <input
              type="date"
              value={form.membership_date}
              onChange={e => setForm(f => ({ ...f, membership_date: e.target.value }))}
              className="border p-2 rounded text-black"
              required
            />
            <label className="pixel-font text-black">Phone:</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="border p-2 rounded text-black"
              required
            />
            {error && <div className="text-red-500 pixel-font text-black">{error}</div>}
            <button type="submit" className="bg-yellow-300 border-2 border-black rounded px-4 py-2 pixel-font shadow hover:scale-105 transition text-black">{modalMode === "add" ? "Add" : "Save"}</button>
          </form>
        </Modal>
      )}
    </main>
  );
}
