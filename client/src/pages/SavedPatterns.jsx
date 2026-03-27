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

        const response = await api.get('/patterns', {
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

      await api.delete(`/patterns/${patternId}`, {
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
    <div>
      <h1>Saved Patterns</h1>

      {error && <p>{error}</p>}

      {patterns.length === 0 ? (
        <p>No saved patterns yet</p>
      ) : (
        patterns.map((pattern) => (
          <div
            key={pattern._id}
            onClick={() => navigate(`/patterns/${pattern._id}`)}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
              cursor: 'pointer',
            }}
          >
            <h2>{pattern.title}</h2>
            <p><strong>Difficulty:</strong> {pattern.difficulty}</p>
            <p><strong>Yarn:</strong> {pattern.estimatedYarn}</p>
            <p><strong>Time:</strong> {pattern.estimatedTime}</p>

            <h4>Steps Progress</h4>
            <p>
              {pattern.steps.filter((step) => step.completed).length} / {pattern.steps.length} completed
            </p>

            <button
              onClick={(e) => handleDelete(e, pattern._id)}
              style={{
                marginTop: '1rem',
                backgroundColor: '#bb8588',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Delete Pattern
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedPatterns