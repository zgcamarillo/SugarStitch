const Pattern = require('../models/Pattern')
const User = require('../models/User')
const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const generatePattern = async (req, res) => {
  try {
    const { title, prompt, difficulty } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''

    if (!title || !prompt) {
      return res.status(400).json({ message: 'Title and prompt are required' })
    }

    const aiPrompt = `
        You are a crochet pattern assistant for an app called Sugar Stitch.

        Create a crochet pattern for this project:
        Title: ${title}
        Idea: ${prompt}
        Difficulty: ${difficulty || 'beginner'}

        Return the response in this exact format:

        TITLE:
        <short project title>

        DIFFICULTY:
        <difficulty>

        ESTIMATED_YARN:
        <short yarn estimate>

        ESTIMATED_TIME:
        <short time estimate>

        PATTERN:
        <number the steps clearly, one per line>

        STEPS:
        - <short checklist step>
        - <short checklist step>
        - <short checklist step>
        - <short checklist step>
        - <short checklist step>

        Keep it beginner-friendly when possible.
        `

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: aiPrompt,
    })

    const text = response.text || ''

    let estimatedYarn = '1-2 skeins'
    let estimatedTime = '2-4 hours'
    let generatedPattern = text

    const yarnMatch = text.match(/ESTIMATED_YARN:\s*(.*)/)
    const timeMatch = text.match(/ESTIMATED_TIME:\s*(.*)/)

    if (yarnMatch) estimatedYarn = yarnMatch[1].trim()
    if (timeMatch) estimatedTime = timeMatch[1].trim()

    const stepsSectionMatch = text.match(/STEPS:\s*([\s\S]*)/)
    let steps = []

    if (stepsSectionMatch) {
      steps = stepsSectionMatch[1]
        .split('\n')
        .map((line) => line.replace(/^-+\s*/, '').trim())
        .filter(Boolean)
        .map((stepText) => ({
          text: stepText,
          completed: false,
        }))
    }

    if (steps.length === 0) {
      steps = [
        { text: 'Create a magic ring', completed: false },
        { text: 'Crochet the first round', completed: false },
        { text: 'Shape the main body', completed: false },
        { text: 'Finish and weave in ends', completed: false },
      ]
    }

    const newPattern = await Pattern.create({
      user: req.user._id,
      title,
      prompt,
      difficulty: difficulty || 'beginner',
      generatedPattern,
      estimatedYarn,
      estimatedTime,
      steps,
      imageUrl,
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