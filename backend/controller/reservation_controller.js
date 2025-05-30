import db from '../models/index.js';

const Reservation = db.Reservation;

export const createReservation = async (req, res) => {
  try {
    const { user_id, book_id, reservation_date, status } = req.body;
    const reservation = await Reservation.create({
      user_id,
      book_id,
      reservation_date,
      status,
    });
    res.status(201).json({ message: "Reservation created successfully", data: reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create reservation", error });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json({ message: "Reservations retrieved successfully", data: reservations });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservations", error });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      return res.status(200).json({ message: "Reservation retrieved successfully", data: reservation });
    }
    res.status(404).json({ message: "Reservation not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reservation", error });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { user_id, book_id, reservation_date, status } = req.body;
    const [updated] = await Reservation.update(
      { user_id, book_id, reservation_date, status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedReservation = await Reservation.findByPk(req.params.id);
      return res.status(200).json({ message: "Reservation updated successfully", data: updatedReservation });
    }
    res.status(404).json({ message: "Reservation not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update reservation", error });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Reservation deleted successfully" });
    }
    res.status(404).json({ message: "Reservation not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reservation", error });
  }
};
