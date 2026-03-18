import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, List, BarChart2, Star, Search, User, Settings, X, Plus, 
  ArrowUpRight, ArrowDownRight, Target, Clock, ChevronDown, CheckCircle, AlertCircle,
  Minus, Brain, Zap, Shield, TrendingUp, Info, Activity, Layers, Bell
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RePie, Pie, Cell
} from 'recharts';
import './index.css';
import Markets from './pages/Markets.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Profile from './pages/Profile.jsx';
import SettingsPage from './pages/Settings.jsx';

// Data Generation with Prediction
const generateData = () => {
  const base = Array.from({ length: 40 }, (_, i) => ({
    time: `${Math.floor(i / 6) + 12}:00`,
    uv: 3000 + Math.random() * 2000,
    pv: 2000 + Math.random() * 1000,
    isPrediction: false
  }));
  
  // Add 10 prediction points
  const lastTime = 18;
  for (let i = 1; i <= 10; i++) {
    base.push({
      time: `${(lastTime + i) % 24}:00`,
      uv: base[base.length-1].uv + (Math.random() - 0.4) * 400,
      pv: base[base.length-1].pv + (Math.random() - 0.4) * 200,
      isPrediction: true
    });
  }
  return base;
};

// --- Sub-components ---

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { icon: Home, path: '/', label: 'Vault' },
    { icon: List, path: '/markets', label: 'Markets' },
    { icon: BarChart2, path: '/portfolio', label: 'Portfolio' },
    { icon: Star, path: '/watchlist', label: 'Watchlist' },
    { icon: User, path: '/profile', label: 'Profile' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">
        <Brain size={24} color="white" />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
        {navItems.map(item => (
          <div 
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <item.icon size={20} />
          </div>
        ))}
      </div>
      <div className="nav-item">
        <Bell size={20} />
      </div>
    </aside>
  );
}

function AIControlPanel() {
  return (
    <div className="ai-header glass-panel" style={{ padding: '0 20px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div className="ai-status-pulse">
          <div className="pulse-dot"></div>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-green)', letterSpacing: '0.5px' }}>
            VaultAI: ACTIVE
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Strategy</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>Balanced Growth</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Risk Level</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent-orange)' }}>Medium</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Rebalance</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>2 hrs ago</div>
          </div>
        </div>
      </div>
      
      <button className="ai-btn-primary hover-glow" style={{ height: '36px', padding: '0 16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Settings size={14} /> Adjust Strategy
      </button>
    </div>
  );
}

function AIInsightsBox() {
  return (
    <div className="ai-card glass-panel" style={{ marginBottom: '12px' }}>
      <div className="ai-card-title">
        <Info size={14} color="var(--accent-blue)" /> AI Insight
      </div>
      <div className="insight-text">
        "ETH yield dropped by 3% in Spark Pool. Reallocating 15% of funds to USDC-EURO high-stability vaults to maintain target growth."
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
        <div className="impact-badge positive">
          <TrendingUp size={12} /> +1.8% Expected Return
        </div>
        <div className="impact-badge positive">
          <Shield size={12} /> -20% Risk Reduction
        </div>
      </div>
    </div>
  );
}

function AIActionPanel({ onApply }) {
  return (
    <div className="ai-card glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="ai-card-title">
        <Zap size={14} color="var(--accent-orange)" /> AI Action Panel
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(0, 210, 255, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 210, 255, 0.1)' }}>
          <div style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '8px' }}>
            RECOMMENDATION
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.5' }}>
            Move 20% funds from <span style={{color: 'var(--accent-red)'}}>XRP</span> → <span style={{color: 'var(--accent-green)'}}>USDT</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Reason: High volatility detected in XRP/USD pair.
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="ai-btn-primary" onClick={onApply}>Apply Recommendation</button>
          <button className="ai-btn-secondary">Ignore Rebalance</button>
        </div>
      </div>
      
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto' }}>
        AI confidence: 94.2%
      </div>
    </div>
  );
}

function SmartMarketPanel() {
  const items = [
    { label: 'Top Yield Pools', val: 'ETH Pool → 12.5%', type: 'yield', icon: Layers, color: 'var(--accent-green)' },
    { label: 'Risk Alert', val: 'XRP volatility high', type: 'risk', icon: AlertCircle, color: 'var(--accent-red)' },
    { label: 'Trending', val: 'BTC up 3.2%', type: 'trending', icon: TrendingUp, color: 'var(--accent-blue)' },
  ];

  return (
    <div className="ai-card glass-panel" style={{ flex: 1 }}>
      <div className="ai-card-title">
        <Activity size={14} color="var(--accent-green)" /> Smart Market Panel
      </div>
      <div className="smart-list" style={{ marginTop: '12px' }}>
        {items.map((item, i) => (
          <div key={i} className="smart-item">
            <div className="smart-icon-wrap" style={{ background: `${item.color}20`, color: item.color }}>
              <item.icon size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Pages ---

function VaultDashboard() {
  const [data, setData] = useState(generateData());
  const [timeRange, setTimeRange] = useState('24H');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="main-content">
      {toast && (
        <div className="glass-panel" style={{ 
          position: 'fixed', bottom: '24px', right: '24px', padding: '12px 24px', 
          background: 'var(--accent-blue)', color: 'white', fontWeight: '700', 
          borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,210,255,0.4)', zIndex: 100 
        }}>
          {toast}
        </div>
      )}
      
      <AIControlPanel />
      
      <div className="content-row">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AIInsightsBox />
          
          <div className="glass-panel" style={{ padding: '20px', flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div className="ai-card-title">Portfolio Performance</div>
              <div className="chart-controls">
                {['1H', '24H', '7D', '1M'].map(r => (
                  <button 
                    key={r} 
                    className={`chart-ctrl-btn ${timeRange === r ? 'active' : ''}`}
                    onClick={() => setTimeRange(r)}
                  >{r}</button>
                ))}
              </div>
            </div>
            
            <div style={{ width: '100%', flex: 1, minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 10}} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--accent-blue)' }}
                  />
                  
                  {/* Main Line */}
                  <Area 
                    type="monotone" 
                    dataKey="uv" 
                    stroke="var(--accent-blue)" 
                    strokeWidth={3} 
                    fill="url(#mainGrad)" 
                    isAnimationActive={false}
                  />
                  
                  {/* Prediction Line */}
                  <Area 
                    type="monotone" 
                    dataKey="uv" 
                    data={data.filter((d, i) => i >= data.length - 11)}
                    stroke="var(--accent-blue)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="none"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)' }}></div> Actual
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <div style={{ width: 12, height: 1, borderTop: '2px dashed var(--accent-blue)' }}></div> AI Prediction
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--accent-green)', marginLeft: 'auto' }}>
                <Target size={12} /> Rebalanced here 🔄
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AIActionPanel onApply={() => showToast("Rebalancing sequence initiated...")} />
          <SmartMarketPanel />
        </div>
      </div>

      <div className="content-row-full" style={{ marginTop: '12px' }}>
        <div className="glass-panel ai-card">
          <div className="ai-card-title">Allocation</div>
          <div style={{ height: '140px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '120px', height: '120px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RePie>
                  <Pie 
                    data={[
                      { name: 'ETH', value: 45, color: 'var(--accent-blue)' },
                      { name: 'USDT', value: 30, color: 'var(--accent-green)' },
                      { name: 'BTC', value: 25, color: '#f59e0b' }
                    ]} 
                    innerRadius={35} 
                    outerRadius={50} 
                    dataKey="value" 
                    stroke="none"
                  >
                    {[0,1,2].map((_, i) => <Cell key={i} fill={['var(--accent-blue)', 'var(--accent-green)', '#f59e0b'][i]} />)}
                  </Pie>
                </RePie>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Current</span> <span>45%</span>
                </div>
                <div className="risk-meter-container"><div className="risk-meter-fill" style={{ width: '45%', background: 'var(--accent-blue)' }}></div></div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>AI Recommended</span> <span>60%</span>
                </div>
                <div className="risk-meter-container"><div className="risk-meter-fill" style={{ width: '60%', background: 'var(--accent-blue)', opacity: 0.3 }}></div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel ai-card">
          <div className="ai-card-title">Risk Meter</div>
          <div style={{ textAlign: 'center', padding: '10px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-blue)' }}>65<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/100</span></div>
            <div style={{ color: 'var(--accent-orange)', fontWeight: '600', marginTop: '4px', letterSpacing: '1px' }}>MEDIUM RISK</div>
            <div className="risk-meter-container" style={{ height: '12px', marginTop: '16px' }}>
              <div className="risk-meter-fill" style={{ width: '65%', background: 'linear-gradient(90deg, var(--accent-green), var(--accent-orange))' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-panel ai-card">
          <div className="ai-card-title">Activity Feed</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
            {[
              { msg: 'Rebalanced ETH → USDT', time: '12m ago', icon: CheckCircle, col: 'var(--accent-green)' },
              { msg: 'Risk level adjusted to Medium', time: '2h ago', icon: Shield, col: 'var(--accent-blue)' },
              { msg: 'Yield improved +1.2%', time: '5h ago', icon: TrendingUp, col: 'var(--accent-green)' },
            ].map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '6px', background: `${ev.col}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ev.icon size={14} color={ev.col} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '500' }}>{ev.msg}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const [balance, setBalance] = useState(21340.50);

  return (
    <div className="vault-shell">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
        {/* Simple top bar for search/balance */}
        <div style={{ height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ background: 'var(--bg-panel)', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px', width: '300px' }}>
            <Search size={14} color="var(--text-muted)" />
            <input type="text" placeholder="Search assets..." style={{ background: 'none', border: 'none', color: 'white', outline: 'none', fontSize: '12px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Net Worth</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-green)' }}>
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-panel-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
              <User size={16} />
            </div>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<VaultDashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

// Dashbord Layout Layer
