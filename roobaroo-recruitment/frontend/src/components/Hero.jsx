import "../styles/Hero.css";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="overlay">

        <div className="hero-content">

          <h1>Roobaroo Recruitment Portal</h1>

          <p>
            Join MANIT's Cultural Society
            <br />
            and showcase your talent.
          </p>

          <div className="hero-buttons">

            <button className="register-btn">
              Candidate Registration
            </button>

            <button className="login-btn">
              Member Login
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;