import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <h2>ROOBAROO</h2>
      </div>

      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#verticals">Verticals</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="login-btn">
        Member Login
      </button>

    </nav>
  );
}

export default Navbar;