const Pattern = require('../models/Pattern')
const User = require('../models/User')

const generatePattern = async (req, res) => {
  try {
    const { title, prompt, difficulty } = req.body

    if (!title || !prompt) {
      return res.status(400).json({ message: 'Title and prompt are required' })
    }

    const steps = [
      { text: 'Create a magic ring', completed: false },
      { text: 'Crochet 6 single crochets into the ring', completed: false },
      { text: 'Increase evenly in the next round', completed: false },
      {
        text: `Shape the project based on the idea: ${prompt}`,
        completed: false,
      },
      { text: 'Finish off and weave in the ends', completed: false },
    ]

    const generatedPattern = `
Sugar Stitch Pattern: ${title}

Difficulty: ${difficulty || 'beginner'}

Pattern:
1. Create a magic ring.
2. Crochet 6 single crochets into the ring.
3. Increase evenly in the next round.
4. Shape the project based on your design idea: ${prompt}
5. Finish off and weave in the ends.
`

    const newPattern = await Pattern.create({
      user: req.user._id,
      title,
      prompt,
      difficulty: difficulty || 'beginner',
      generatedPattern,
      estimatedYarn: '1-2 skeins',
      estimatedTime: '2-4 hours',
      steps,
    })

    res.status(201).json({
      message: 'Pattern generated successfully',
      pattern: newPattern,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePatternStep = async (req, res) => {
  try {
    const { patternId, stepId } = req.params
    const { completed } = req.body

    const pattern = await Pattern.findOne({
      _id: patternId,
      user: req.user._id,
    })

    if (!pattern) {
      return res.status(404).json({ message: 'Pattern not found' })
    }

    const step = pattern.steps.id(stepId)

    if (!step) {
      return res.status(404).json({ message: 'Step not found' })
    }

    const wasCompleted = step.completed
    step.completed = completed

    await pattern.save()

    if (!wasCompleted && completed) {
      const user = await User.findById(req.user._id)

      if (user) {
        user.xp += 10
        user.level = Math.floor(user.xp / 100) + 1
        await user.save()
      }
    }

    res.json({
      message: 'Step updated successfully',
      pattern,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserPatterns = async (req, res) => {
  try {
    const patterns = await Pattern.find({ user: req.user._id }).sort({
      createdAt: -1,
    })

    res.json(patterns)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPatternById = async (req, res) => {
  try {
    const pattern = await Pattern.findOne({
      _id: req.params.patternId,
      user: req.user._id,
    })

    if (!pattern) {
      return res.status(404).json({ message: 'Pattern not found' })
    }

    res.json(pattern)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  generatePattern,
  updatePatternStep,
  getUserPatterns,
  getPatternById,
}