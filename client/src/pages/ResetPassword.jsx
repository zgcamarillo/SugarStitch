import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      })

      setMessage(res.data.message)

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed')
    }
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-wrapper">
        <img src="/images/pin.png" alt="pin" className="pin" />

        <div className="reset-password-intro">
          <h2>Almost There</h2>
          <p>Create a new password for your cozy account</p>
        </div>

        <h1>NEW PASSWORD</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Update Password</button>
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

export default ResetPassword