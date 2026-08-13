import { useEffect, useState } from 'react';
import { getDashboardSummary , getAllAssets } from '../api/assetApi';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [assets, setAssets] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getDashboardSummary().then(res =>
      setSummary(res.data));
    
    getAllAssets().then(res =>
      setAssets(res.data));
    
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <Grid container spacing={2} sx={{ minHeight: '100vh', backgroundColor: '#0a0f14', padding: 2 ,}}>
      <Grid size={3}>
        <Card sx={{backgroundColor: '#111820', color: '#e6edf3',border:"1px solid #1f8a70",borderRadius: 2, boxShadow: '0 0 15px rgba(31, 138, 112, 0.15)'}}>
          <CardContent>
            <Typography variant="h6" >Total Assets</Typography>
            <Typography variant="h4">{summary.totalAssets}</Typography>
          </CardContent></Card>
      </Grid>
      <Grid size={3}>
        <Card sx={{backgroundColor: '#111820', color: '#e6edf3',border:"1px solid #1f8a70",borderRadius: 2, boxShadow: '0 0 15px rgba(31, 138, 112, 0.15)'}}>
          <CardContent>
            <Typography variant="h6">Uptime</Typography>
            <Typography variant="h4">{(summary.uptimePercentage ?? 0).toFixed(2)}%</Typography>
          </CardContent></Card>
      </Grid>
      <Grid size={3}>
        <Card sx={{backgroundColor: '#111820', color: '#e6edf3',border:"1px solid #1f8a70",borderRadius: 2, boxShadow: '0 0 15px rgba(31, 138, 112, 0.15)'}}>
          <CardContent>
            <Typography variant="h6">Avg CPU Usage</Typography>
            <Typography variant="h4">{(summary.avgCpuUsage ?? 0).toFixed(1)}%</Typography>
          </CardContent></Card>
      </Grid>
        <Grid size={3}>
        <Card sx={{backgroundColor: '#111820', color: '#e6edf3',border:"1px solid #1f8a70",borderRadius: 2, boxShadow: '0 0 15px rgba(31, 138, 112, 0.15)'}}>
          <CardContent>
            <Typography variant="h6">Critical Alerts</Typography>
            <Typography variant="h4">{(summary.criticalAlerts ?? 0)}</Typography>
          </CardContent></Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;