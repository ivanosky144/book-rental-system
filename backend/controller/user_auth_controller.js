import db from '../models/index.js';
import bcrypt from 'bcrypt';
  
const User = db.User;

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid email or password' });
      const token = jwt.sign({ id: user.id, email: user.email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'User logged in successfully', token, user: { id: user.id, name: user.name, email: user.email} });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login user', error });
    }
  };



export const registerUser = async (req, res) => {
try {
    const { name, email, phone, password } = req.body;

    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const duplicateName = await User.findOne({ where: { name } });
    if (duplicateName) {
    return res.status(409).json({ message: 'Name already existed' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, phone, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', data: { id: newUser.id, email: newUser.email, name: newUser.name } });
} catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to register user', error });
}
};