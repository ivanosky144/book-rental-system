"use client";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function RentPage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [rentalSuccess, setRentalSuccess] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.data || []));
  }, []);

  const handleRent = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setRentalSuccess(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRentalSuccess(null);
    if (!userId) {
      setError("Please enter your member ID.");
      return;
    }
    // Find available copy (for demo, just use book.id as book_copy_id)
    const rentalData = {
      user_id: userId,
      book_copy_id: selectedBook.id, // adjust if you have real book_copy_id
      rental_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      status: "active",
    };
    try {
      const res = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      });
      const data = await res.json();
      if (res.ok) {
        setRentalSuccess("Rental successful!");
        setShowModal(false);
      } else {
        setError(data.message || "Failed to rent book.");
      }
    } catch (err) {
      setError("Failed to rent book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl pixel-font mb-6 text-center">Rent a Book</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] p-4 flex flex-col items-center">
            <h2 className="pixel-font text-xl mb-2">{book.title}</h2>
            <p className="mb-2">by {book.author_name || "Unknown"}</p>
            <button
              className="bg-yellow-300 border-2 border-black rounded px-4 py-2 pixel-font shadow hover:scale-105 transition"
              onClick={() => handleRent(book)}
            >
              Rent
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <h2 className="pixel-font text-2xl mb-2">Rent: {selectedBook?.title}</h2>
            <label className="pixel-font">Member ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border p-2 rounded"
              required
            />
            {error && <div className="text-red-500 pixel-font">{error}</div>}
            <button type="submit" className="bg-yellow-300 border-2 border-black rounded px-4 py-2 pixel-font shadow hover:scale-105 transition">Confirm Rental</button>
          </form>
        </Modal>
      )}
      {rentalSuccess && <div className="text-green-600 pixel-font mt-4 text-center">{rentalSuccess}</div>}
    </div>
  );
}
