// Auth 

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

            setMessage(response.data.message)

            setTimeout(() => {
                navigate('/account')
            }, 1000)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }


    return (
        <div>
            <h1>LOGIN</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" calue={formData.email} onChange={handleChange} required />
                <br></br>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <br></br>

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    )
}