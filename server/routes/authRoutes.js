const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authControllers')

const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/me', protect, getCurrentUser)

module.exports = router