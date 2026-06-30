import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";

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

<div className="cards">

<div className="home-card">

    <h2>Candidate List</h2>

    <p>

        View and manage all registered candidates.

    </p>

</div>

<div className="home-card">

    <h2>Evaluation</h2>

    <p>

        Evaluate candidates according to your role.

    </p>

</div>

<div className="home-card">

    <h2>Upload Photos</h2>

    <p>

        Upload and manage candidate photographs.

    </p>

</div>

<div className="home-card">

    <h2>Members</h2>

    <p>

        Manage recruitment team members.

    </p>

</div>

</div>


            </div>

        </div>

    );

}

export default Dashboard;