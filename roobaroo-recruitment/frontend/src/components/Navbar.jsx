import "../styles/navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <img src={logo} alt="Roobaroo" />
        <span>Roobaroo</span>
      </div>

      <ul className="navbar-links">
        <li>Home</li>
        <li>About</li>
        <li>Recruitment</li>
      </ul>

      <button className="login-btn">
        Member Login
      </button>

    </nav>
  );
}

export default Navbar;