export default function MaterialCard({ name, ecoScore, stats, tagline, image }) {
  return (
    <div className="material-card">
      <img src={image} alt={name} className="material-img" />

      <div className="material-content">
        <h2>{name}</h2>

        <div className="eco-score">
          Eco Score: <span>{ecoScore}/10</span>
        </div>

        <ul>
          {stats.map((stat, i) => (
            <li key={i}>{stat}</li>
          ))}
        </ul>

        <p className="tagline">{tagline}</p>
      </div>
    </div>
  )
}