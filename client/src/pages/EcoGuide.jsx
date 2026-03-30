import { useEffect, useRef, useState } from 'react'
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

function Counter({ end, suffix = '', duration = 5000, startAnimation }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let start = 0
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment

      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration, startAnimation])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function EcoGuide() {
  const impactRef = useRef(null)
  const [startCounters, setStartCounters] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounters(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (impactRef.current) {
      observer.observe(impactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="eco-guide">
      <div className="hero-top">
        Sustainable Creations
      </div>

      <div className="heading">
        <h2>Eco Friendly Crochet Guide</h2>
        <p>Make conscious choices that benefit both your craft and our planet</p>
        <img src="images/ecohero.jpg" alt="yarn" />
      </div>

      <div className="materials">
        <h2>Sustainable Materials</h2>
        <p>Choose yarns that are kind to the enviroment and ethically produced!</p>

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
      </div>

      <div className="practices-section">
        <h2>Sustainable Crochet Practices</h2>
        <div className="practices-grid">
          <div className="practice-card">
            <img src="/images/practice1.png" alt="Yarn" className="practice-icon" />
            <h3>Use What You Already Have</h3>
            <p>
              Before buying new yarn, look through your stash for colors and textures
              you can reuse. Making the most of what you already own helps reduce waste and saves money.
            </p>
          </div>

          <div className="practice-card">
            <img src="/images/practice2.png" alt="Leaf" className="practice-icon" />
            <h3>Choose Better Fibers</h3>
            <p>
              When possible, pick natural, recycled, or responsibly made yarns like organic cotton,
              bamboo, wool, or recycled blends.
            </p>
          </div>

          <div className="practice-card">
            <img src="/images/practice3.png" alt="Yarn" className="practice-icon" />
            <h3>Make Projects You’ll Actually Use</h3>
            <p>
              Focus on creating items that are useful, loved, and likely to last.
              Thoughtful projects help reduce waste.
            </p>
          </div>

          <div className="practice-card">
            <img src="/images/practice4.png" alt="Scrap" className="practice-icon" />
            <h3>Save and Reuse Scraps</h3>
            <p>
              Small yarn leftovers can become flowers, granny squares, stuffing,
              or other creative details instead of being thrown away.
            </p>
          </div>

          <div className="practice-card">
            <img src="/images/practice5.png" alt="Water Bin" className="practice-icon" />
            <h3>Care for Handmade Items Gently</h3>
            <p>
              Wash and store crochet projects carefully so they last longer and stay in use.
            </p>
          </div>

          <div className="practice-card">
            <img src="/images/practice6.png" alt="Stars" className="practice-icon" />
            <h3>Support Slow Crafting</h3>
            <p>
              Take your time, create intentionally, and value the handmade process.
              Mindful crafting is part of sustainability too.
            </p>
          </div>
        </div>
      </div>

      <div className="impact-section" ref={impactRef}>
        <h2>Your Impact Matters</h2>
        <p className="impact-intro">
          Every stitch you make can be a step toward a more sustainable future.
        </p>

        <div className="impact-cards">
          <div className="impact-card">
            <h3>
              <Counter end={85} suffix="%" startAnimation={startCounters} />
            </h3>
            <p>of textiles end up in landfills each year.</p>
            <span>Choosing handmade pieces helps reduce waste.</span>
          </div>

          <div className="impact-card">
            <h3>
              <Counter end={2700} suffix="L" startAnimation={startCounters} />
            </h3>
            <p>of water is used to make a single garment.</p>
            <span>Better material choices can lower this impact.</span>
          </div>

          <div className="impact-card">
            <h3>
              <Counter end={3} suffix="x" startAnimation={startCounters} />
            </h3>
            <p>longer use can make handmade pieces more meaningful.</p>
            <span>Slow crafting supports sustainability.</span>
          </div>
        </div>
      </div>

      <div className="eco-cert">
        <h2>Look for These Certifications!</h2>

        <div className="cert-grid">
          <div className="cert-card">
            <img src="/images/gots.png" className="cert-icon" />
            <h3>GOTS</h3>
            <p>Ensures fibers are organic and processed sustainably.</p>
          </div>

          <div className="cert-card">
            <img src="/images/oeko.png" className="cert-icon" />
            <h3>OEKO-TEX</h3>
            <p>Safe for skin and free from harmful chemicals.</p>
          </div>

          <div className="cert-card">
            <img src="/images/rws.png" className="cert-icon" />
            <h3>RWS</h3>
            <p>Supports ethical wool production and animal care.</p>
          </div>

          <div className="cert-card">
            <img src="/images/grs.png" className="cert-icon" />
            <h3>GRS</h3>
            <p>Verifies recycled materials and eco-friendly processes.</p>
          </div>

          <div className="cert-card">
            <img src="/images/fsc.png" className="cert-icon" />
            <h3>FSC</h3>
            <p>Promotes responsible forest and bamboo sourcing.</p>
          </div>

          <div className="cert-card">
            <img src="/images/fairtrade.png" className="cert-icon" />
            <h3>Fair Trade</h3>
            <p>Ensures fair wages and safe working conditions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}