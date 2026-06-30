import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const navigate = useNavigate();

    const handleChangePassword = async () => {
    
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        const member = JSON.parse(localStorage.getItem("member"));
    
        try {
    
            await axios.put(
                "http://localhost:3000/member/change-password",
                {
    
                    member_id: member.member_id,
    
                    currentPassword,
    
                    newPassword
    
                }
            );
    
            alert("Password Changed Successfully");
    
            navigate("/dashboard");
    
        }
    
        catch(err){
    
            alert(
                err.response?.data?.message ||
                "Unable to Change Password"
            );
    
        }
    
    };


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <div
                style={{
                    width: "400px"
                }}
            >

                <h2>Change Password</h2>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e)=>setCurrentPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <br /><br />

                <button
    onClick={handleChangePassword}
>

    Change Password

</button>

            </div>

        </div>

    );

}

export default ChangePassword;