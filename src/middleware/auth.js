const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const prisma = require('../models/prismaClient');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    
    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    
    req.user = currentUser;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  protect
};
