import { useEffect, useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import api from '../services/api'

export default function Journal() {
  const ecoTips = [
    'Choose natural or recycled yarn when possible.',
    'Reuse leftover yarn scraps for small projects.',
    'Donate extra yarn instead of throwing it away.',
    'Try eco-friendly stuffing for crochet plushies.',
    'Store supplies neatly so materials last longer.',
    'Keep leftover yarn scraps for patchwork or small flowers.',
    'Pick durable yarn for projects you want to last a long time.',
  ]

  const todayTip = useMemo(() => {
    return ecoTips[new Date().getDate() % ecoTips.length]
  }, [])

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [entries, setEntries] = useState([])
  const [dailyGoal, setDailyGoal] = useState(30)

  const [minutes, setMinutes] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [goalSaving, setGoalSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function formatLocalDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const selectedDateString = formatLocalDate(selectedDate)

  const selectedEntry = entries.find((entry) => entry.date === selectedDateString)

  const imagePreviewUrl = useMemo(() => {
    if (!image) return ''
    return URL.createObjectURL(image)
  }, [image])

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  useEffect(() => {
    const loadJournalPage = async () => {
      try {
        setLoading(true)
        setError('')

        const [entriesRes, meRes] = await Promise.all([
          api.get('/api/journal'),
          api.get('/api/auth/me'),
        ])

        setEntries(entriesRes.data || [])

        if (meRes.data?.dailyGoal || meRes.data?.dailyGoal === 0) {
          setDailyGoal(meRes.data.dailyGoal)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load journal')
      } finally {
        setLoading(false)
      }
    }

    loadJournalPage()
  }, [])

  useEffect(() => {
    if (selectedEntry) {
      setMinutes(selectedEntry.minutes ?? '')
      setNote(selectedEntry.note ?? '')
      setImage(null)
    } else {
      setMinutes('')
      setNote('')
      setImage(null)
    }
    setMessage('')
    setError('')
  }, [selectedDateString, selectedEntry?._id])

  const hasEntry = (date) => {
    const dateString = formatLocalDate(date)
    return entries.some((entry) => entry.date === dateString)
  }

  const goalMetForDate = (date) => {
    const dateString = formatLocalDate(date)
    const entry = entries.find((item) => item.date === dateString)
    return entry && Number(entry.minutes || 0) >= Number(dailyGoal || 0)
  }

  const handleSaveGoal = async () => {
    try {
      setGoalSaving(true)
      setError('')
      setMessage('')

      const response = await api.patch('/api/journal/goal', {
        dailyGoal: Number(dailyGoal) || 0,
      })

      setDailyGoal(response.data.dailyGoal)
      setMessage('Daily goal saved!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save daily goal')
    } finally {
      setGoalSaving(false)
    }
  }

  const handleSaveEntry = async () => {
    try {
      setSaving(true)
      setError('')
      setMessage('')

      const formData = new FormData()
      formData.append('date', selectedDateString)
      formData.append('minutes', Number(minutes) || 0)
      formData.append('note', note)

      if (image) {
        formData.append('image', image)
      }

      const response = await api.post('/api/journal', formData)

      const savedEntry = response.data.entry
      const otherEntries = entries.filter((entry) => entry.date !== selectedDateString)
      setEntries([...otherEntries, savedEntry].sort((a, b) => b.date.localeCompare(a.date)))

      setImage(null)
      setMessage('Journal entry saved!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save journal entry')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteEntry = async () => {
    try {
      if (!selectedEntry?._id) return

      setError('')
      setMessage('')

      await api.delete(`/api/journal/${selectedEntry._id}`)

      setEntries(entries.filter((entry) => entry._id !== selectedEntry._id))
      setMinutes('')
      setNote('')
      setImage(null)
      setMessage('Journal entry deleted.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete journal entry')
    }
  }

  const minutesLeft = Math.max(Number(dailyGoal || 0) - Number(minutes || 0), 0)

  const savedImageUrl = selectedEntry?.imageUrl
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${selectedEntry.imageUrl}`
    : ''

  if (loading) {
    return (
      <div className="journal-page">
        <p>Loading journal...</p>
      </div>
    )
  }

  return (
    <div className="journal-page">
      <div className="eco-tip-card">
        <h2>Eco Tip of the Day </h2>
        <p>{todayTip}</p>
      </div>

      <div className="journal-hero-card">
        <h1>Crochet Journal</h1>
        <p>Track your time, save your progress, and celebrate your cozy little wins.</p>
      </div>

      <div className="goal-card">
        <div>
          <h2>Daily Goal</h2>
          <p>How many minutes would you like to crochet each day?</p>
        </div>

        <div className="goal-controls">
          <input
            type="number"
            min="0"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(e.target.value)}
            className="goal-input"
          />
          <button onClick={handleSaveGoal} disabled={goalSaving}>
            {goalSaving ? 'Saving...' : 'Save Goal'}
          </button>
        </div>
      </div>

      {(message || error) && (
        <div className={`journal-alert ${error ? 'error' : 'success'}`}>
          {error || message}
        </div>
      )}

      <div className="journal-layout">
        <div className="calendar-card">
          <h2>Your Crochet Calendar</h2>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="cute-calendar"
            tileClassName={({ date, view }) => {
              if (view !== 'month') return null
              if (goalMetForDate(date)) return 'goal-met-day'
              if (hasEntry(date)) return 'has-entry-day'
              return null
            }}
            tileContent={({ date, view }) => {
              if (view !== 'month') return null

              if (goalMetForDate(date)) {
                return <div className="calendar-marker">🌟</div>
              }

              if (hasEntry(date)) {
                return <div className="calendar-dot" />
              }

              return null
            }}
          />

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot" />
              Logged day
            </div>
            <div className="legend-item">Goal reached</div>
          </div>
        </div>

        <div className="entry-card">
          <h2>Entry for {selectedDateString}</h2>

          <label htmlFor="minutes">How long did you crochet today?</label>
          <input
            id="minutes"
            type="number"
            min="0"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <div className="goal-status">
            {Number(minutes || 0) >= Number(dailyGoal || 0)
              ? 'Goal reached!'
              : `${minutesLeft} min left to reach your goal`}
          </div>

          <label htmlFor="note">Journal Note</label>
          <textarea
            id="note"
            rows="5"
            placeholder="Write about what you worked on today..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <label htmlFor="image">Upload a photo (optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="journal-buttons">
            <button onClick={handleSaveEntry} disabled={saving}>
              {saving ? 'Saving...' : selectedEntry ? 'Update Entry' : 'Save Entry'}
            </button>

            {selectedEntry && (
              <button className="delete-btn" onClick={handleDeleteEntry}>
                Delete Entry
              </button>
            )}
          </div>

          {(imagePreviewUrl || savedImageUrl || selectedEntry?.note || selectedEntry?.minutes) && (
            <div className="saved-entry-card">
              <h3>Day Preview</h3>

              {(imagePreviewUrl || savedImageUrl) && (
                <img
                  src={imagePreviewUrl || savedImageUrl}
                  alt="Crochet journal upload"
                  className="journal-image"
                />
              )}

              <p>
                <strong>Minutes:</strong> {minutes || selectedEntry?.minutes || 0}
              </p>
              <p>
                <strong>Note:</strong> {note || selectedEntry?.note || 'No note yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}