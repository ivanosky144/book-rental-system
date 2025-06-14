import db from '../models/index.js';
import bcrypt from 'bcrypt';
  
const User = db.User;

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // If passwords are hashed, use bcrypt.compare. If not, use plain comparison.
      let match = false;
      if (user.password && (user.password.startsWith('$2b$') || user.password.startsWith('$2a$'))) {
        match = await bcrypt.compare(password, user.password);
      } else {
        match = password === user.password;
      }
      if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Do not return password field
      let userData;
      if (typeof user.toJSON === 'function') {
        const { password: _, ...rest } = user.toJSON();
        userData = rest;
      } else {
        const { password: _, ...rest } = user;
        userData = rest;
      }
      res.status(200).json({ message: 'Login successful', user: userData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error });
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