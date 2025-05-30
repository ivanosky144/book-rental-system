import db from '../models/index.js';

const Publisher = db.Publisher;

export const createPublisher = async (req, res) => {
  try {
    const { name, address, website } = req.body;
    const publisher = await Publisher.create({ name, address, website });
    res.status(201).json({ message: "Publisher created successfully", data: publisher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create publisher", error });
  }
};

export const getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.findAll();
    res.status(200).json({ message: "Publishers retrieved successfully", data: publishers });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve publishers", error });
  }
};

export const getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findByPk(req.params.id);
    if (publisher) {
      return res.status(200).json({ message: "Publisher retrieved successfully", data: publisher });
    }
    res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve publisher", error });
  }
};

export const updatePublisher = async (req, res) => {
  try {
    const { name, address, website } = req.body;
    const [updated] = await Publisher.update(
      { name, address, website },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedPublisher = await Publisher.findByPk(req.params.id);
      return res.status(200).json({ message: "Publisher updated successfully", data: updatedPublisher });
    }
    res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update publisher", error });
  }
};

export const deletePublisher = async (req, res) => {
  try {
    const deleted = await Publisher.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Publisher deleted successfully" });
    }
    res.status(404).json({ message: "Publisher not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete publisher", error });
  }
};
