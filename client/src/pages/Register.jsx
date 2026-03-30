// Auth

import { useState } from 'react'
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
                allergies: formData.allergies ? formData.allergies.split(',').map((item) => item.trim()) : [],
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
                measurements:'',
            })
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }
    return (
        <div className="register-page">
            <h1>REGISTER</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} require/>
                <br></br>
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} require/>
                <br></br>
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} require/>
                <br></br>
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} require/>
                <br></br>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} require/>
                <br></br>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} require/>
                <br></br>
                <select name="expertise" value={formData.expertise} onChange={handleChange}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <br></br>
                <input type="text" name="allergies" placeholder="Allergies (comma separated)" value={formData.allergies} onChange={handleChange} />
                <br></br>
                <input type="text" name="measurements" placeholder="Measurements (optional)" value={formData.measurements} onChange={handleChange} />
                <br></br>
                <button type="submit">Create Account</button>
            </form>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

        </div>
    )
}

export default Register