import { useEffect, useState } from 'react'

export default function Achievements() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error('You must be logged in to view achievements')
        }

        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Failed to load account')
        }

        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAccount()
  }, [])

  if (loading) return <p>Loading achievements...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>No user found.</p>

  const achievements = [
    {
      id: 'eco-starter',
      title: 'Eco Starter',
      image: '/images/eco-starter.png',
      category: 'Sustainability',
      unlocked: user.ecoProjects >= 1,
      requirementText: 'Use eco-friendly yarn for 1 project',
    },
    {
      id: 'green-creator',
      title: 'Green Creator',
      image: '/images/green-creator.png',
      category: 'Sustainability',
      unlocked: user.ecoProjects >= 5,
      requirementText: 'Use eco-friendly yarn for 5 projects',
    },
    {
      id: 'planet-protector',
      title: 'Planet Protector',
      image: '/images/planet-protector.png',
      category: 'Sustainability',
      unlocked: user.ecoProjects >= 10,
      requirementText: 'Use eco-friendly yarn for 10 projects',
    },

    {
      id: 'first-stitch',
      title: 'First Stitch',
      image: '/images/first-stitch.png',
      category: 'Progress',
      unlocked: user.patternsCreated >= 1,
      requirementText: 'Create your first pattern',
    },
    {
      id: 'getting-hooked',
      title: 'Getting Hooked',
      image: '/images/getting-hooked.png',
      category: 'Progress',
      unlocked: user.projectsCompleted >= 3,
      requirementText: 'Complete 3 projects',
    },
    {
      id: 'stitch-master',
      title: 'Stitch Master',
      image: '/images/stitch-master.png',
      category: 'Progress',
      unlocked: user.projectsCompleted >= 10,
      requirementText: 'Complete 10 projects',
    },

    {
      id: 'consistent-crafter',
      title: 'Consistent Crafter',
      image: '/images/consistent-crafter.png',
      category: 'Consistency',
      unlocked: user.streak >= 3,
      requirementText: 'Reach a 3-day streak',
    },
    {
      id: 'weekly-weaver',
      title: 'Weekly Weaver',
      image: '/images/weekly-weaver.png',
      category: 'Consistency',
      unlocked: user.streak >= 7,
      requirementText: 'Reach a 7-day streak',
    },

    {
      id: 'creative-mind',
      title: 'Creative Mind',
      image: '/images/creative-mind.png',
      category: 'Creativity',
      unlocked: user.patternsCreated >= 3,
      requirementText: 'Create 3 patterns',
    },
    {
      id: 'color-curator',
      title: 'Color Curator',
      image: '/images/color-curator.png',
      category: 'Creativity',
      unlocked: user.colorPalettesUsed >= 3,
      requirementText: 'Use 3 color palettes',
    },

    {
      id: 'explorer',
      title: 'Explorer',
      image: '/images/explorer.png',
      category: 'Exploration',
      unlocked: user.pagesVisited >= 6,
      requirementText: 'Visit all main pages',
    },
    {
      id: 'collector',
      title: 'Collector',
      image: '/images/collector.png',
      category: 'Exploration',
      unlocked: user.savedPatterns >= 10,
      requirementText: 'Save 10 patterns',
    },
  ]

  const charms = [
    { id: 'leaf', image: '/images/leaf.png', name: 'Leaf Charm' },
    { id: 'yarn', image: '/images/yarn.png', name: 'Yarn Charm' },
    { id: 'flower', image: '/images/flower.png', name: 'Bloom Charm' },
    { id: 'coffee', image: '/images/coffee.png', name: 'Cozy Charm' },
    { id: 'turtle', image: '/icons/turtle.png', name: 'Slow Craft Charm' },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)

  return (
    <div className="achievement-page">
      <h1>Achievements</h1>
      <p>Celebrate your crochet milestones and eco-friendly choices </p>

      <p className="achievement-progress">
        <span>
          {unlockedAchievements.length} / {achievements.length}
        </span>
        <small>achievements unlocked</small>
      </p>

      <div className="achievement-grid">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`achievement-card ${a.unlocked ? 'unlocked' : 'locked'}`}
          >
            <img src={a.image} alt={a.title} className="achievement-img" />
            <h3>{a.title}</h3>
            <p>{a.category}</p>
            <small>{a.requirementText}</small><br></br>
            <span>{a.unlocked ? 'Unlocked' : 'Keep stitching to unlock'}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '40px' }}>Your Charms</h2>
      <div className="charms">
        {charms.map((c) => (
          <div key={c.id} className="charm">
            <img src={c.image} alt={c.name} className="charm-img" />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}