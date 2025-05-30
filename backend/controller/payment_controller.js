import db from '../models/index.js';

const Payment = db.Payment;

export const createPayment = async (req, res) => {
  try {
    const { user_id, rental_id, amount, payment_date, method } = req.body;
    const payment = await Payment.create({ user_id, rental_id, amount, payment_date, method });
    res.status(201).json({ message: "Payment created successfully", data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create payment", error });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ message: "Payments retrieved successfully", data: payments });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payments", error });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (payment) {
      return res.status(200).json({ message: "Payment retrieved successfully", data: payment });
    }
    res.status(404).json({ message: "Payment not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payment", error });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { user_id, rental_id, amount, payment_date, method } = req.body;
    const [updated] = await Payment.update(
      { user_id, rental_id, amount, payment_date, method },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedPayment = await Payment.findByPk(req.params.id);
      return res.status(200).json({ message: "Payment updated successfully", data: updatedPayment });
    }
    res.status(404).json({ message: "Payment not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment", error });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Payment deleted successfully" });
    }
    res.status(404).json({ message: "Payment not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error });
  }
};
