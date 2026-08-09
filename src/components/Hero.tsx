export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-glow" />
        <div className="hero-eyebrow">Available for new projects</div>
        <h1>I turn spreadsheet chaos into clean dashboards</h1>
        <p className="tagline">
          Finance teams waste 10+ hours a week on manual data entry. I build internal tools
          that automate reporting, import CSVs in seconds, and give every role the right
          access — shipped in under a week.
        </p>
        <div className="hero-pricing">
          Fixed-price projects from <strong>$1,500</strong> · Prototype in 48 hours · No hourly billing
        </div>
        <div className="hero-buttons">
          <a href="#featured" className="btn btn-primary">View Live Demo</a>
          <a href="#contact" className="btn btn-ghost">Start a Project</a>
        </div>
      </div>
    </section>
  )
}
