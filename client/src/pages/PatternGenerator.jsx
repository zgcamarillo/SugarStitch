import { useState } from 'react'
import api from '../services/api'

function PatternGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    difficulty: 'beginner',
  })

  const [generatedPattern, setGeneratedPattern] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const response = await api.post('/patterns/generate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setGeneratedPattern(response.data.pattern)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleStepToggle = async (stepId, currentCompleted) => {
    try {
      const token = localStorage.getItem('token')

      const response = await api.patch(
        `/patterns/${generatedPattern._id}/steps/${stepId}`,
        { completed: !currentCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setGeneratedPattern(response.data.pattern)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update step')
    }
  }

  return (
    <div>
      <h1>Pattern Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="prompt"
          placeholder="Describe your crochet idea..."
          value={formData.prompt}
          onChange={handleChange}
          rows="5"
          required
        />
        <br /><br />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Pattern'}
        </button>
      </form>

      {error && <p>{error}</p>}

      {generatedPattern && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{generatedPattern.title}</h2>
          <p><strong>Difficulty:</strong> {generatedPattern.difficulty}</p>
          <p><strong>Estimated Yarn:</strong> {generatedPattern.estimatedYarn}</p>
          <p><strong>Estimated Time:</strong> {generatedPattern.estimatedTime}</p>

          <h3>Full Pattern</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {generatedPattern.generatedPattern}
          </pre>

          <h3>Steps</h3>
          <div>
            {generatedPattern.steps?.map((step) => (
              <label
                key={step._id}
                style={{ display: 'block', marginBottom: '0.75rem' }}
              >
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => handleStepToggle(step._id, step.completed)}
                />{' '}
                {step.text}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternGenerator