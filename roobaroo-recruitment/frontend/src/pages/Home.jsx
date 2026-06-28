import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import VerticalGrid from "../components/VerticalGrid";
import Footer from "../components/Footer";

function Home() {

    const navigate = useNavigate();

    const [savedTtrId, setSavedTtrId] = useState(null);

    useEffect(() => {

        const id = localStorage.getItem("ttr_id");

        if (id) {
            setSavedTtrId(id);
        }

    }, []);

    return (
        <>
            <Navbar />

            <Hero />

            {savedTtrId && (

                <section className="registered-card">

                    <h2>Already Registered?</h2>

                    <p>Your TTR ID</p>

                    <h1>{savedTtrId}</h1>

                    <p>
                        You have already registered for the
                        Roobaroo Recruitment Process.
                    </p>

                    <button
                        onClick={() =>
                            navigate(`/candidate/${savedTtrId}`)
                        }
                    >
                        View My Profile
                    </button>

                </section>

            )}

            <About />

            <VerticalGrid />

            <Footer />

        </>
    );
}

export default Home;