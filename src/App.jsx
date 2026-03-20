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
import { mlEngine } from './services/mlEngine';
import { motion, AnimatePresence } from 'framer-motion';

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

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const pageVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  transition: { duration: 0.3 }
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageVariants.transition}
      style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
    >
      {children}
    </motion.div>
  );
}

// --- Sub-components ---

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  
  const navItems = [
    { icon: Home, path: '/', label: 'Vault' },
    { icon: List, path: '/markets', label: 'Markets' },
    { icon: BarChart2, path: '/portfolio', label: 'Portfolio' },
    { icon: Star, path: '/watchlist', label: 'Watchlist' },
    { icon: User, path: '/profile', label: 'Profile' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];

  return (
    <motion.aside 
      className="sidebar glass-panel"
      initial={false}
      animate={{ width: isHovered ? 260 : 76 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ overflow: 'hidden', paddingLeft: isHovered ? '20px' : '14px' }}
    >
      <div className="sidebar-logo-container">
        <div className="sidebar-logo">
          <Brain size={24} color="white" />
        </div>
        <motion.span 
          className="sidebar-brand"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          VaultAI
        </motion.span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
        {navItems.map(item => (
          <motion.div 
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            whileHover={{ x: 5, backgroundColor: "var(--bg-panel-hover)" }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon size={22} />
            <motion.span 
              className="nav-label"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="nav-item"
        whileHover={{ x: 5, backgroundColor: "var(--bg-panel-hover)" }}
        whileTap={{ scale: 0.98 }}
      >
        <Bell size={22} />
        <motion.span 
          className="nav-label"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Notifications
        </motion.span>
      </motion.div>
    </motion.aside>
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
  const [insight, setInsight] = useState("Scanning markets for yield opportunities...");
  const [metrics, setMetrics] = useState({ return: 0, risk: 0 });

  useEffect(() => {
    // Simulate ML insight generation
    const mockPortfolio = { assets: [{ name: 'ETH', yield: '12.5%', risk: 'Low' }] };
    setTimeout(() => {
      setInsight(mlEngine.getInsight(mockPortfolio, 'BULLISH'));
      setMetrics({ 
        return: mlEngine.predictMarket('ETH').confidence / 50, 
        risk: (Math.random() * 15 + 5).toFixed(0) 
      });
    }, 0);
  }, []);

  const explainAI = JSON.parse(localStorage.getItem('vaultai_explain_ai')) ?? true;

  return (
    <motion.div 
      className="ai-card glass-panel" 
      style={{ marginBottom: '12px' }}
      {...fadeInUp}
    >
      <div className="ai-card-title">
        <Info size={14} color="var(--accent-blue)" /> AI Insight
      </div>
      <div className="insight-text">
        {explainAI ? `"${insight}"` : "AI decision-making logs are currently hidden. Enable Explainability in Settings."}
      </div>
      <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
        <div className="impact-badge positive">
          <TrendingUp size={12} /> +{metrics.return}% Expected Return
        </div>
        <div className="impact-badge positive">
          <Shield size={12} /> -{metrics.risk}% Risk Reduction
        </div>
      </div>
    </motion.div>
  );
}

function AIActionPanel({ onApply }) {
  const [recommendation, setRecommendation] = useState({ from: 'XRP', to: 'USDT', reason: 'High volatility' });
  // eslint-disable-next-line no-unused-vars
  const [aiConfidence, setAiConfidence] = useState(94.2);

  useEffect(() => {
    const pred = mlEngine.predictMarket('XRP');
    setTimeout(() => {
      setAiConfidence(pred.confidence);
      if (pred.trend === 'BEARISH') {
        setRecommendation({ from: 'XRP', to: 'ETH', reason: 'Bearish divergence detected' });
      }
    }, 0);
  }, []);

  return (
    <motion.div 
      className="ai-card glass-panel" 
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      {...fadeInUp}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <div className="ai-card-title">
        <Zap size={14} color="var(--accent-orange)" /> AI Action Panel
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(0, 210, 255, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 210, 255, 0.1)' }}>
          <div style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '8px' }}>
            RECOMMENDATION
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.5' }}>
            Move funds from <span style={{color: 'var(--accent-red)'}}>{recommendation.from}</span> → <span style={{color: 'var(--accent-green)'}}>{recommendation.to}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Reason: {recommendation.reason}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="ai-btn-primary" onClick={onApply}>Apply Recommendation</button>
          <button className="ai-btn-secondary">Ignore Rebalance</button>
        </div>
      </div>
      
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto' }}>
        AI confidence: {aiConfidence}%
      </div>
    </motion.div>
  );
}

function SmartMarketPanel() {
  const items = [
    { label: 'Top Yield Pools', val: 'ETH Pool → 12.5%', type: 'yield', icon: Layers, color: 'var(--accent-green)' },
    { label: 'Risk Alert', val: 'XRP volatility high', type: 'risk', icon: AlertCircle, color: 'var(--accent-red)' },
    { label: 'Trending', val: 'BTC up 3.2%', type: 'trending', icon: TrendingUp, color: 'var(--accent-blue)' },
  ];

  return (
    <motion.div 
      className="ai-card glass-panel" 
      style={{ flex: 1 }}
      {...fadeInUp}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
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
    </motion.div>
  );
}

// --- Main Pages ---

function VaultDashboard() {
  const [data] = useState(generateData());
  const [timeRange, setTimeRange] = useState('24H');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="main-content">
      <AnimatePresence>
        {toast && (
          <motion.div 
            className="glass-panel" 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{ 
              position: 'fixed', bottom: '24px', right: '24px', padding: '12px 24px', 
              background: 'var(--accent-blue)', color: 'white', fontWeight: '700', 
              borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,210,255,0.4)', zIndex: 100 
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      
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
                  {JSON.parse(localStorage.getItem('vaultai_prediction_graph')) !== false && (
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
                  )}
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
          {JSON.parse(localStorage.getItem('vaultai_risk_breakdown')) !== false ? (
            <div style={{ textAlign: 'center', padding: '10px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-blue)' }}>65<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/100</span></div>
              <div style={{ color: 'var(--accent-orange)', fontWeight: '600', marginTop: '4px', letterSpacing: '1px' }}>MEDIUM RISK</div>
              <div className="risk-meter-container" style={{ height: '12px', marginTop: '16px' }}>
                <div className="risk-meter-fill" style={{ width: '65%', background: 'linear-gradient(90deg, var(--accent-green), var(--accent-orange))' }}></div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center', padding: '20px' }}>
              Detailed risk metrics are disabled. Enable "Show Risk Breakdown" in Settings to view full analysis.
            </div>
          )}
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
  const [balance] = useState(21340.50);

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
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><VaultDashboard /></PageWrapper>} />
            <Route path="/markets" element={<PageWrapper><Markets /></PageWrapper>} />
            <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
            <Route path="/watchlist" element={<PageWrapper><Watchlist /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
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
