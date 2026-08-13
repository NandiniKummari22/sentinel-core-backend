import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                {
                    username: username,
                    password: password
                }
            );

            const token = response.data.token;

            // Store the JWT token
            localStorage.setItem("token", token);

            axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;

            setMessage("Login successful!");

            // Tell App.jsx that login succeeded
            onLogin(token);

        } catch (error) {
            console.error(error);
            setMessage("Login failed. Check username and password.");
        }
    };

    return (
        <div>
            <h2>SentinelCore Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;