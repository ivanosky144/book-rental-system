import db from '../models/index.js';

const Book = db.Book;
const BookGenre = db.BookGenre;
const BookAuthor = db.BookAuthor;
const sequelize = db.sequelize;


export const createBook = async (req, res) => {
  try {
    const { title, publication_year, isbn, summary, cover_image_url, publisher_id, genre_ids, author_ids } = req.body;
    const book = await Book.create({
      title,
      publication_year,
      isbn,
      summary,
      cover_image_url,
      publisher_id,
    });

    await Promise.all(
      genre_ids.map(id => BookGenre.create({
        book_id: book.id,
        genre_id: id,  
      }))
    );

    await Promise.all(
      author_ids.map(id => BookAuthor.create({
        book_id: book.id,
        author_id: id,  
      }))
    );

    res.status(201).json({ message: "Book has been created successfully", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create book", error });
  }
};

// GET /api/books?title=...&genre=...&publisher=...
export const getAllBooks = async (req, res) => {
  try {
    const { title, genre, publisher } = req.query;
    const db = req.app.get('models') || (await import('../models/index.js')).default;
    const Book = db.Book;
    const Author = db.Author;
    const Genre = db.Genre;
    const Publisher = db.Publisher;
    const BookGenre = db.BookGenre;
    const BookAuthor = db.BookAuthor;
    const BookCopy = db.BookCopy;

    // Build query options
    let where = {};
    if (title) {
      where.title = { [db.Sequelize.Op.iLike]: `%${title}%` };
    }
    if (publisher) {
      where.publisher_id = publisher;
    }
    // Include genre filter
    let include = [
      { model: Author, as: 'authors', through: { attributes: [] } },
      { model: Publisher, as: 'publisher' },
      { model: Genre, as: 'genres', through: { attributes: [] } },
    ];
    if (genre) {
      // Jika genre berupa id, filter by id, jika string, filter by name
      if (!isNaN(Number(genre))) {
        include[2].where = { id: Number(genre) };
      } else {
        include[2].where = { name: { [db.Sequelize.Op.iLike]: `%${genre}%` } };
      }
    }

    // Ambil semua buku
    const books = await Book.findAll({
      where,
      include,
    });

    // Ambil jumlah copy tersedia untuk setiap buku
    const bookIds = books.map(b => b.id);
    const copies = await BookCopy.findAll({
      where: {
        book_id: bookIds,
        status: 'available',
      },
      attributes: ['book_id', [sequelize.fn('COUNT', sequelize.col('id')), 'available_copies']],
      group: ['book_id'],
      raw: true,
    });
    const copyMap = {};
    copies.forEach(c => {
      copyMap[c.book_id] = parseInt(c.available_copies, 10);
    });

    // Tambahkan field available_copies ke setiap buku
    const booksWithCopies = books.map(b => {
      const book = b.toJSON();
      book.available_copies = copyMap[b.id] || 0;
      return book;
    });

    res.json({ data: booksWithCopies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        b.id,
        b.title,
        b.summary,
        b.isbn,
        b.publication_year,
        b.created_at AS "createdAt",
        b.updated_at AS "updatedAt",

        COALESCE(
          JSON_AGG(DISTINCT jsonb_build_object('id', a.id, 'name', a.name))
          FILTER (WHERE a.id IS NOT NULL),
          '[]'
        ) AS authors,

        COALESCE(
          JSON_AGG(DISTINCT jsonb_build_object('id', g.id, 'name', g.name))
          FILTER (WHERE g.id IS NOT NULL),
          '[]'
        ) AS genres

      FROM books b
      LEFT JOIN book_authors ba ON b.id = ba.book_id
      LEFT JOIN authors a ON ba.author_id = a.id
      LEFT JOIN book_genres bg ON b.id = bg.book_id
      LEFT JOIN genres g ON bg.genre_id = g.id
      WHERE b.id = :id
      GROUP BY b.id;
    `, {
      replacements: { id: req.params.id },
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book has been retrieved successfully", data: results[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve book", error: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { title, publication_year, isbn, summary, cover_image_url, publisher_id, genre_ids, author_ids } = req.body;
    const [updated] = await Book.update(
      { title, publication_year, isbn, summary, cover_image_url, publisher_id },
      { where: { id: req.params.id } }
    );
    if (updated) {
      // Update genres and authors relations if provided
      if (Array.isArray(genre_ids)) {
        await BookGenre.destroy({ where: { book_id: req.params.id } });
        await Promise.all(
          genre_ids.map(id => BookGenre.create({ book_id: req.params.id, genre_id: id }))
        );
      }
      if (Array.isArray(author_ids)) {
        await BookAuthor.destroy({ where: { book_id: req.params.id } });
        await Promise.all(
          author_ids.map(id => BookAuthor.create({ book_id: req.params.id, author_id: id }))
        );
      }
      // Return book with relations
      const updatedBook = await Book.findByPk(req.params.id, {
        include: [
          { model: db.Author, as: 'authors', through: { attributes: [] } },
          { model: db.Genre, as: 'genres', through: { attributes: [] } },
          { model: db.Publisher, as: 'publisher' },
        ],
      });
      return res.status(200).json({ message: "Book has been updated successfully", data: updatedBook });
    }
    res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Book has been deleted successfully" });
    }
    res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error });
  }
};
