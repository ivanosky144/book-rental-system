"use client";
import React, { useEffect, useState } from "react";

export default function BookCopyManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [copyCount, setCopyCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiURI}api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoading(false));
  }, []);

  const refreshBooks = () => {
    setLoading(true);
    fetch(`${apiURI}api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoading(false));
  };

  const handleEditCopies = (book) => {
    setEditBook(book);
    setCopyCount(book.available_copies ?? 0);
    setShowModal(true);
  };

  const handleSaveCopies = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to edit book copies.");
      return;
    }
    const diff = copyCount - (editBook.available_copies ?? 0);
    if (diff === 0) {
      setShowModal(false);
      return;
    }
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        await fetch(`${apiURI}api/book-copies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ book_id: editBook.id, status: "available", location: "-" }),
        });
      }
    } else if (diff < 0) {
      const res = await fetch(`${apiURI}api/book-copies`);
      const data = await res.json();
      const availableCopies = (Array.isArray(data.data) ? data.data : []).filter(
        (c) => c.book_id === editBook.id && c.status === "available"
      );
      const toDelete = availableCopies.slice(0, Math.abs(diff));
      for (const copy of toDelete) {
        await fetch(`${apiURI}api/book-copies/${copy.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    }
    setShowModal(false);
    refreshBooks();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-teal-600">Book Copy Management</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {loading ? (
          <div className="col-span-full text-center text-lg">Loading...</div>
        ) : !books || books.length === 0 ? (
          <div className="col-span-full text-center text-lg">No books found.</div>
        ) : (
          books.map((book) => (
            <div key={book.id} className="card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600">Available: {book.available_copies ?? 0} copies</p>
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditCopies(book)}
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Edit Copies
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Book Copies</h2>
            <form onSubmit={handleSaveCopies}>
              <label className="block mb-2 font-semibold">Book Title</label>
              <div className="mb-3 p-2 border rounded bg-gray-100">{editBook?.title}</div>
              <label className="block mb-2 font-semibold">Available Copies</label>
              <input
                type="number"
                min="0"
                value={copyCount}
                onChange={(e) => setCopyCount(Number(e.target.value))}
                className="block w-full mb-3 p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
