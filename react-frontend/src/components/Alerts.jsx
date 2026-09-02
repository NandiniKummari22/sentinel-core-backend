function Alerts() {
  const alerts = [
    { id: 1, asset: "DB-SRV-12", message: "CPU usage reached 94%", severity: "CRITICAL", time: "2 min ago", status: "OPEN" },
    { id: 2, asset: "APP-SRV-07", message: "Memory usage at 87%", severity: "WARNING", time: "18 min ago", status: "OPEN" },
    { id: 3, asset: "NET-GW-03", message: "Unusual traffic pattern detected", severity: "INFO", time: "1 hour ago", status: "OPEN" },
    { id: 4, asset: "WEB-SRV-02", message: "Disk usage crossed 90%", severity: "WARNING", time: "3 hours ago", status: "ACKNOWLEDGED" },
    { id: 5, asset: "DB-SRV-05", message: "Connection pool exhausted", severity: "CRITICAL", time: "5 hours ago", status: "RESOLVED" },
  ];

  const getSeverityBadge = (severity) => {
    if (severity === "CRITICAL") return <span className="badge badge-critical">CRITICAL</span>;
    if (severity === "WARNING") return <span className="badge badge-warning">WARNING</span>;
    return <span className="badge badge-info">INFO</span>;
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Alerts</h1>
          <p className="text-muted">Active and historical security & infrastructure alerts</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "1.5rem" }}>
        <div className="metric-card critical">
          <div className="card-title">Open Critical</div>
          <div className="card-value">2</div>
        </div>
        <div className="metric-card warning">
          <div className="card-title">Warnings</div>
          <div className="card-value">2</div>
        </div>
        <div className="metric-card">
          <div className="card-title">Total Today</div>
          <div className="card-value">12</div>
        </div>
        <div className="metric-card success">
          <div className="card-title">Resolved</div>
          <div className="card-value">8</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Message</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td><strong>{alert.asset}</strong></td>
                  <td>{alert.message}</td>
                  <td>{getSeverityBadge(alert.severity)}</td>
                  <td>{alert.status}</td>
                  <td className="text-muted">{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Alerts;