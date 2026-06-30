import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
    
        setError("");
    
        try {
    
            const response = await axios.post(
                "http://localhost:3000/member/login",
                {
                    email,
                    password
                }
            );
            console.log(response.data);
    
            const member = response.data.member;
            console.log(member);
    
            localStorage.setItem(
                "member",
                JSON.stringify(member)
            );
    
            if (member.must_change_password) {
    
                navigate("/change-password");
    
            } else {
    
                navigate("/dashboard");
    
            }
    
        }
    
        catch (err) {
    
            setError(
                err.response?.data?.message ||
                "Login Failed"
            );
    
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