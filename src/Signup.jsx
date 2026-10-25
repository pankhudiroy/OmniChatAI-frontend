import "./Login.css";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Signup (){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = () => {
        navigate("/login");
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/authRoutes/signup`,
                // "http://localhost:8080/api/authRoutes/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, username, password })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Signup failed");
            }

            alert("Signup successful!");
            navigate("/login");

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="loginPage">
            <h2>Sign Up to OmniChatAI</h2>
            <div className="login">
               <form onSubmit={handleSubmit}>
                   <div className="email" >
                        <label> Email</label>
                        <input 
                          name="email" 
                          type="email"
                          placeholder="Enter Email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>

                    <div className="username">
                        <label> Username</label>
                        <input 
                          name="username" 
                          placeholder="Enter Username"
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="password">
                        <label> Password</label>
                        <input 
                          name="password" 
                          type="password"
                          placeholder="Enter Password"
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <div className="submit">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <p>Already Registered ? <a className="signupBtn" onClick={handleLogin}><b>Login</b></a> </p>
            </div>
        </div>
    );
}