import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

function PatternDetail() {
  const { id } = useParams()
  const [pattern, setPattern] = useState(null)
  const [error, setError] = useState('')

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
    } catch (err) {
      setError('Failed to update step')
    }
  }

  if (!pattern) return <p>Loading...</p>

  return (
    <div>
      <h1>{pattern.title}</h1>

      <p><strong>Difficulty:</strong> {pattern.difficulty}</p>
      <p><strong>Yarn:</strong> {pattern.estimatedYarn}</p>
      <p><strong>Time:</strong> {pattern.estimatedTime}</p>

      <h3>Full Pattern</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {pattern.generatedPattern}
      </pre>

      <h3>Steps</h3>
      {pattern.steps.map((step) => (
        <label key={step._id} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={step.completed}
            onChange={() => handleStepToggle(step._id, step.completed)}
          />
          {step.text}
        </label>
      ))}
    </div>
  )
}

export default PatternDetail