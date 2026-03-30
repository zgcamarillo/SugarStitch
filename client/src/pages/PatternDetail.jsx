import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

function PatternDetail() {
  const { id } = useParams()
  const [pattern, setPattern] = useState(null)
  const [error, setError] = useState('')
  const [xpPopup, setXpPopup] = useState(false)

  useEffect(() => {
    const fetchPattern = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await api.get(`/patterns/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setPattern(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load pattern')
      }
    }

    fetchPattern()
  }, [id])

  const handleStepToggle = async (stepId, currentCompleted) => {
    try {
      const token = localStorage.getItem('token')

      const response = await api.patch(
        `/patterns/${pattern._id}/steps/${stepId}`,
        { completed: !currentCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPattern(response.data.pattern)

      if (!currentCompleted) {
        setXpPopup(true)

        setTimeout(() => {
          setXpPopup(false)
        }, 1500)
      }
    } catch (err) {
      setError('Failed to update step')
    }
  }

  if (error) {
    return (
      <div className="pattern-detail-page">
        <p className="pattern-detail-error">{error}</p>
      </div>
    )
  }

  if (!pattern) {
    return (
      <div className="pattern-detail-page">
        <p className="pattern-detail-message">Loading...</p>
      </div>
    )
  }

  return (
    <div className="pattern-detail-page">
      {xpPopup && <div className="xp-popup">+10 XP</div>}

      <div className="pattern-detail-card">
        <h1>{pattern.title}</h1>

        <div className="pattern-meta">
          <p>
            <strong>Difficulty:</strong> {pattern.difficulty}
          </p>
          <p>
            <strong>Yarn:</strong> {pattern.estimatedYarn}
          </p>
          <p>
            <strong>Time:</strong> {pattern.estimatedTime}
          </p>
        </div>

        <h3>Full Pattern</h3>
        <pre className="pattern-full-text">
          {pattern.generatedPattern}
        </pre>

        <h3>Steps</h3>
        <div className="pattern-steps-list">
          {pattern.steps.map((step) => (
            <label
              key={step._id}
              className={`pattern-step ${step.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() => handleStepToggle(step._id, step.completed)}
              />
              <span className="pattern-step-text">{step.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatternDetail