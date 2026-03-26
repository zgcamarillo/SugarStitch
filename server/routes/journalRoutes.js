const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const { protect } = require('../middleware/authMiddleware')
const {
  saveJournalEntry,
  getJournalEntries,
  deleteJournalEntry,
  updateDailyGoal,
} = require('../controllers/journalController')

router.post('/', protect, upload.single('image'), saveJournalEntry)
router.get('/', protect, getJournalEntries)
router.delete('/:entryId', protect, deleteJournalEntry)
router.patch('/goal', protect, updateDailyGoal)

module.exports = router