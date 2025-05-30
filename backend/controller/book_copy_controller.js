import db from '../models/index.js';

const BookCopy = db.BookCopy;

export const createBookCopy = async (req, res) => {
  try {
    const { book_id, status, location } = req.body;
    const bookCopy = await BookCopy.create({ book_id, status, location });
    res.status(201).json({ message: "Book copy created successfully", data: bookCopy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create book copy", error });
  }
};

export const getAllBookCopies = async (req, res) => {
  try {
    const bookCopies = await BookCopy.findAll();
    res.status(200).json({ message: "Book copies retrieved successfully", data: bookCopies });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book copies", error });
  }
};

export const getBookCopyById = async (req, res) => {
  try {
    const bookCopy = await BookCopy.findByPk(req.params.id);
    if (bookCopy) {
      return res.status(200).json({ message: "Book copy retrieved successfully", data: bookCopy });
    }
    res.status(404).json({ message: "Book copy not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book copy", error });
  }
};

export const updateBookCopy = async (req, res) => {
  try {
    const { book_id, status, location } = req.body;
    const [updated] = await BookCopy.update(
      { book_id, status, location },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedCopy = await BookCopy.findByPk(req.params.id);
      return res.status(200).json({ message: "Book copy updated successfully", data: updatedCopy });
    }
    res.status(404).json({ message: "Book copy not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update book copy", error });
  }
};

export const deleteBookCopy = async (req, res) => {
  try {
    const deleted = await BookCopy.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Book copy deleted successfully" });
    }
    res.status(404).json({ message: "Book copy not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book copy", error });
  }
};
