const Pattern = require('../models/Pattern')

const generatePattern = async (req, res) => {
  try {
    const { title, prompt, difficulty } = req.body

    if (!title || !prompt) {
      return res.status(400).json({ message: 'Title and prompt are required' })
    }

    const generatedPattern = `
Sugar Stitch Pattern: ${title}

Difficulty: ${difficulty || 'beginner'}

Pattern:
1. Start with a magic ring.
2. Crochet 6 single crochets into the ring.
3. Increase evenly in the next round.
4. Continue building the shape based on your design idea: ${prompt}
5. Finish off and weave in ends.
`

    const newPattern = await Pattern.create({
      user: req.user._id,
      title,
      prompt,
      difficulty: difficulty || 'beginner',
      generatedPattern,
      estimatedYarn: '1-2 skeins',
      estimatedTime: '2-4 hours',
    })

    res.status(201).json({
      message: 'Pattern generated successfully',
      pattern: newPattern,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { generatePattern }