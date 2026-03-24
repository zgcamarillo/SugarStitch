const crypto = require('crypto')
const User = require('../models/User')

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(200).json({
        message: 'If that email exists, a reset link has been sent.',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15

    await user.save()

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
    console.log('Reset URL:', resetUrl)

    res.status(200).json({
      message: 'If that email exists, a reset link has been sent.',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { forgotPassword }