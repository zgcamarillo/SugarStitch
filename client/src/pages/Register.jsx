import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: '',
    password: '',
    expertise: 'beginner',
    allergies: '',
    measurements: '',
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
      const payload = {
        ...formData,
        age: Number(formData.age),
        allergies: formData.allergies
          ? formData.allergies.split(',').map((item) => item.trim())
          : [],
      }

      const response = await api.post('/auth/register', payload)

      setMessage(response.data.message)

      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        phoneNumber: '',
        email: '',
        password: '',
        expertise: 'beginner',
        allergies: '',
        measurements: '',
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <img src="/images/pin.png" alt="pin" className="pin" />

        <div className="register-intro">
          <h2>Join Sugar Stitch</h2>
          <p>Create your cozy crochet account</p>
        </div>

        <h1>REGISTER</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            type="text"
            name="allergies"
            placeholder="Allergies (comma separated)"
            value={formData.allergies}
            onChange={handleChange}
          />

          <input
            type="text"
            name="measurements"
            placeholder="Measurements (optional)"
            value={formData.measurements}
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>
        </form>

        <div className="login-link">
          <Link to="/login">Already have an account? Login here!</Link>
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

export default Register