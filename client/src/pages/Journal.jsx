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

  const savedImageUrl = selectedEntry?.imageUrl
    ? `${import.meta.env.VITE_API_URL}${selectedEntry.imageUrl}`
    : ''

  if (loading) {
    return <div className="journal-page"><p>Loading journal...</p></div>
  }

  return (
    <div className="journal-page">
      <h1>Crochet Journal</h1>

      {savedImageUrl && (
        <img src={savedImageUrl} alt="journal" />
      )}
    </div>
  )
}