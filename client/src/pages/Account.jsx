import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import XpDonut from '../components/XpDonut'

function Account() {
  const [user, setUser] = useState(null)
  const [latestPattern, setLatestPattern] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const [userResponse, patternsResponse] = await Promise.all([
          api.get('/api/auth/me'),
          api.get('/api/patterns'),
        ])

        setUser(userResponse.data)
        localStorage.setItem('user', JSON.stringify(userResponse.data))

        if (patternsResponse.data && patternsResponse.data.length > 0) {
          setLatestPattern(patternsResponse.data[0])
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load account')
      }
    }

    fetchAccountData()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (!user) {
    return <h1>Loading account...</h1>
  }

  return (
    <div className="account-page">
      <div className="account-overview">
        <div className="profile-picture">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={`${user.firstName}'s profile`} />
          ) : (
            <div className="placeholder-picture">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <p className="account-user-name">
          {user.firstName} {user.lastName || ''}
        </p>

        <div className="account-summary">
          <p>
            {user.expertise || 'beginner'} | {user.role}
          </p>
        </div>

        <p className="account-email">
          <strong>{user.email}</strong>
        </p>
      </div>

      <div className="account-content">
        <div className="account-progress">
          <h2>Progress</h2>
          <XpDonut xp={user.xp ?? 0} level={user.level ?? 1} />
          <p>
            <strong>Daily Goal:</strong> {user.dailyGoal ?? 0} Minutes
          </p>
        </div>

        <div className="account-quick-actions">
          <h2>Get Back to Learning!</h2>

          <div className="quick-action-buttons">
            <button
              className="account-action-btn"
              onClick={() => navigate('/favorite-stitches')}
            >
              Favorite Stitches
            </button>

            <button
              className="account-action-btn"
              onClick={() =>
                latestPattern
                  ? navigate(`/patterns/${latestPattern._id}`)
                  : navigate('/saved-patterns')
              }
            >
              Latest Pattern
            </button>

            <button
              className="account-action-btn"
              onClick={() => navigate('/pattern-generator')}
            >
              Pattern Generator
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account