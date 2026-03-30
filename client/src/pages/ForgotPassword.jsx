import { useState } from 'react'
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
      const res = await api.post('/api/auth/forgot-password', { email })
      setMessage(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="forgot-password-page">
      <div className='forgot-password-wrapper'>
      <h1>Reset<br></br> Password</h1>
      <p>Enter your email and we’ll send you a reset link.</p>

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
      <div className="login-flowers">
        <img src="/images/flower2.png" alt="flower border" className="flower-border-one"/>
        <img src="/images/flower3.png" alt="flower border" className="flower-border-two"/>
        <img src="/images/flower2.png" alt="flower border" className="flower-border-one"/>
      </div>
      </div>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default ForgotPassword