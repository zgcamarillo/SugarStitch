function XpDonut({ xp = 0, level = 1, size = 170 }) {
  const xpInLevel = xp % 100
  const pct = (xpInLevel / 100) * 100

  return (
    <div className="xp-donut-wrap">
      <div
        className="xp-donut"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(#f4a6c1 0% ${pct}%, #f3e5e5 ${pct}% 100%)`,
        }}
      >
        <div className="xp-donut-inner">
          <h3 className="xp-donut-label">Level</h3>
          <h2 className="xp-donut-level">{level}</h2>
          <p className="xp-donut-sub">{xpInLevel}/100 XP</p>
        </div>
      </div>
    </div>
  )
}

export default XpDonut