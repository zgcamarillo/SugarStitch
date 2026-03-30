import { useState } from 'react'
import api from '../services/api'

function PatternGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    difficulty: 'beginner',
    yarnType: 'cotton',
  })

  const [generatedPattern, setGeneratedPattern] = useState(null)
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const formPayload = new FormData()
      formPayload.append('title', formData.title)
      formPayload.append('prompt', formData.prompt)
      formPayload.append('difficulty', formData.difficulty)
      formPayload.append('yarnType', formData.yarnType)

      if (image) {
        formPayload.append('image', image)
      }

      const response = await api.post('/api/patterns/generate', formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setGeneratedPattern(response.data.pattern)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleStepToggle = async (stepId, currentCompleted) => {
    try {
      const token = localStorage.getItem('token')

      const response = await api.patch(
        `/api/patterns/${generatedPattern._id}/steps/${stepId}`,
        { completed: !currentCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setGeneratedPattern(response.data.pattern)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to update step')
    }
  }

  return (
    <div className="pattern-page">
      <h1>Pattern Generator</h1>

      <form onSubmit={handleSubmit} className="pattern-form">
        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="prompt">Describe Your Idea</label>
        <textarea
          id="prompt"
          name="prompt"
          placeholder="Describe your crochet idea..."
          value={formData.prompt}
          onChange={handleChange}
          rows="5"
          required
        />

        <label htmlFor="image">Upload a reference image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <div className="form-group">
          <label htmlFor="yarnType">What type of yarn do you have?</label>
          <select
            id="yarnType"
            name="yarnType"
            value={formData.yarnType}
            onChange={handleChange}
          >
            <option value="cotton">Cotton</option>
            <option value="organic-cotton">Organic Cotton</option>
            <option value="acrylic">Acrylic</option>
            <option value="wool">Wool</option>
            <option value="bamboo">Bamboo</option>
            <option value="hemp">Hemp</option>
            <option value="linen">Linen</option>
            <option value="recycled">Recycled Yarn</option>
            <option value="blended">Blended Yarn</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Pattern'}
        </button>
      </form>

      {error && <p className="pattern-error">{error}</p>}

      {generatedPattern && (
        <div className="pattern-result">
          <h2>{generatedPattern.title}</h2>
          <p>
            <strong>Difficulty:</strong> {generatedPattern.difficulty}
          </p>
          <p>
            <strong>Estimated Yarn:</strong> {generatedPattern.estimatedYarn}
          </p>
          <p>
            <strong>Estimated Time:</strong> {generatedPattern.estimatedTime}
          </p>

          {generatedPattern.image && (
            <div>
              <h3>Reference Image</h3>
              <img
                src={generatedPattern.image}
                alt={generatedPattern.title}
                className="pattern-image"
              />
            </div>
          )}

          <h3>Full Pattern</h3>
          <pre className="pattern-text">
            {generatedPattern.generatedPattern}
          </pre>

          <h3>Steps</h3>
          <div className="pattern-steps">
            {generatedPattern.steps?.map((step) => (
              <label key={step._id}>
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => handleStepToggle(step._id, step.completed)}
                />
                <span>{step.text}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternGenerator