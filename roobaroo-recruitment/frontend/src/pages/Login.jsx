import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (
            email === "admin@roobaroo.in" &&
            password === "roobaroo123"
        ) {

            localStorage.setItem(
                "memberLoggedIn",
                "true"
            );

            localStorage.setItem(
                "memberName",
                "Technical Team"
            );

            navigate("/dashboard");

        }

        else {

            setError("Invalid Email or Password");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Roobaroo</h1>

                <h2>Member Login</h2>

                <p className="login-subtitle">

                    Authorized members only

                </p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {error && (

                        <p className="login-error">

                            {error}

                        </p>

                    )}

                    <button type="submit">

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;