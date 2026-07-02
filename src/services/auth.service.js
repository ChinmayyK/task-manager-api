const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../models/prismaClient');
const AppError = require('../utils/AppError');

const registerUser = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email is already in use', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

module.exports = {
  registerUser,
  loginUser,
};
