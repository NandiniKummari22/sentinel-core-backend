import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    if (!loggedIn) {
        return <Login onLoginSuccess={handleLogin} />;
    }

    return <Dashboard />;
}

export default App;
