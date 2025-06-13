import db from '../models/index.js';

const Rental = db.Rental;

export const createRental = async (req, res) => {
  try {
    const { user_id, book_copy_id, rental_date, due_date, return_date, status } = req.body;
    // Check if book_copy exists and is available
    const BookCopy = db.BookCopy;
    const copy = await BookCopy.findByPk(book_copy_id);
    if (!copy) return res.status(404).json({ message: 'Book copy not found' });
    if (copy.status !== 'available') return res.status(400).json({ message: 'Book copy is not available' });
    // Set book copy to checked_out
    await copy.update({ status: 'checked_out' });
    // Only set return_date if provided, otherwise leave as null
    const rental = await Rental.create({
      user_id,
      book_copy_id,
      rental_date,
      due_date,
      return_date: return_date || null,
      status,
    });
    res.status(201).json({ message: "Rental created successfully", data: rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create rental", error });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    let rentals;
    if (req.query.user_id) {
      rentals = await Rental.findAll({ where: { user_id: req.query.user_id } });
    } else {
      rentals = await Rental.findAll();
    }
    res.status(200).json({ message: "Rentals retrieved successfully", data: rentals });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve rentals", error });
  }
};

export const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (rental) {
      return res.status(200).json({ message: "Rental retrieved successfully", data: rental });
    }
    res.status(404).json({ message: "Rental not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve rental", error });
  }
};

export const updateRental = async (req, res) => {
  try {
    const { user_id, book_copy_id, rental_date, due_date, return_date, status } = req.body;
    const [updated] = await Rental.update(
      { user_id, book_copy_id, rental_date, due_date, return_date, status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedRental = await Rental.findByPk(req.params.id);
      // If return_date is set (book returned), set book copy to available
      if (return_date && book_copy_id) {
        const BookCopy = db.BookCopy;
        const copy = await BookCopy.findByPk(book_copy_id);
        if (copy && copy.status !== 'available') await copy.update({ status: 'available' });
      }
      return res.status(200).json({ message: "Rental updated successfully", data: updatedRental });
    }
    res.status(404).json({ message: "Rental not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update rental", error });
  }
};

export const deleteRental = async (req, res) => {
  try {
    const deleted = await Rental.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Rental deleted successfully" });
    }
    res.status(404).json({ message: "Rental not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete rental", error });
  }
};
