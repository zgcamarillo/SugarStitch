const express = require('express')
const router = express.Router()
const { generatePattern } = require('../controllers/patternController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, generatePattern)

module.exports = router