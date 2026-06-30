import "../styles/welcomeCard.css";

function WelcomeCard({ member }) {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const formattedDate = today.toLocaleDateString("en-IN", options);

    return (

        <div className="welcome-card">

            <div className="welcome-left">

                <h1>

                    Welcome Back 👋

                </h1>

                <h2>

                    {member.full_name}

                </h2>

                <p>

                    {member.role}

                </p>

            </div>

            <div className="welcome-right">

                <h3>

                    {formattedDate}

                </h3>

                <p>

                    Recruitment Dashboard

                </p>

            </div>

        </div>

    );

}

export default WelcomeCard;