import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import VerticalGrid from "../components/VerticalGrid";
import Footer from "../components/Footer";

function Home() {

    return (
        <>
            <Navbar />

            <Hero />

            <About />

            <VerticalGrid />

            <Footer />

        </>
    );
}

export default Home;