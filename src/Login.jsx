import "./Login.css";
import { useNavigate } from "react-router";
import {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext.jsx";

export default function Login (){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn, setUsername } = useContext(MyContext);

    const handleSignup = () => {
       navigate("/signup");
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/authRoutes/login`,
                // "http://localhost:8080/api/authRoutes/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();
            // console.log("Login response:", data);
            // console.log("Token:", data.token); 

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            setUsername(data.username);
            setIsLoggedIn(true);
            alert("Login successful!");
            navigate("/");

        } catch (err) {
            alert(err.message);
        }
    }

    const testProtectedRoute = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:8080/api/authRoutes/test-protected",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            console.log("Protected route response:", data);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="loginPage">
            <h2>Login to OmniChatAI</h2>
            <div className="login">
               {/* <h2>Login to OmniChatAI</h2> */}
               <form onSubmit={handleSubmit}>
                    <div className="email">
                        <label> Email </label>
                        <input
                          name="email" 
                          type="email"
                          placeholder="Enter Email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
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
                        <button type="submit">Login</button>
                    </div>


                </form>
                {/* <button type="button" onClick={testProtectedRoute}>
                    Test Protected Route
                </button> */}
                <p>New User? <a className="signupBtn" onClick={handleSignup}><b>Sign Up</b></a> </p>
            </div>
        </div>
    );
}