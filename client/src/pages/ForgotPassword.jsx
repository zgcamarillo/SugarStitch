import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const res = await api.post('/auth/forgot-password', { email })
      setMessage(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-wrapper">
        <img src="/images/pin.png" alt="pin" className="pin" />

        <div className="forgot-password-intro">
          <h2>Need a Reset?</h2>
          <p>We’ll help you get back to stitching</p>
        </div>

        <h1>RESET PASSWORD</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <div className="login-link">
          <Link to="/login">Back to Login</Link>
        </div>

        <div className="login-flowers">
          <img
            src="/images/flower2.png"
            alt="flower border"
            className="flower-border-one"
          />
          <img
            src="/images/flower3.png"
            alt="flower border"
            className="flower-border-two"
          />
          <img
            src="/images/flower2.png"
            alt="flower border"
            className="flower-border-one"
          />
        </div>

        {message && <p className="auth-message success-message">{message}</p>}
        {error && <p className="auth-message error-message">{error}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword