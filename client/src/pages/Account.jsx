import { useEffect, useState } from 'react'
import api from '../services/api'
import XpDonut from '../components/XpDonut'

function Account() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load account')
      }
    }

    fetchCurrentUser()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (!user) {
    return <h1>Loading account...</h1>
  }

  return (
    <div>
      <h1>Welcome, {user.firstName} ✨</h1>

      <div>
        <h2>My Dashboard</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName || ''}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Expertise:</strong> {user.expertise || 'beginner'}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div>
        <h2>Progress</h2>
        <XpDonut xp={user.xp ?? 0} level={user.level ?? 1} />
        <p><strong>Daily Goal:</strong> {user.dailyGoal ?? 0}</p>
        <p><strong>Weekly Goal:</strong> {user.weeklyGoal ?? 0}</p>
        <p><strong>Charms Collected:</strong> {user.charms?.length ?? 0}</p>
      </div>
    </div>
  )
}

export default Account