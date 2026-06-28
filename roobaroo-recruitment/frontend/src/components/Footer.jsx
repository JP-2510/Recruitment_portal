import "../styles/footer.css";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-content">

        <img
          src={logo}
          alt="Roobaroo Logo"
          className="footer-logo"
        />

        <h2>ROOBAROO</h2>

        <p className="footer-title">
          Recruitment Portal
        </p>

        <p className="footer-description">
          Maulana Azad National Institute of Technology, Bhopal
        </p>

        <div className="footer-links">

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#recruitment">Recruitment</a>

        </div>

        <div className="footer-divider"></div>

        <p className="copyright">

          © {new Date().getFullYear()} Roobaroo, MANIT Bhopal

        </p>

        <p className="developer">

          Designed & Developed by <span>Jatin Parmar</span>

        </p>

      </div>

    </footer>
  );
}

export default Footer;