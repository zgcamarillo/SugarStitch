import { useEffect, useState } from 'react'
import api from '../services/api'

export default function FavoriteStitches() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/stitches/favorites')
        setFavorites(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load favorite stitches')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleDeleteFavorite = async (stitchId) => {
    try {
      setError('')
      setMessage('')

      await api.delete(`/stitches/favorites/${stitchId}`)

      setFavorites((prev) =>
        prev.filter((stitch) => stitch.stitchId !== stitchId)
      )

      setMessage('Favorite stitch removed')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove favorite stitch')
    }
  }

  if (loading) return <p>Loading favorites...</p>
  if (error && favorites.length === 0) return <p>{error}</p>

  return (
    <div className="favorite-stitches-page">
      <h1>My Favorite Stitches</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      {favorites.length === 0 ? (
        <p>No favorite stitches saved yet.</p>
      ) : (
        <div className="stitch-grid">
          {favorites.map((stitch) => (
            <div key={stitch.stitchId} className="stitch-card">
              <h2>{stitch.name}</h2>
              <p><strong>Abbreviation:</strong> {stitch.abbreviation}</p>
              <p><strong>Level:</strong> {stitch.level}</p>
              <p><strong>Category:</strong> {stitch.category}</p>
              <p>{stitch.description}</p>

              <button onClick={() => handleDeleteFavorite(stitch.stitchId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}