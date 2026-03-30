const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    allergies: {
      type: [String],
      default: [],
    },
    measurements: {
      type: String,
      default: '',
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    charms: {
      type: [String],
      default: [],
    },
    crochetDay: {
      type: [String],
      default: [],
    },
    weeklyGoal: {
      type: Number,
      default: 0,
    },
    dailyGoal: {
      type: Number,
      default: 0,
    },

    ecoProjects: {
      type: Number,
      default: 0,
    },
    patternsCreated: {
      type: Number,
      default: 0,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    colorPalettesUsed: {
      type: Number,
      default: 0,
    },
    pagesVisited: {
      type: Number,
      default: 0,
    },
    savedPatterns: {
      type: Number,
      default: 0,
    },
    journalEntries: {
      type: Number,
      default: 0,
    },
    favoriteStitches: [
      {
        stitchId: Number,
        name: String,
        abbreviation: String,
        level: String,
        category: String,
        description: String,
        image: String,
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)