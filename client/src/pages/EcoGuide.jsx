// Sustainability Mission 

import MaterialCard from '../components/MaterialCard'

const materials = [
  {
    name: "Hemp / Linen",
    ecoScore: 10,
    image: "/images/hemp.jpg",
    stats: [
      "Low water usage",
      "Improves soil health",
      "Fully biodegradable"
    ],
    tagline: "The most sustainable fiber"
  },
  {
    name: "Recycled Yarn",
    ecoScore: 9,
    image: "/images/recycled.jpg",
    stats: [
      "Saves thousands of liters of water",
      "Reduces textile waste",
      "Lower carbon footprint"
    ],
    tagline: "Turning waste into beauty"
  },
  {
    name: "Wool",
    ecoScore: 8,
    image: "/images/wool.jpg",
    stats: [
      "Renewable every year",
      "Long-lasting",
      "Biodegradable"
    ],
    tagline: "Natural and durable"
  },
  {
    name: "Organic Cotton",
    ecoScore: 7,
    image: "/images/cotton.jpg",
    stats: [
      "No harmful chemicals",
      "Safe for skin",
      "Biodegradable"
    ],
    tagline: "Soft and clean"
  },
  {
    name: "Bamboo",
    ecoScore: 7,
    image: "/images/bamboo.jpg",
    stats: [
      "Fast-growing",
      "Low water use",
      "Soft and breathable"
    ],
    tagline: "Lightweight comfort"
  }
]

export default function EcoGuide() {
    return (
        <div className="eco-guide">
            <div className="heading">
                <h2>Eco Friendly Crochet Guide </h2>
                <p>Make conscious choices that benefit both your craft and our planet</p>
            </div>


            <div className="material-cards">
            {materials.map((mat, index) => (
                <MaterialCard
                key={index}
                name={mat.name}
                ecoScore={mat.ecoScore}
                stats={mat.stats}
                tagline={mat.tagline}
                image={mat.image}
                />
            ))}
            </div>


            <div className="practices">
                <h2>Sustainable Practices</h2>


            </div>


            <div className="eco-stats">
                <h2>Your Impact Matters</h2>

            </div>

            <div className="eco-cert">
                <h2>Look for These Certifications!</h2>

            </div>
        </div>
    )
}