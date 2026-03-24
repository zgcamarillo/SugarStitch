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
    imageUrl: {
    type: String,
    default: '',
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
    steps: {
      type: [
        {
      text: {
        type: String,
        required: true,
        },
      completed: {
        type: Boolean,
        default: false,
        },
      },
      ],
  default: [],
},
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pattern', patternSchema)