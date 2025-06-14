import db from '../models/index.js';
import bcrypt from 'bcrypt';
  
const User = db.User;

export const createUser = async (req, res) => {
  try {
    const { name, email, password, membership_date, phone } = req.body;
    const user = await User.create({ name, email, password, membership_date, phone });
    res.status(201).json({message: "User has been created successfully", data: user});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to create user", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json({message: "Users has been retrieved successfully", data: users});
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) return res.json({message: "User has been retrieved successfully", data: user});
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, membership_date, phone } = req.body;
    const [updated] = await User.update(
      { name, email, password, membership_date, phone },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(201).json({message: "User has been updated successfully", data: updatedUser});
    }
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) return res.status(201).json({message: "User has been deleted successfully"});
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};


