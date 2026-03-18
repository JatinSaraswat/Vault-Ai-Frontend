import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ShieldAlert, 
  History, 
  Settings,
  Search,
  Bell,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './index.css';

const performanceData = [
  { name: 'Jan', yield: 4.2 },
  { name: 'Feb', yield: 4.8 },
  { name: 'Mar', yield: 5.1 },
  { name: 'Apr', yield: 4.9 },
  { name: 'May', yield: 6.2 },
  { name: 'Jun', yield: 7.5 },
  { name: 'Jul', yield: 8.1 },
];

const allocationData = [
  { name: 'Aave V3 (USDC)', value: 45, color: '#6366f1' },
  { name: 'Curve (3pool)', value: 30, color: '#ec4899' },
  { name: 'Compound (DAI)', value: 15, color: '#10b981' },
  { name: 'Cash Reserve', value: 10, color: '#94a3b8' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">
             <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700 }}>TRADING PLATFORM</h1>
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
          <a href="#" className="nav-item"><TrendingUp size={20} /> Strategies</a>
          <a href="#" className="nav-item"><ShieldAlert size={20} /> Risk Hub</a>
          <a href="#" className="nav-item"><History size={20} /> Transactions</a>
          <div style={{ flex: 1 }}></div>
          <a href="#" className="nav-item"><Settings size={20} /> Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input type="text" placeholder="Search assets, strategies..." />
          </div>
          <div className="header-actions">
            <button className="action-btn"><Bell size={20} /></button>
            <button className="connect-wallet">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wallet size={18} /> Connect Wallet
              </span>
            </button>
          </div>
        </header>

        <div className="dashboard-container">
          <div className="animate-fade-in">
            <h2 className="page-title">Portfolio Overview</h2>
            <p className="page-subtitle">ML-driven yield optimization is active.</p>
          </div>

          <div className="stats-grid animate-fade-in delay-1">
            <div className="stat-card glass-panel">
              <div className="stat-header">
                Total Value <Activity size={18} className="stat-icon" />
              </div>
              <div className="stat-value">$124,592.50</div>
              <div className="stat-change change-positive">
                <ArrowUpRight size={14} /> +12.5% this month
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-header">
                Avg. APY <TrendingUp size={18} className="stat-icon" />
              </div>
              <div className="stat-value text-gradient">14.2%</div>
              <div className="stat-change change-positive">
                <ArrowUpRight size={14} /> +2.1% vs baseline
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-header">
                Risk Score <ShieldAlert size={18} className="stat-icon" />
              </div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>Low (A)</div>
              <div className="stat-change text-muted">Protected by ML heuristics</div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-header">
                Auto-Rebalances <History size={18} className="stat-icon" />
              </div>
              <div className="stat-value">24</div>
              <div className="stat-change change-positive">Saved $450 in gas</div>
            </div>
          </div>

          <div className="content-grid animate-fade-in delay-2">
            <div className="chart-section glass-panel">
              <div className="section-header">
                <h3 className="section-title">Yield Performance</h3>
                <div className="pill-nav">
                  <span className="pill">1W</span>
                  <span className="pill">1M</span>
                  <span className="pill active">6M</span>
                  <span className="pill">1Y</span>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                    <Area type="monotone" dataKey="yield" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-section glass-panel">
              <div className="section-header">
                <h3 className="section-title">Current Allocation</h3>
                <PieChartIcon size={20} color="var(--text-muted)" />
              </div>
              <div className="allocation-list" style={{ flex: 1 }}>
                {allocationData.map((item, index) => (
                  <div key={index} className="allocation-item">
                    <div className="alloc-info">
                      <div className="alloc-logo" style={{ background: `${item.color}20`, color: item.color }}>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="alloc-name">{item.name}</div>
                        <div className="alloc-protocol">via Smart Router</div>
                      </div>
                    </div>
                    <div className="alloc-stats">
                      <div className="alloc-value">{item.value}%</div>
                      <div className="alloc-apy">+{(Math.random() * 10 + 5).toFixed(1)}% APY</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
