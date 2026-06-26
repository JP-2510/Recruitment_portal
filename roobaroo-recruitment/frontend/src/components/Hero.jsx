import "../styles/hero.css";
import logo from "../assets/logo.png";

function Hero() {
  return (
    <section className="hero">

      <div className="background-glow"></div>

      <img
        src={logo}
        alt="Roobaroo"
        className="watermark-logo"
      />

      <div className="hero-content">

        <img
          src={logo}
          alt="Roobaroo Logo"
          className="hero-logo"
        />

        <span className="tag">
          MANIT Bhopal Cultural Society
        </span>

        <h1>Roobaroo</h1>

        <h2>Recruitment Portal 2026</h2>

        <p>
          Discover your talent.
          Perform. Create. Lead.
        </p>

        <div className="hero-buttons">

          <button className="register-btn">
            Candidate Registration
          </button>

          <button className="member-btn">
            Member Login
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;