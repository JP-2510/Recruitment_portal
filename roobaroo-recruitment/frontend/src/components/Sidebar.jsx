import {
    FaHome,
    FaUsers,
    FaClipboardCheck,
    FaCamera,
    FaUserCog,
    FaAward,
    FaSignOutAlt
} from "react-icons/fa";

import logo from "../assets/logo.png";

import "../styles/sidebar.css";

const menuItems = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: FaHome,
        roles: [
            "Coordinator",
            "Head",
            "3rd Year Member",
            "2nd Year Member"
        ]
    },
    {
        id: "candidates",
        title: "Candidate List",
        icon: FaUsers,
        roles: [
            "Coordinator",
            "Head",
            "3rd Year Member",
            "2nd Year Member"
        ]
    },
    {
        id: "evaluation",
        title: "Evaluation",
        icon: FaClipboardCheck,
        roles: [
            "Coordinator",
            "Head",
            "3rd Year Member"
        ]
    },
    {
        id: "upload",
        title: "Upload Photos",
        icon: FaCamera,
        roles: [
            "Coordinator",
            "Head",
            "2nd Year Member"
        ]
    },
    {
        id: "members",
        title: "Manage Members",
        icon: FaUserCog,
        roles: ["Coordinator"]
    },
    {
        id: "selection",
        title: "Final Selection",
        icon: FaAward,
        roles: ["Head"]
    }
];

function Sidebar({
    member,
    activePage,
    setActivePage
}) {

    const logout = () => {

        localStorage.clear();

        window.location.href="/login";

    };

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo-section">

                    <img
                        src={logo}
                        alt="logo"
                    />

                    <h2>Roobaroo</h2>

                    <span>Recruitment Portal</span>

                </div>

                <nav>

                    {

                        menuItems

                        .filter(item =>
                            item.roles.includes(member.role)
                        )

                        .map(item=>{

                            const Icon=item.icon;

                            return(

                                <button

                                    key={item.id}

                                    className={
                                        activePage===item.id
                                        ?
                                        "menu active"
                                        :
                                        "menu"
                                    }

                                    onClick={()=>

                                        setActivePage(item.id)

                                    }

                                >

                                    <Icon/>

                                    <span>

                                        {item.title}

                                    </span>

                                </button>

                            );

                        })

                    }

                </nav>

            </div>

            <div className="sidebar-footer">

                <div className="member-box">

                    <div className="avatar">

                        {member.full_name.charAt(0)}

                    </div>

                    <div>

                        <h4>

                            {member.full_name}

                        </h4>

                        <p>

                            {member.role}

                        </p>

                    </div>

                </div>

                <button
                    className="logout"
                    onClick={logout}
                >

                    <FaSignOutAlt/>

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;