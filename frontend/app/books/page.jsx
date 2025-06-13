"use client";
import React, { useEffect, useState } from 'react';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status

    // Search/filter state
    const [search, setSearch] = useState({ title: '', genre: '' });

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
        if (filters.genre) {
            // Cari genre id dari nama genre
            const selectedGenre = genres.find(g => g.name === filters.genre);
            if (selectedGenre) {
                params.append('genre', selectedGenre.id);
            }
        }
        const url = params.toString()
            ? `${apiURI}api/books?${params.toString()}`
            : `${apiURI}api/books`;
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

    // State for dropdowns/multiselects
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    // Fetch genres, authors, publishers for the form
    useEffect(() => {
        fetch(`${apiURI}api/genres`)
            .then(res => res.json())
            .then(data => setGenres(Array.isArray(data.data) ? data.data : []));
        fetch(`${apiURI}api/authors`)
            .then(res => res.json())
            .then(data => setAuthors(Array.isArray(data.data) ? data.data : []));
        fetch(`${apiURI}api/publishers`)
            .then(res => res.json())
            .then(data => setPublishers(Array.isArray(data.data) ? data.data : []));
    }, []);

    // Add genre_ids and author_ids to form state
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

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
        const payload = {
            ...form,
            genre_ids: selectedGenres,
            author_ids: selectedAuthors,
        };
        if (isEditing) {
            // Update
            const res = await fetch(`${apiURI}api/books/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            success = res.ok;
        } else {
            // Create
            const res = await fetch(`${apiURI}api/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
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
        setSelectedGenres(book.genres ? book.genres.map(g => g.id) : []);
        setSelectedAuthors(book.authors ? book.authors.map(a => a.id) : []);
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
        await fetch(`${apiURI}api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        setBooks(books.filter(b => b.id !== id));
    };

    // Multi-step modal state
    const [modalStep, setModalStep] = useState(1);

    // Reset modal state on open/close
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
        setSelectedGenres([]);
        setSelectedAuthors([]);
        setIsEditing(false);
        setEditId(null);
        setShowModal(true);
        setModalStep(1);
    };

    // State for detail modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailBook, setDetailBook] = useState(null);

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
                <select
                    value={search.genre}
                    onChange={e => setSearch(s => ({ ...s, genre: e.target.value }))
                    }
                    className="p-2 border rounded w-48"
                >
                    <option value="">All Genres</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={() => { setSearch({ title: '', genre: '' }); fetchBooks(); }}
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
                            {modalStep === 1 && (
                                <>
                                    <label className="block mb-2 font-semibold">Select Genres</label>
                                    <select
                                        multiple
                                        value={selectedGenres}
                                        onChange={e => setSelectedGenres(Array.from(e.target.selectedOptions, o => Number(o.value)))}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    >
                                        {genres.map(g => (
                                            <option key={g.id} value={g.id}>{g.name}</option>
                                        ))}
                                    </select>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                                            onClick={() => setModalStep(2)}
                                            disabled={selectedGenres.length === 0}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                            {modalStep === 2 && (
                                <>
                                    <label className="block mb-1 font-semibold">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    />
                                    <label className="block mb-1 font-semibold">Publication Year</label>
                                    <input
                                        type="text"
                                        name="publication_year"
                                        placeholder="Publication Year"
                                        value={form.publication_year}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    />
                                    <label className="block mb-1 font-semibold">ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        placeholder="ISBN"
                                        value={form.isbn}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    />
                                    <label className="block mb-1 font-semibold">Cover Image URL</label>
                                    <input
                                        type="text"
                                        name="cover_image_url"
                                        placeholder="Cover Image URL"
                                        value={form.cover_image_url}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    />
                                    <label className="block mb-1 font-semibold">Summary</label>
                                    <textarea
                                        name="summary"
                                        placeholder="Summary"
                                        value={form.summary}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    />
                                    <label className="block mb-2 font-semibold">Select Author</label>
                                    <select
                                        value={selectedAuthors[0] || ''}
                                        onChange={e => setSelectedAuthors(e.target.value ? [Number(e.target.value)] : [])}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select Author</option>
                                        {authors.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                    <label className="block mb-2 font-semibold">Publisher</label>
                                    <select
                                        name="publisher_id"
                                        value={form.publisher_id}
                                        onChange={handleChange}
                                        className="block w-full mb-3 p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select Publisher</option>
                                        {publishers.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                    <div className="flex justify-between gap-2">
                                        <button
                                            type="button"
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                            onClick={() => setModalStep(1)}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                                        >
                                            {isEditing ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                </>
                            )}
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
                        <div
                            key={book.id}
                            className="bg-white shadow-lg rounded-xl flex flex-col items-center p-6 relative group transition-all duration-200 hover:shadow-2xl min-h-[370px] max-w-xs mx-auto w-full"
                            style={{ cursor: 'pointer' }}
                            onClick={() => { setDetailBook(book); setShowDetailModal(true); }}
                        >
                            <div className="flex flex-col items-center w-full">
                                <div className="w-[160px] h-[220px] flex items-center justify-center mb-4 overflow-hidden rounded border border-gray-200 bg-gray-50">
                                    <img
                                        src={book.cover_image_url}
                                        alt={book.title}
                                        className="object-cover w-full h-full"
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 text-center mb-4 min-h-[56px] flex items-center justify-center leading-tight break-words">
                                    {book.title}
                                </h3>
                            </div>
                            <div className="flex flex-row gap-4 mt-auto w-full justify-center pt-2 border-t border-gray-100">
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={e => { e.stopPropagation(); handleEdit(book); }}
                                            className="text-blue-600 font-semibold hover:underline focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={e => { e.stopPropagation(); handleDelete(book.id); }}
                                            className="text-red-600 font-semibold hover:underline focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                <a
                                    href="/rent"
                                    className="text-amber-600 font-semibold hover:underline ml-2 focus:outline-none"
                                    onClick={e => e.stopPropagation()}
                                >
                                    Rent
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showDetailModal && detailBook && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{detailBook.title}</h2>
                        <img
                            src={detailBook.cover_image_url}
                            alt={detailBook.title}
                            className="w-full h-40 object-cover rounded mb-4"
                            style={{ maxWidth: 180 }}
                        />
                        <div className="mb-2"><span className="font-semibold">Author:</span> {detailBook.authors && detailBook.authors.length > 0 ? detailBook.authors.map(a => a.name).join(', ') : (detailBook.authorName || detailBook.author || 'Unknown')}</div>
                        <div className="mb-2"><span className="font-semibold">Year:</span> {detailBook.publication_year}</div>
                        <div className="mb-2"><span className="font-semibold">ISBN:</span> {detailBook.isbn}</div>
                        <div className="mb-2"><span className="font-semibold">Publisher ID:</span> {detailBook.publisher_id}</div>
                        <div className="mb-2"><span className="font-semibold">Genre:</span> {detailBook.genres && detailBook.genres.length > 0 ? detailBook.genres.map(g => g.name).join(', ') : '-'}</div>
                        <div className="mb-2"><span className="font-semibold">Available Copies:</span> {detailBook.available_copies ?? 0}</div>
                        <div className="mb-2"><span className="font-semibold">Summary:</span> <br />{detailBook.summary}</div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Books;