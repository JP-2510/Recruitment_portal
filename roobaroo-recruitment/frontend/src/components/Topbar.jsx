import "../styles/topbar.css";
import { FaSearch } from "react-icons/fa";

function Topbar() {

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    return (

        <header className="topbar">

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search candidates..."
                />

            </div>

            <div className="top-right">

                <span>{formattedDate}</span>

            </div>

        </header>

    );

}

export default Topbar;