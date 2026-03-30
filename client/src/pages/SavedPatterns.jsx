import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function SavedPatterns() {
  const [patterns, setPatterns] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get('/api/patterns', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setPatterns(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load patterns')
      }
    }

    fetchPatterns()
  }, [])

  const handleDelete = async (e, patternId) => {
    e.stopPropagation()

    const confirmed = window.confirm('Are you sure you want to delete this pattern?')
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')

      await api.delete(`/api/patterns/${patternId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setPatterns((prevPatterns) =>
        prevPatterns.filter((pattern) => pattern._id !== patternId)
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete pattern')
    }
  }

  return (
    <div className="saved-patterns-page">

      {/* ✨ NEW HEADER ACTIONS */}
      <div className="saved-header">
        <button
          className="saved-btn secondary-btn"
          onClick={() => navigate('/pattern-generator')}
        >
          Back to Generator
        </button>

        <button
          className="saved-btn primary-btn"
          onClick={() => navigate('/pattern-generator')}
        >
          + Create New Pattern
        </button>
      </div>

      <h1>Saved Patterns</h1>

      {error && <p className="saved-error">{error}</p>}

      {patterns.length === 0 ? (
        <p className="empty-state">No saved patterns yet</p>
      ) : (
        <div className="pattern-grid">
          {patterns.map((pattern) => (
            <div
              key={pattern._id}
              className="pattern-card"
              onClick={() => navigate(`/patterns/${pattern._id}`)}
            >
              <h2>{pattern.title}</h2>

              <p><strong>Difficulty:</strong> {pattern.difficulty}</p>
              <p><strong>Yarn:</strong> {pattern.estimatedYarn}</p>
              <p><strong>Time:</strong> {pattern.estimatedTime}</p>

              <div className="pattern-progress">
                <strong>Progress:</strong>{' '}
                {pattern.steps.filter((step) => step.completed).length} / {pattern.steps.length}
              </div>

              <button
                className="delete-pattern-btn"
                onClick={(e) => handleDelete(e, pattern._id)}
              >
                Delete Pattern
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPatterns