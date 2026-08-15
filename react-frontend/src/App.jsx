import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    if (!token) {
        return <Login onLogin={handleLogin} />;
    }

    return <Dashboard />;
}

export default App;