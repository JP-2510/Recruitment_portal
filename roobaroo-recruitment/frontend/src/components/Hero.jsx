import "../styles/hero.css";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-container">

        <img
          src={logo}
          alt="Roobaroo"
          className="hero-logo"
        />

        <p className="hero-tag">
          THE CULTURAL SOCIETY OF MANIT BHOPAL
        </p>

        <h1>ROOBAROO</h1>

        <h2>Recruitment Portal</h2>

        <p className="hero-description">
          Discover your talent.
          <br />
          Perform. Create. Lead.
        </p>

        <div className="hero-buttons">

          <Link to="/register">

            <button className="primary-btn">
              Candidate Registration
            </button>

          </Link>

          <Link to="/login">

            <button className="secondary-btn">
              Member Login
            </button>

          </Link>

        </div>

      </div>

     

    </section>
  );
}

export default Hero;