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
    <div className="account-page">
      <div className='account-overview'>
        <div className="profile-picture">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={`${user.firstName}'s profile`} />
          ) : (
            <div className="placeholder-picture">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <p className='account-user-name'>{user.firstName} {user.lastName || ''}</p>
        <div className="account-summary">
        <p>{user.expertise || 'beginner'} | {user.role}</p>
        </div>
        <p className='account-email'><strong>{user.email}</strong></p>
      </div>

      <div className="account-achievements">
        <h2>Achievements</h2>
        {user.achievements && user.achievements.length > 0 ? (
          <ul>
            {user.achievements.map((achievement) => (
              <li key={achievement._id}>{achievement.name}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements yet. Keep stitching to earn some!</p>
        )}
      </div>

      <div className='account-progress'>
        <h2>Progress</h2>
        <XpDonut xp={user.xp ?? 0} level={user.level ?? 1} />
        <p><strong>Daily Goal:</strong> {user.dailyGoal ?? 0} Minutes</p>
        <p><strong>Weekly Goal:</strong> {user.weeklyGoal ?? 0}</p>
        <p><strong>Charms Collected:</strong> {user.charms?.length ?? 0}</p>
      </div>
      
    </div>
  )
}

export default Account