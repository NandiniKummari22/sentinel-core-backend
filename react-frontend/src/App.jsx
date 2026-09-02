import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Monitoring from "./components/Monitoring";   
import Alerts from "./components/Alerts";
import Incidents from "./components/Incidents";
import Audit from "./components/Audit"; 
import  Settings from "./components/Settings";           

function App() {
  const { accessToken } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!accessToken) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "assets":
        return <Monitoring />;        
      case "incidents":
        return <Incidents />;
      case "alerts":
        return <Alerts />;
      case "reports":
        return <Audit />;               
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Topbar />
        <main className="page-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;