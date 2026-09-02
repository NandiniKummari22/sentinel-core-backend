import { useEffect, useState } from "react";
import { searchAssets } from "../api/assetApi";

function Monitoring() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const size = 8;

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await searchAssets(search, status, page, size);
      setAssets(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchAssets();
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "CRITICAL") return <span className="badge badge-critical">CRITICAL</span>;
    if (s === "WARNING") return <span className="badge badge-warning">WARNING</span>;
    if (s === "ONLINE" || s === "ACTIVE") return <span className="badge badge-success">ONLINE</span>;
    return <span className="badge badge-neutral">{status || "UNKNOWN"}</span>;
  };

  return (
    <div className="monitoring-page">
      <div className="dashboard-header">
        <div>
          <h1>Asset Monitoring</h1>
          <p className="text-muted">Search, filter and monitor all infrastructure assets</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            className="input"
            placeholder="Search by asset name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "320px" }}
          />

          <select
            className="input"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            style={{ maxWidth: "180px" }}
          >
            <option value="">All Status</option>
            <option value="ONLINE">Online</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
            <option value="OFFLINE">Offline</option>
          </select>

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Results Info */}
      <div style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
        Showing {assets.length} of {totalElements} assets
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div className="loading">Loading assets...</div>
        ) : error ? (
          <div className="empty-state"><h3>{error}</h3></div>
        ) : assets.length === 0 ? (
          <div className="empty-state">
            <h3>No assets found</h3>
            <p>Try changing your search or filter</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>IP Address</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td><strong>{asset.asset_name}</strong></td>
                    <td>{asset.assetType || asset.asset_type}</td>
                    <td>{getStatusBadge(asset.status)}</td>
                    <td>{asset.ip_address}</td>
                    <td>{asset.cpu_usage != null ? `${asset.cpu_usage}%` : "—"}</td>
                    <td>{asset.memory_usage != null ? `${asset.memory_usage}%` : "—"}</td>
                    <td>{asset.location || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary btn-sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="btn btn-secondary btn-sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Monitoring;