import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const { logout } = useAuth();

  const [username, setUsername] = useState("admin");
  const [email, setEmail] = useState("admin@sentinelcore.local");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleProfileSave = (e) => {
    e.preventDefault();
    setError("");
    setMessage("Profile updated successfully (demo)");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setMessage("Password changed successfully (demo)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p className="text-muted">Manage your profile and account preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile Section */}
        <div className="card">
          <div className="card-header">
            <h3>Profile</h3>
          </div>

          <div className="profile-header">
            <div className="user-avatar large">SA</div>
            <div>
              <h4 style={{ margin: 0 }}>Security Admin</h4>
              <p className="text-muted" style={{ margin: "4px 0 0" }}>Administrator</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="card">
          <div className="card-header">
            <h3>Change Password</h3>
          </div>

          {message && (
            <div className="login-error" style={{ background: "var(--success-bg)", color: "var(--success)", borderColor: "rgba(46,204,113,0.25)" }}>
              {message}
            </div>
          )}
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="input"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
        </div>

        {/* Preferences Section */}
        <div className="card">
          <div className="card-header">
            <h3>Preferences</h3>
          </div>

          <div className="preference-item">
            <div>
              <strong>Email Notifications</strong>
              <p className="text-muted">Receive alert notifications via email</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div>
              <strong>Critical Alert SMS</strong>
              <p className="text-muted">Send SMS for critical alerts</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div>
              <strong>Dark Mode</strong>
              <p className="text-muted">Use dark theme (currently enabled)</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked disabled />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card">
          <div className="card-header">
            <h3>Session</h3>
          </div>
          <p className="text-muted" style={{ marginBottom: "1.25rem" }}>
            Sign out from the current session on this device.
          </p>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;