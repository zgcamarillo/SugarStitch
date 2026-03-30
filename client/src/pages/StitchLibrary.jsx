import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function StitchLibrary() {
  const navigate = useNavigate()

  const [stitches, setStitches] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    const loadStitches = async () => {
      try {
        setLoading(true)
        setError('')

        const [stitchesRes, favoritesRes] = await Promise.all([
          api.get('/api/stitches'),
          api.get('/api/stitches/favorites'),
        ])

        setStitches(stitchesRes.data || [])

        const favoriteIds = (favoritesRes.data || []).map(
          (stitch) => stitch.stitchId
        )
        setSavedIds(favoriteIds)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load stitch library')
      } finally {
        setLoading(false)
      }
    }

    loadStitches()
  }, [])

  const handleSaveFavorite = async (stitch) => {
    try {
      setMessage('')
      setError('')

      await api.post('/api/stitches/favorite', stitch)

      setSavedIds((prev) => [...prev, stitch.id])
      setMessage(`${stitch.name} saved to favorites!`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save favorite stitch')
    }
  }

  const filteredStitches = stitches.filter((stitch) => {
    const matchesLevel =
      levelFilter === 'All' || stitch.level === levelFilter

    const matchesCategory =
      categoryFilter === 'All' || stitch.category === categoryFilter

    return matchesLevel && matchesCategory
  })

  if (loading) {
    return (
      <div className="stitch-library-page">
        <p>Loading stitch library...</p>
      </div>
    )
  }

  return (
    <div className="stitch-library-page">
      <div className="stitch-library-header">
        <div>
          <h1>Stitch Library</h1>
          <p>Explore stitches, learn step by step, and save your favorites.</p>
        </div>

        <button
          className="view-favorites-btn"
          onClick={() => navigate('/favorite-stitches')}
        >
          View Favorites
        </button>
      </div>

      {message && <p className="stitch-message success-message">{message}</p>}
      {error && <p className="stitch-message error-message">{error}</p>}

      <div className="stitch-filters">
        <div className="filter-section">
          <h3>Filter by Level</h3>
          <div className="filter-group">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                type="button"
                className={levelFilter === level ? 'active-filter' : ''}
                onClick={() => setLevelFilter(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Filter by Category</h3>
          <div className="filter-group">
            {[
              'All',
              'Basic',
              'Textured',
              'Decorative',
              'Technique',
              'Pattern',
            ].map((category) => (
              <button
                key={category}
                type="button"
                className={categoryFilter === category ? 'active-filter' : ''}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="stitch-results-count">
        <p>
          Showing {filteredStitches.length} of {stitches.length} stitches
        </p>
      </div>

      {filteredStitches.length === 0 ? (
        <p>No stitches match your filters yet.</p>
      ) : (
        <div className="stitch-grid">
          {filteredStitches.map((stitch) => (
            <div key={stitch.id} className="stitch-card">
              {stitch.image && (
                <img
                  src={stitch.image}
                  alt={stitch.name}
                  className="stitch-image"
                />
              )}

              <h2>{stitch.name}</h2>

              <p>
                <strong>Abbreviation:</strong> {stitch.abbreviation}
              </p>
              <p>
                <strong>Level:</strong> {stitch.level}
              </p>
              <p>
                <strong>Category:</strong> {stitch.category}
              </p>
              <p>{stitch.description}</p>

              <div className="stitch-card-buttons">
                <button
                  type="button"
                  className="learn-stitch-btn"
                  onClick={() => navigate(`/stitches/${stitch.id}`)}
                >
                  Learn Stitch
                </button>

                <button
                  type="button"
                  className="favorite-btn"
                  onClick={() => handleSaveFavorite(stitch)}
                  disabled={savedIds.includes(stitch.id)}
                >
                  {savedIds.includes(stitch.id) ? 'Saved' : 'Save Favorite'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}