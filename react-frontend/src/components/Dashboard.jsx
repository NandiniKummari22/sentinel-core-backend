import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/assetApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardSummary();
        setSummary(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading security dashboard...</div>;
  }

  if (error) {
    return (
      <div className="empty-state">
        <h3>{error}</h3>
      </div>
    );
  }

  // Sample data for Line Chart (CPU & Memory trend)
  const performanceData = [
    { time: "00:00", cpu: 32, memory: 45 },
    { time: "04:00", cpu: 28, memory: 42 },
    { time: "08:00", cpu: 45, memory: 58 },
    { time: "12:00", cpu: 62, memory: 71 },
    { time: "16:00", cpu: 55, memory: 65 },
    { time: "20:00", cpu: 48, memory: 59 },
    { time: "Now", cpu: summary?.avgCpuUsage ?? 40, memory: summary?.avgMemoryUsage ?? 50 },
  ];

  // Pie Chart data - Asset Status Distribution
  const online = summary?.onlineAssets ?? 0;
  const offline = summary?.offlineAssets ?? 0;
  const critical = summary?.criticalAlerts ?? 0;
  const total = summary?.totalAssets ?? 1;

  const statusData = [
    { name: "Online", value: online || Math.max(total - offline - critical, 0) },
    { name: "Warning", value: Math.max(Math.floor(total * 0.1), 1) },
    { name: "Critical", value: critical || 1 },
    { name: "Offline", value: offline || 1 },
  ];

  const PIE_COLORS = ["#2ecc71", "#f39c12", "#e74c3c", "#5c6b7f"];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Infrastructure Overview</h1>
          <p className="text-muted">Real-time security & infrastructure monitoring</p>
        </div>
        <div className="header-actions">
          <span className="badge badge-success">
            <span className="status-dot online"></span> Live
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="card-title">Total Assets</div>
          <div className="card-value">{summary?.totalAssets ?? 0}</div>
          <div className="card-subtitle">Servers • Cloud • Network</div>
        </div>

        <div className="metric-card success">
          <div className="card-title">Uptime</div>
          <div className="card-value">
            {(summary?.uptimePercentage ?? 0).toFixed(2)}%
          </div>
          <div className="card-subtitle">Last 30 days</div>
        </div>

        <div className="metric-card">
          <div className="card-title">Avg CPU Usage</div>
          <div className="card-value">
            {(summary?.avgCpuUsage ?? 0).toFixed(1)}%
          </div>
          <div className="card-subtitle">Across all assets</div>
        </div>

        <div className="metric-card critical">
          <div className="card-title">Critical Alerts</div>
          <div className="card-value">{summary?.criticalAlerts ?? 0}</div>
          <div className="card-subtitle">Requires attention</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-grid">
        {/* Line Chart - Performance Trend */}
        <div className="card">
          <div className="card-header">
            <h3>Performance Trend</h3>
            <span className="badge badge-neutral">CPU & Memory</span>
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2a38" />
                <XAxis
                  dataKey="time"
                  stroke="#8b9cb3"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#8b9cb3"
                  fontSize={12}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    background: "#111820",
                    border: "1px solid #1e2a38",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#1f8a70"
                  strokeWidth={2.5}
                  dot={{ fill: "#1f8a70", r: 4 }}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#3498db"
                  strokeWidth={2.5}
                  dot={{ fill: "#3498db", r: 4 }}
                  name="Memory %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Asset Status */}
        <div className="card">
          <div className="card-header">
            <h3>Asset Status Distribution</h3>
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111820",
                    border: "1px solid #1e2a38",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: "#8b9cb3", fontSize: 13 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;