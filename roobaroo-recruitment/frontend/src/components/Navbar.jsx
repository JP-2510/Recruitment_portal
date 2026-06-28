import "../styles/navbar.css";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="navbar-left">

        <Link to="/">
          <img src={logo} alt="Roobaroo Logo" className="logo"/>
        </Link>

      </div>

      <ul className={menuOpen ? "nav-links active-menu" : "nav-links"}>

        <li className="active">
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#recruitment">Recruitment</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>

      </ul>

      <div className="navbar-right">

        <Link to="/login">

          <button className="login-btn">

            <FaUser />

            Member Login

          </button>

        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </button>

      </div>

    </nav>

  );
}

export default Navbar;