// controllers/journalController.js
const JournalEntry = require('../models/JournalEntry')
const User = require('../models/User')

const saveJournalEntry = async (req, res) => {
  try {
    const { date, minutes, note } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''

    if (!date) {
      return res.status(400).json({ message: 'Date is required' })
    }

    let entry = await JournalEntry.findOne({
      user: req.user._id,
      date,
    })

    if (entry) {
      entry.minutes = Number(minutes) || 0
      entry.note = note || ''
      if (imageUrl) entry.imageUrl = imageUrl
      await entry.save()
    } else {
      entry = await JournalEntry.create({
        user: req.user._id,
        date,
        minutes: Number(minutes) || 0,
        note: note || '',
        imageUrl,
      })

      const user = await User.findById(req.user._id)
      if (user) {
        user.journalEntries = (user.journalEntries || 0) + 1
        await user.save()
      }
    }

    res.status(200).json({
      message: 'Journal entry saved successfully',
      entry,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({
      date: -1,
    })

    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.entryId,
      user: req.user._id,
    })

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' })
    }

    res.json({ message: 'Journal entry deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateDailyGoal = async (req, res) => {
  try {
    const { dailyGoal } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.dailyGoal = Number(dailyGoal) || 0
    await user.save()

    res.json({
      message: 'Daily goal updated successfully',
      dailyGoal: user.dailyGoal,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  saveJournalEntry,
  getJournalEntries,
  deleteJournalEntry,
  updateDailyGoal,
}