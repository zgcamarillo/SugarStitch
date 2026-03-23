const mongoose = require('mongoose')

const patternSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    generatedPattern: {
      type: String,
      required: true,
    },
    estimatedYarn: {
      type: String,
      default: '',
    },
    estimatedTime: {
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pattern', patternSchema)