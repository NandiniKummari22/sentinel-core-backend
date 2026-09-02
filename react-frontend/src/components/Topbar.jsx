import { useAuth } from "../context/AuthContext";

function Topbar() {
  const { logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="page-title">Security Operations Center</h2>
      </div>

      <div className="topbar-right">
        <div className="topbar-item">
          <span className="notification-badge">3</span>
          <span>🔔</span>
        </div>

        <div className="user-menu">
          <div className="user-avatar">SA</div>
          <div className="user-info">
            <span className="user-name">Security Admin</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;