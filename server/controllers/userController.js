import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user.email, user._id);

      res.status(201).json({ user, token });
    }
    //TODO: else and dont return user password
  } catch (error) {
    res.status(500).json({ message: 'Somethong went wrong' });
    console.log(error);
  }
};

export { signup };
