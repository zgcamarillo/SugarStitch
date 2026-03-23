import { useEffect, useState } from 'react'
import api from '../services/api'

function SavedPatterns() {
  const [patterns, setPatterns] = useState([])
  const [error, setError] = useState('')

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
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h2>{pattern.title}</h2>
            <p><strong>Difficulty:</strong> {pattern.difficulty}</p>
            <p><strong>Yarn:</strong> {pattern.estimatedYarn}</p>
            <p><strong>Time:</strong> {pattern.estimatedTime}</p>

            <h4>Steps Progress</h4>
            <p>
              {
                pattern.steps.filter((step) => step.completed).length
              } / {pattern.steps.length} completed
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedPatterns