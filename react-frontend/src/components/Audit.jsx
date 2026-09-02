function Audit() {
  const logs = [
    { time: "2026-09-03 02:15", user: "admin", action: "LOGIN", resource: "SecureOps", status: "Success" },
    { time: "2026-09-03 02:10", user: "secops", action: "VIEW_INCIDENT", resource: "INC-2024-1247", status: "Success" },
    { time: "2026-09-03 01:55", user: "admin", action: "UPDATE_ASSET", resource: "DB-SRV-12", status: "Success" },
    { time: "2026-09-03 01:40", user: "auditor", action: "EXPORT_REPORT", resource: "Compliance Report", status: "Success" },
    { time: "2026-09-03 01:22", user: "unknown", action: "LOGIN_FAILED", resource: "SecureOps", status: "Blocked" },
  ];

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Audit & Compliance</h1>
          <p className="text-muted">Immutable audit logs and compliance status</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "1.5rem" }}>
        <div className="metric-card">
          <div className="card-title">Audit Logs</div>
          <div className="card-value">24.7M</div>
        </div>
        <div className="metric-card success">
          <div className="card-title">PCI DSS</div>
          <div className="card-value">100%</div>
        </div>
        <div className="metric-card success">
          <div className="card-title">SOC 2</div>
          <div className="card-value">✓</div>
        </div>
        <div className="metric-card">
          <div className="card-title">Violations</div>
          <div className="card-value">0</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td>{log.time}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.resource}</td>
                  <td>
                    <span className={`badge ${log.status === "Success" ? "badge-success" : "badge-critical"}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Audit;