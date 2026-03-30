// Introduction + Sustainability Stats

export default function Home() {
  return (
    <div id="home-page">
      <div className="hero">
        <img src="/images/yarn-ball.png" alt="Yarn Ball" className="yarn-one" />
        <img src="/images/yarn-ball2.png" alt="Yarn Ball" className="yarn-two" />
        <img src="/images/yarn-ball3.png" alt="Yarn Ball" className="yarn-three" />
        <img src="/images/crochet.png" alt="Crochet Hook" className="crochet-one" />
        <img src="/images/crochet2.png" alt="Crochet Hook" className="crochet-two" />

        <div className="hero-top">
          Sustainable Creations
        </div>

        <div className="hero-left">
          <h2>Sugar Stitch</h2>
          <p>Crochet made simple, sustainable, and sweet.</p>
        </div>
      </div>

      <div className="about-us">
        <h3>Who are we?</h3>
        <p>
          At Sugar Stitch, our mission is to create a cozy, supportive space
          where crocheters of all levels can learn, stay motivated, and create
          with intention. We help beginners build confidence, guide makers in
          finishing their projects, and promote sustainable practices—one stitch
          at a time.
        </p>
        <button>Join Us!</button>
      </div>

      <div className="info-cards">
        <h2>Why you'll love Sugar Stitch!</h2>

        <div className="cards-group">
          <div className="cards" id="card-three">
            <img src="/images/creative-mind.png" alt="Light bulb" />
            <h2>Learn With Confidence</h2>
            <p>
              Step by step patterns designed for beginner and growing
              crocheters.
            </p>
          </div>

          <div className="cards" id="card-one">
            <div className="tape"></div>
            <img src="/images/eco-starter.png" alt="Leaf in a pot" />
            <h2>Crochet Sustainability</h2>
            <p>
              Make thoughtful choices with eco-friendly yarn suggestions and
              tips.
            </p>
          </div>

          <div className="cards" id="card-two">
            <div className="tape"></div>
            <img src="/images/first-stitch.png" alt="Crown" />
            <h2>Stay Motivated</h2>
            <p>
              Track your progress, complete patterns, and earn achievements as
              you go. Turn every stitch into a rewarding journey.
            </p>
          </div>
        </div>
      </div>

      <div className="statistics"></div>
    </div>
  )
}