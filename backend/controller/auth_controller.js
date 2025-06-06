import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Admin = db.Admin;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const adminRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const duplicateName = await Admin.findOne({ where: { name } });
    if (duplicateName) {
      return res.status(409).json({ message: 'Name already existed' });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, phone, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', data: { id: newAdmin.id, email: newAdmin.email, name: newAdmin.name } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to register admin', error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Admin logged in successfully', token, admin: { id: admin.id, name: admin.name, email: admin.email} });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
};
