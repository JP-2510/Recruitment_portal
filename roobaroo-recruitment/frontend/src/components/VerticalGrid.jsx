import "../styles/vertical.css";

import {
  FaMicrophone,
  FaGuitar,
  FaCamera,
  FaPaintBrush,
  FaVideo,
  FaHandshake,
  FaBullhorn,
  FaMusic
} from "react-icons/fa";

function VerticalGrid() {
  return (
    <section className="vertical-section" id="recruitment">

      <h2>Recruitment Verticals</h2>

      <p>
        Choose the domain where your passion belongs.
      </p>

      {/* Performing Arts */}

      <div className="category">

        <h3>🎭 Performing Arts</h3>

        <div className="vertical-grid">

          <div className="vertical-card">
            <FaMicrophone />
            <span>Vocalist</span>
          </div>

          <div className="vertical-card">
            <FaMusic />
            <span>Dancer</span>
          </div>

          <div className="vertical-card">
            <FaGuitar />
            <span>Instrumentalist</span>
          </div>

          <div className="vertical-card">
            <FaBullhorn />
            <span>Anchor</span>
          </div>

        </div>

      </div>

      {/* Creative */}

      <div className="category">

        <h3>🎨 Creative Media</h3>

        <div className="vertical-grid">

          <div className="vertical-card">
            <FaPaintBrush />
            <span>Graphic Designer</span>
          </div>

          <div className="vertical-card">
            <FaVideo />
            <span>Video Editor</span>
          </div>

          <div className="vertical-card">
            <FaCamera />
            <span>Photography</span>
          </div>

          <div className="vertical-card">
            <FaMusic />
            <span>Audio Editor</span>
          </div>

        </div>

      </div>

      {/* Management */}

      <div className="category">

        <h3>🤝 Management</h3>

        <div className="vertical-grid">

          <div className="vertical-card">
            <FaHandshake />
            <span>Sponsorship</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default VerticalGrid;