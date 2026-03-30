const express = require('express')
const router = express.Router()
const stitches = require('../data/stitches')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')
const { adminOnly } = require('../middleware/adminMiddleware')

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

router.post('/', protect, adminOnly, (req, res) => {
  try {
    const { name, abbreviation, level, category, description, image } = req.body

    const newStitch = {
      id: stitches.length ? Math.max(...stitches.map((stitch) => stitch.id)) + 1 : 1,
      name,
      abbreviation,
      level,
      category,
      description,
      image,
    }

    stitches.push(newStitch)

    res.status(201).json({
      message: 'Stitch added successfully',
      stitch: newStitch,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to add stitch' })
  }
})

router.delete('/:id', protect, adminOnly, (req, res) => {
  try {
    const stitchId = Number(req.params.id)
    const stitchIndex = stitches.findIndex((stitch) => stitch.id === stitchId)

    if (stitchIndex === -1) {
      return res.status(404).json({ message: 'Stitch not found' })
    }

    const deletedStitch = stitches.splice(stitchIndex, 1)

    res.json({
      message: 'Stitch deleted successfully',
      stitch: deletedStitch[0],
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete stitch' })
  }
})

module.exports = router