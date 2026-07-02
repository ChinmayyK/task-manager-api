const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Example of a protected route to get current user details
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

module.exports = router;
