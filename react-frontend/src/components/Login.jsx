import { useState } from "react";
import { login } from "../api/authApi"; 
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Card, CardContent, Typography, Alert } from "@mui/material";
import axios from "axios";

function Login( { onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login(username, password);
            console.log("LOGIN RESPONSE: ",res.data);
            loginUser(res.data.accessToken, res.data.refreshToken);
            onLoginSuccess();
        } catch (err) {
            console.log("LOGIN ERROR: ",err);
            setError("Invalid username or password.");
        }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    SentinelCore Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" type="submit" style={{marginTop: "16px"}}>
                        LOGIN
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default Login;