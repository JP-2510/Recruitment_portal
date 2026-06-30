import "../styles/navbar.css";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <nav className="navbar">

            <Link to="/" className="logo-section">

                <img
                    src={logo}
                    alt="Roobaroo"
                    className="logo"
                />

            </Link>

            <ul className={menuOpen ? "nav-links active" : "nav-links"}>

                <li><a href="#home">Home</a></li>

                <li><a href="#about">About</a></li>

                <li><a href="#recruitment">Recruitment</a></li>

                <li><a href="#contact">Contact</a></li>

            </ul>

            <Link to="/login" className="login-link">

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

        </nav>

    );

}

export default Navbar;