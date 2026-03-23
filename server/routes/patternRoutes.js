const express = require('express')
const router = express.Router()
const {
  generatePattern,
  updatePatternStep,
  getUserPatterns,
} = require('../controllers/patternController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, generatePattern)
router.get('/', protect, getUserPatterns)
router.patch('/:patternId/steps/:stepId', protect, updatePatternStep)

module.exports = router