"use client";
import React, { useEffect, useState } from 'react';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status

    // Search/filter state
    const [search, setSearch] = useState({ title: '', genre: '', publisher: '' });

    useEffect(() => {
        // Only run on client
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            setIsAdmin(!!token); // true jika token ada
            // Selalu fetch tanpa Authorization header untuk public view
            fetchBooks();
        }
    }, []);

    // Fetch books with optional filters
    const fetchBooks = (filters = {}) => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.genre) params.append('genre', filters.genre);
        if (filters.publisher) params.append('publisher', filters.publisher);
        const url = params.toString()
            ? `http://localhost:3000/api/books?${params.toString()}`
            : 'http://localhost:3000/api/books';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBooks(Array.isArray(data.data) ? data.data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    // State for form fields, edit mode, and modal visibility
    const [form, setForm] = useState({
        title: '',
        author: '',
        publication_year: '',
        isbn: '',
        summary: '',
        cover_image_url: '',
        publisher_id: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Create or Update book
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in as admin to add or edit books.');
            return;
        }
        let success = false;
        if (isEditing) {
            // Update
            const res = await fetch(`http://localhost:3000/api/books/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            success = res.ok;
        } else {
            // Create
            const res = await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });
            success = res.ok;
        }
        if (success) {
            setForm({
                title: '',
                author: '',
                publication_year: '',
                isbn: '',
                summary: '',
                cover_image_url: '',
                publisher_id: '',
            });
            setIsEditing(false);
            setEditId(null);
            setShowModal(false);
            setLoading(true);
            // Always fetch book list WITHOUT Authorization header
            fetchBooks();
        } else {
            // .... // Handle error case
            setForm({
                title: '',
                author: '',
                publication_year: '',
                isbn: '',
                summary: '',
                cover_image_url: '',
                publisher_id: '',
            });
            setIsEditing(false);
            setEditId(null);
            setShowModal(false);
            setLoading(true);
            // Always fetch book list WITHOUT Authorization header
            fetchBooks();
        }
    };

    // Edit book
    const handleEdit = (book) => {
        setForm({
            title: book.title,
            author: book.authorName || book.author || '',
            publication_year: book.publication_year || '',
            isbn: book.isbn || '',
            summary: book.summary || '',
            cover_image_url: book.cover_image_url || '',
            publisher_id: book.publisher_id ? String(book.publisher_id) : '',
        });
        setIsEditing(true);
        setEditId(book.id);
        setShowModal(true);
    };

    // Delete book
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in as admin to delete books.');
            return;
        }
        await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setBooks(books.filter(b => b.id !== id));
    };

    // Open modal for adding new book
    const handleAddBook = () => {
        setForm({
            title: '',
            author: '',
            publication_year: '',
            isbn: '',
            summary: '',
            cover_image_url: '',
            publisher_id: '',
        });
        setIsEditing(false);
        setEditId(null);
        setShowModal(true);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-200 text-black">
            {/* Books Section */}
            <div className="w-full max-w-3xl text-center mb-12">
                <h1 className="text-6xl font-extrabold mb-4 text-teal-500 pixel-font">
                    Books Collection
                </h1>
                <p className="text-2xl text-gray-700 pixel-font">
                    Browse our curated collection of books available for rent.
                </p>
            </div>

            {/* Search/Filter Form */}
            <form
                className="flex flex-wrap gap-4 mb-8 w-full max-w-3xl justify-center"
                onSubmit={e => {
                    e.preventDefault();
                    fetchBooks(search);
                }}
            >
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search.title}
                    onChange={e => setSearch(s => ({ ...s, title: e.target.value }))}
                    className="p-2 border rounded w-48"
                />
                <input
                    type="text"
                    placeholder="Search by genre"
                    value={search.genre}
                    onChange={e => setSearch(s => ({ ...s, genre: e.target.value }))}
                    className="p-2 border rounded w-48"
                />
                <input
                    type="text"
                    placeholder="Search by publisher ID"
                    value={search.publisher}
                    onChange={e => setSearch(s => ({ ...s, publisher: e.target.value }))}
                    className="p-2 border rounded w-48"
                />
                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => { setSearch({ title: '', genre: '', publisher: '' }); fetchBooks(); }}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                    Reset
                </button>
            </form>

            {/* Add Book Button - Shown only to admins */}
            {isAdmin && (
                <button
                    onClick={handleAddBook}
                    className="mb-8 bg-teal-500 text-white px-6 py-3 rounded font-bold hover:bg-teal-600"
                >
                    Add New Book
                </button>
            )}

            {/* Modal for CRUD Form */}
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
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={form.author}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="publication_year"
                                placeholder="Publication Year"
                                value={form.publication_year}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={form.isbn}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="cover_image_url"
                                placeholder="Cover Image URL"
                                value={form.cover_image_url}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <input
                                type="number"
                                name="publisher_id"
                                placeholder="Publisher ID"
                                value={form.publisher_id}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <textarea
                                name="summary"
                                placeholder="Summary"
                                value={form.summary}
                                onChange={handleChange}
                                className="block w-full mb-3 p-2 border rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mr-2"
                            >
                                {isEditing ? 'Update' : 'Add'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setForm({
                                        title: '',
                                        author: '',
                                        publication_year: '',
                                        isbn: '',
                                        summary: '',
                                        cover_image_url: '',
                                        publisher_id: '',
                                    });
                                    setEditId(null);
                                    setShowModal(false);
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Book Listings Section */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
                {loading ? (
    <div className="col-span-full text-center text-lg">Loading...</div>
) : !books || books.length === 0 ? (
    <div className="col-span-full text-center text-lg">No books found.</div>
) : (
    books.map(book => (
                        <div key={book.id} className="card bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-2xl font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-gray-600">Author: {book.authorName || book.author || 'Unknown'}</p>
                            <p className="text-gray-600">Year: {book.publication_year}</p>
                            <p className="text-gray-600">ISBN: {book.isbn}</p>
                            <p className="text-gray-600">Publisher ID: {book.publisher_id}</p>
                            <img
                                src={book.cover_image_url}
                                alt={book.title}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                            <p className="text-gray-700 text-sm mb-2">{book.summary}</p>
                            <div className="flex gap-2 mt-4">
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                <a href="/rent" className="text-amber-500 font-medium hover:underline ml-auto">
                                    Rent this Book
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Books;