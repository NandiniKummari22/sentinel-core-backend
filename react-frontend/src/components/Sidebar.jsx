function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "▣" },
    { id: "assets", label: "Assets", icon: "◉" },
    { id: "incidents", label: "Incidents", icon: "⛨" },
    { id: "alerts", label: "Alerts", icon: "⚠" },
    { id: "reports", label: "Reports", icon: "☰" },
    { id: "settings", label: "Settings", icon: "⚙" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>◆</span> SentinelCore
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className="status-dot online"></span>
          <span>System Operational</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;