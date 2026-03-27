const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const {
  generatePattern,
  updatePatternStep,
  getUserPatterns,
  getPatternById,
  deletePattern,
} = require('../controllers/patternController')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, upload.single('image'), generatePattern)
router.get('/', protect, getUserPatterns)
router.patch('/:patternId/steps/:stepId', protect, updatePatternStep)
router.get('/:patternId', protect, getPatternById)
router.delete('/:patternId', protect, deletePattern)

module.exports = router