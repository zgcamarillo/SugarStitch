const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            age,
            phoneNumber,
            email,
            password,
            expertise,
            allergies,
            measurements,
        } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            firstName,
            lastName,
            age,
            phoneNumber,
            email,
            password: hashedPassword,
            expertise,
            allergies,
            measurements,
        })

        res.status(201).json({
            message: 'User registered successsfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                expertise: newUser.expertise,
                role: newUser.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
 const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
 }

 const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body 

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' }) 
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentialss' })
        }

        res.json({ 
            message: 'Login successful',
            token: generateToken(user._id),
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                expertise: user.expertise,
                role: user.role,
                xp: user.xp,
                level: user.level,
                dailyGoal: user.dailyGoal,
                charms: user.Charms
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
 }
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, getCurrentUser }