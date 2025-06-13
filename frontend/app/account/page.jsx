"use client";
import { useState } from "react";
import Modal from "../components/Modal";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [rentals, setRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);
  const [bookTitles, setBookTitles] = useState({});
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(""); // New state for password

  // Fetch member info and rentals
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRentals([]);
    setMemberInfo(null);
    setBookTitles({});
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      // Login user (POST email & password)
      const loginRes = await fetch(`/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (loginRes.status === 401) {
        setError("Password salah. Silakan coba lagi.");
        setLoading(false);
        return;
      }
      if (loginRes.status === 404) {
        setError("Member tidak ditemukan.");
        setLoading(false);
        return;
      }
      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.message || "Login gagal");
      setMemberInfo(loginData.user); // <-- fix: use .user not .data
      setShowModal(false);
      // Fetch rentals (tanpa Authorization)
      const res = await fetch(`/api/rentals?user_id=${loginData.user.id}`); // <-- fix: use .user.id
      const data = await res.json();
      if (res.ok) {
        setRentals(data.data || []);
        // Fetch book titles for all rentals
        const copyIds = [...new Set((data.data || []).map((r) => r.book_copy_id))];
        const copyIdToBookId = {};
        const bookIdSet = new Set();
        // Fetch all book copies in parallel (NO Authorization header)
        await Promise.all(
          copyIds.map(async (copyId) => {
            console.log("fetching", `/api/book-copies/${copyId}`);
            const copyRes = await fetch(`/api/book-copies/${copyId}`);
            if (!copyRes.ok) {
              console.error(`Failed to fetch book copy ${copyId}:`, copyRes.status);
            }
            const copyData = await copyRes.json();
            if (copyRes.ok && copyData.data) {
              copyIdToBookId[copyId] = copyData.data.book_id;
              bookIdSet.add(copyData.data.book_id);
            }
          })
        );
        // Fetch all books in parallel (NO Authorization header)
        const bookIdArr = Array.from(bookIdSet);
        const idToTitle = {};
        await Promise.all(
          bookIdArr.map(async (bookId) => {
            console.log("fetching", `/api/books/${bookId}`);
            const bookRes = await fetch(`/api/books/${bookId}`);
            if (!bookRes.ok) {
              console.error(`Failed to fetch book ${bookId}:`, bookRes.status);
            }
            const bookData = await bookRes.json();
            if (bookRes.ok && bookData.data) {
              idToTitle[bookId] = bookData.data.title;
            }
          })
        );
        // Map book_copy_id to title
        const titles = {};
        for (const copyId of copyIds) {
          const bookId = copyIdToBookId[copyId];
          titles[copyId] = idToTitle[bookId] || "-";
        }
        setBookTitles(titles);
      } else {
        setError(data.message || "Failed to fetch rentals.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch rentals.");
    }
    setLoading(false);
  };

  // Handle return book
  const handleReturn = async (rental) => {
    if (!window.confirm("Return this book?")) return;
    try {
      // Try PUT with Content-Type header SAJA (tanpa Authorization)
      console.log("fetching", `/api/rentals/${rental.id}`);
      const res = await fetch(`/api/rentals/${rental.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          return_date: new Date().toISOString(),
          status: "completed",
          book_copy_id: rental.book_copy_id // <-- crucial for backend to update book copy status
        }),
      });
      if (res.ok) {
        // Trigger refresh for /books page via localStorage event
        localStorage.setItem('books_refresh', Date.now().toString());
        handleSubmit({ preventDefault: () => {} });
      } else {
        const data = await res.json();
        alert(data.message || "Failed to return book.");
      }
    } catch (err) {
      alert("Failed to return book.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-teal-600 pixel-font drop-shadow-[2px_2px_0_#000]">
        My Rentals
      </h1>
      <button
        className="bg-[#ffffdd] text-[#134e4a] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] pixel-font text-lg font-normal transition-all duration-200 hover:text-[#29b9b9] focus:outline-none py-3 px-4 mb-6 hover:border-[#29b9b9] hover:scale-105"
        onClick={() => setShowModal(true)}
      >
        Input Member Credentials
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <label className="pixel-font text-black">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded text-black"
              required
            />
            <label className="pixel-font text-black">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded text-black"
              required
            />
            {error && <div className="text-red-500 pixel-font">{error}</div>}
            <button type="submit" className="bg-yellow-300 border-2 border-black rounded px-4 py-2 pixel-font shadow hover:scale-105 transition text-black">
              Show Rentals
            </button>
          </form>
        </Modal>
      )}
      {loading && <div className="pixel-font text-lg mb-4">Loading...</div>}
      {/* Show table if memberInfo is present, even if rentals is empty */}
      {memberInfo && (
        <>
          <div className="mb-6 w-full max-w-3xl bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] p-4 text-black">
            <div className="pixel-font text-xl mb-2">Member Info</div>
            <div className="pixel-font">
              Name: <span className="font-bold">{memberInfo.name}</span>
            </div>
            <div className="pixel-font">
              Email: <span className="font-bold">{memberInfo.email}</span>
            </div>
            <div className="pixel-font">
              Membership Date: <span className="font-bold">{memberInfo.membership_date?.slice(0, 10)}</span>
            </div>
            <div className="pixel-font">
              Phone: <span className="font-bold">{memberInfo.phone}</span>
            </div>
          </div>
          <div className="mt-6 w-full max-w-3xl">
            <table className="min-w-full bg-[#ffffdd] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] text-black text-xs">
              <thead>
                <tr className="bg-[#ffffdd] border-b-2 border-black pixel-font text-base text-black">
                  <th className="px-2 py-1 border-r border-black">Book Title</th>
                  <th className="px-2 py-1 border-r border-black">Book Copy ID</th>
                  <th className="px-2 py-1 border-r border-black">Rental Date</th>
                  <th className="px-2 py-1 border-r border-black">Due Date</th>
                  <th className="px-2 py-1 border-r border-black">Return Date</th>
                  <th className="px-2 py-1 border-r border-black">Status</th>
                  <th className="px-2 py-1 border-r border-black">Fee</th>
                  <th className="px-2 py-1 border-r border-black">Fine</th>
                  <th className="px-2 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {rentals.length === 0 ? (
                  <tr className="border-b border-black pixel-font text-xs text-black">
                    <td colSpan={9} className="px-2 py-4 text-center">No rentals found.</td>
                  </tr>
                ) : (
                  rentals.map((rental) => {
                    const fee = 10000;
                    let fine = 0;
                    const due = new Date(rental.due_date);
                    let ret = rental.return_date ? new Date(rental.return_date) : null;
                    let daysLate = 0;
                    if (ret) {
                      daysLate = Math.max(0, Math.ceil((ret - due) / (1000 * 60 * 60 * 24)));
                    } else {
                      const now = new Date();
                      if (now > due) {
                        daysLate = Math.max(0, Math.ceil((now - due) / (1000 * 60 * 60 * 24)));
                      }
                    }
                    fine = daysLate * 2000;
                    return (
                      <tr key={rental.id} className="border-b border-black pixel-font text-xs text-black">
                        <td className="px-2 py-1 border-r border-black">{bookTitles[rental.book_copy_id] || "-"}</td>
                        <td className="px-2 py-1 border-r border-black">{rental.book_copy_id}</td>
                        <td className="px-2 py-1 border-r border-black">{rental.rental_date?.slice(0, 10)}</td>
                        <td className="px-2 py-1 border-r border-black">{rental.due_date?.slice(0, 10)}</td>
                        <td className="px-2 py-1 border-r border-black">{rental.return_date ? rental.return_date.slice(0, 10) : "-"}</td>
                        <td className="px-2 py-1 border-r border-black">{rental.status}</td>
                        <td className="px-2 py-1 border-r border-black">Rp{fee.toLocaleString()}</td>
                        <td className="px-2 py-1 border-r border-black">{fine > 0 ? `Rp${fine.toLocaleString()}` : "-"}</td>
                        <td className="px-2 py-1">
                          {(!rental.return_date || rental.status === "active" || rental.status === "overdue") && (
                            <button
                              className="bg-green-300 border-2 border-black rounded px-1 py-0.5 pixel-font shadow hover:scale-105 transition text-black text-xs"
                              onClick={() => handleReturn(rental)}
                            >
                              Return
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
