const authService = require('../services/auth.service');
const sendResponse = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    return sendResponse(res, 201, 'User registered successfully', { user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    return sendResponse(res, 200, 'Login successful', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
