import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await api.post('/auth/login', formData)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // tell Navbar to update immediately
      window.dispatchEvent(new Event('authChange'))

      setMessage(response.data.message)

      setTimeout(() => {
        navigate('/account')
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="login-page">
      <h1>LOGIN</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Login</button>
      </form>

      <div className="forgot-password-link">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="register-link">
        <Link to="/register">Dont have account? Register here!</Link>
      </div>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}