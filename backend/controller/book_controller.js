import db from '../models/index.js';

const Book = db.books;

export const createBook = async (req, res) => {
  try {
    const { title, publication_year, isbn, summary, cover_image_url, publisher_id } = req.body;
    const book = await Book.create({
      title,
      publication_year,
      isbn,
      summary,
      cover_image_url,
      publisher_id,
    });
    res.status(201).json({ message: "Book has been created successfully", data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create book", error });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ message: "Books have been retrieved successfully", data: books });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books", error });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      return res.status(200).json({ message: "Book has been retrieved successfully", data: book });
    }
    res.status(404).json({ message: "Book not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book", error });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, publication_year, isbn, summary, cover_image_url, publisher_id } = req.body;
    const [updated] = await Book.update(
      { title, publication_year, isbn, summary, cover_image_url, publisher_id },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
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
