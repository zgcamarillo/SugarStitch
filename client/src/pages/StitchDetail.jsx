import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function StitchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [stitch, setStitch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStitch = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await api.get('/api/stitches')
        const foundStitch = res.data.find((item) => item.id === Number(id))

        if (!foundStitch) {
          setError('Stitch not found')
          return
        }

        setStitch(foundStitch)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load stitch')
      } finally {
        setLoading(false)
      }
    }

    fetchStitch()
  }, [id])

  if (loading) {
    return (
      <div className="stitch-detail-page">
        <p>Loading stitch...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="stitch-detail-page">
        <p>{error}</p>
        <button onClick={() => navigate('/stitch-library')}>
          Back to Stitch Library
        </button>
      </div>
    )
  }

  return (
    <div className="stitch-detail-page">
      <div className="stitch-detail-header">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate('/stitch-library')}
        >
          ← Back to Library
        </button>

        <button
          type="button"
          className="favorites-page-btn"
          onClick={() => navigate('/favorite-stitches')}
        >
          View Favorites
        </button>
      </div>

      <div className="stitch-detail-card">
        {stitch.image && (
          <img
            src={stitch.image}
            alt={stitch.name}
            className="stitch-detail-image"
          />
        )}

        <h1>{stitch.name}</h1>

        <div className="stitch-detail-tags">
          <span><strong>Abbreviation:</strong> {stitch.abbreviation}</span>
          <span><strong>Level:</strong> {stitch.level}</span>
          <span><strong>Category:</strong> {stitch.category}</span>
        </div>

        <div className="stitch-detail-section">
          <h2>What is this stitch?</h2>
          <p>{stitch.description}</p>
        </div>

        <div className="stitch-detail-section">
          <h2>When to use it</h2>
          <p>{stitch.whenToUse}</p>
        </div>

        <div className="stitch-detail-section">
          <h2>How to do it</h2>
          {stitch.steps && stitch.steps.length > 0 ? (
            <ol className="stitch-steps-list">
              {stitch.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p>No steps added yet.</p>
          )}
        </div>

        <div className="stitch-detail-section">
          <h2>Common mistakes</h2>
          {stitch.mistakes && stitch.mistakes.length > 0 ? (
            <ul className="stitch-mistakes-list">
              {stitch.mistakes.map((mistake, index) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>
          ) : (
            <p>No common mistakes added yet.</p>
          )}
        </div>

        <div className="stitch-detail-section practice-card">
          <h2>Practice idea</h2>
          <p>{stitch.practice}</p>
        </div>
      </div>
    </div>
  )
}