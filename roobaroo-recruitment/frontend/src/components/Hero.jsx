import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";
import logo from "../assets/logo.png";

function Hero() {

    const navigate = useNavigate();

    const [ttrId, setTtrId] = useState(null);

    useEffect(() => {

        const savedId = localStorage.getItem("ttr_id");

        if (savedId) {
            setTtrId(savedId);
        }

    }, []);

    return (

        <section className="hero" id="home">

            <div className="hero-container">

                <p className="hero-tag">
                    THE CULTURAL SOCIETY OF MANIT BHOPAL
                </p>

                <h1>TICKET TO ROOBAROO</h1>

                <h2>Recruitment Portal</h2>

                <p className="hero-description">
                    Discover your talent.
                    <br />
                    Perform. Create. Lead.
                </p>

                <div className="hero-buttons">

                    {!ttrId ? (

                        <button
                            onClick={() => navigate("/register")}
                        >
                            Register Now
                        </button>

                    ) : (

                        <div className="registered-box">

                            <p className="welcome-back">
                                Welcome Back 👋
                            </p>

                            <span>Your TTR ID</span>

                            <h2>{ttrId}</h2>

                            <div className="registered-buttons">

                                <button
                                    onClick={() =>
                                        navigate(`/candidate/${ttrId}`)
                                    }
                                >
                                    View My Profile
                                </button>

                                <button
                                    className="secondary-btn"
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                >
                                    Register Another Candidate
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

}

export default Hero;