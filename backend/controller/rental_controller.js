import db from '../models/index.js';

const Rental = db.Rental;

export const createRental = async (req, res) => {
  try {
    const { user_id, book_copy_id, rental_date, due_date, return_date, status } = req.body;
    const rental = await Rental.create({
      user_id,
      book_copy_id,
      rental_date,
      due_date,
      return_date,
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
    const rentals = await Rental.findAll();
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
