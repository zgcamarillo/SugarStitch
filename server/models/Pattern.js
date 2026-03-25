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

    isEcoFriendly: {
      type: Boolean,
      default: false,
    },

  
    isCompleted: {
      type: Boolean,
      default: false,
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
    yarnType: {
      type: String,
      enum: [
        'cotton',
        'organic-cotton',
        'acrylic',
        'wool',
        'bamboo',
        'hemp',
        'linen',
        'recycled',
        'blended',
        'other',
      ],
      default: 'cotton',
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