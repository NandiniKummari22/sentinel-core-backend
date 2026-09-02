function Incidents() {
  const incidents = [
    {
      id: "INC-2024-1247",
      title: "Failed Login Attempts",
      severity: "High",
      status: "Investigation",
      assignee: "Security Team",
      sla: "2 hours",
      mttr: "47 min",
      impact: "5 failed logins | User admin locked",
    },
    {
      id: "INC-2024-1241",
      title: "Suspicious Outbound Traffic",
      severity: "Critical",
      status: "Open",
      assignee: "Network Team",
      sla: "1 hour",
      mttr: "—",
      impact: "Unusual data transfer detected",
    },
    {
      id: "INC-2024-1238",
      title: "Privilege Escalation Attempt",
      severity: "High",
      status: "Resolved",
      assignee: "Security Team",
      sla: "4 hours",
      mttr: "1h 12m",
      impact: "Blocked successfully",
    },
  ];

  const getSeverityBadge = (severity) => {
    if (severity === "Critical") return <span className="badge badge-critical">Critical</span>;
    if (severity === "High") return <span className="badge badge-warning">High</span>;
    return <span className="badge badge-info">{severity}</span>;
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Incident Management</h1>
          <p className="text-muted">Security incident tracking & resolution workflow</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "1.5rem" }}>
        <div className="metric-card critical">
          <div className="card-title">Active Incidents</div>
          <div className="card-value">23</div>
        </div>
        <div className="metric-card">
          <div className="card-title">MTTR</div>
          <div className="card-value">47 min</div>
        </div>
        <div className="metric-card success">
          <div className="card-title">Resolved</div>
          <div className="card-value">2,847</div>
        </div>
        <div className="metric-card">
          <div className="card-title">SLA Compliance</div>
          <div className="card-value">98%</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>SLA</th>
                <th>MTTR</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id}>
                  <td><strong>{inc.id}</strong></td>
                  <td>{inc.title}</td>
                  <td>{getSeverityBadge(inc.severity)}</td>
                  <td>{inc.status}</td>
                  <td>{inc.assignee}</td>
                  <td>{inc.sla}</td>
                  <td>{inc.mttr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Incidents;