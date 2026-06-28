import "../styles/about.css";
import { FaMusic, FaUsers, FaStar } from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about">

      <h2>Why Join Roobaroo?</h2>

      <p className="about-subtitle">
        Discover opportunities that help you perform,
        collaborate, and grow as an artist.
      </p>

      <div className="about-cards">

        <div className="about-card">

          <FaMusic className="about-icon"/>

          <h3>Perform</h3>

          <p>
            Showcase your talent on the biggest college stages and cultural events.
          </p>

        </div>

        <div className="about-card">

          <FaUsers className="about-icon"/>

          <h3>Collaborate</h3>

          <p>
            Work with passionate artists from different creative domains.
          </p>

        </div>

        <div className="about-card">

          <FaStar className="about-icon"/>

          <h3>Grow</h3>

          <p>
            Build confidence, leadership, and represent MANIT with pride.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;