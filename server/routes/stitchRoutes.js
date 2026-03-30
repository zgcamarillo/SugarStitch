const express = require('express')
const router = express.Router()
const stitches = require('../data/stitches')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

router.get('/', (req, res) => {
  res.json(stitches)
})

router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user.favoriteStitches || [])
  } catch (error) {
    res.status(500).json({ message: 'Failed to load favorite stitches' })
  }
})

router.post('/favorite', protect, async (req, res) => {
  try {
    const { id, name, abbreviation, level, category, description, image } = req.body

    const user = await User.findById(req.user.id)

    const alreadySaved = user.favoriteStitches.some(
      (stitch) => stitch.stitchId === id
    )

    if (alreadySaved) {
      return res.status(400).json({ message: 'Stitch already saved' })
    }

    user.favoriteStitches.push({
      stitchId: id,
      name,
      abbreviation,
      level,
      category,
      description,
      image,
    })

    await user.save()

    res.status(201).json({
      message: 'Favorite stitch saved',
      favoriteStitches: user.favoriteStitches,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to save favorite stitch' })
  }
})

router.delete('/favorites/:stitchId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const stitchId = Number(req.params.stitchId)

    user.favoriteStitches = user.favoriteStitches.filter(
      (stitch) => stitch.stitchId !== stitchId
    )

    await user.save()

    res.json({
      message: 'Favorite stitch removed',
      favoriteStitches: user.favoriteStitches,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove favorite stitch' })
  }
})

module.exports = router