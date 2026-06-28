import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/success.css";

function Success() {

    const location = useLocation();
    const navigate = useNavigate();

    const ttrId =
    location.state?.ttr_id ||
    localStorage.getItem("ttr_id") ||
    "N/A";

    return (

        <>
            <Navbar />

            <section className="success-page">

                <div className="success-card">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>Registration Successful</h1>

                    <p className="success-text">
                        Thank you for registering for the
                        Roobaroo Recruitment Process.
                    </p>

                    <div className="ttr-box">

                        <span>Your TTR ID</span>

                        <h2>{ttrId}</h2>

                    </div>

                    <p className="note">

                        Please save this ID carefully.
                        It will be required during future
                        recruitment rounds.

                    </p>

                    <div className="success-buttons">

                        <button
                            onClick={() => navigate("/register")}
                        >
                            Register Another Candidate
                        </button>

                        <button
                            className="home-btn"
                            onClick={() => navigate("/")}
                        >
                            Go To Home
                        </button>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Success;