import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";
import CandidateList from "./CandidateList";
import Evaluation from "./Evaluation";
import UploadPhotos from "./UploadPhotos";

function Dashboard() {

    const member = JSON.parse(localStorage.getItem("member"));

    const [activePage, setActivePage] = useState("dashboard");

    return (

        <div className="dashboard-container">

            <Sidebar
                member={member}
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <div className="dashboard-main">

                <Topbar member={member} />

                <div className="dashboard-content">

{

    activePage === "dashboard" && (

        <>

            <div className="hero">

                <div className="hero-left">

                    <h1>

                        👋 Welcome Back,

                        <br/>

                        <span>{member.full_name}</span>

                    </h1>

                    <p>

                        {member.role}

                        •

                        Vocalist

                    </p>

                    <h4>

                        Manage recruitment, candidate evaluations,
                        uploads and selections from one place.

                    </h4>

                </div>

            </div>

        </>

    )

}

{

    activePage === "candidates" && (

        <CandidateList/>

    )}

{activePage === "evaluation" && (

<Evaluation />

)}

{activePage === "uploadPhotos" && (

<UploadPhotos />

)}

</div>


            </div>

        </div>

    );

}

export default Dashboard;