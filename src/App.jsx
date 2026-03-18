import React, { useState, useEffect } from 'react';
import { 
  Home, List, BarChart2, Star, Search, RefreshCw, Bell, User, Settings, X, Plus, 
  ArrowUpRight, ArrowDownRight, Target, Clock, ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import './index.css';

// Base Mock Data
const generateData = () => Array.from({ length: 40 }, (_, i) => ({
  time: `${Math.floor(i / 6) + 12}:00`,
  pv: Math.random() * 2000 + 4000,
  uv: Math.random() * 1000 + 3000,
  amt: Math.random() * 2000 + 2000,
}));

// Small chart data
const smallAreaChartData = [
  { pv: 2400 }, { pv: 1398 }, { pv: 9800 }, { pv: 3908 },
  { pv: 4800 }, { pv: 3800 }, { pv: 4300 }, { pv: 8900 }
];

const smallAreaChartDataRed = [
  { pv: 8900 }, { pv: 6398 }, { pv: 7800 }, { pv: 3908 },
  { pv: 4800 }, { pv: 2800 }, { pv: 4300 }, { pv: 2400 }
];

const cryptoList = [
  { symbol: 'ETH', name: 'Ethereum', price: 2308.24, change: '+1.45%', isPos: true },
  { symbol: 'BTC', name: 'Bitcoin', price: 41509.23, change: '+2.41%', isPos: true },
  { symbol: 'XRP', name: 'Ripple', price: 0.508, change: '-4.12%', isPos: false },
  { symbol: 'LTC', name: 'Litecoin', price: 69.72, change: '+1.12%', isPos: true },
  { symbol: 'BCH', name: 'Bitcoin Cash', price: 268.52, change: '+3.44%', isPos: true },
  { symbol: 'EOS', name: 'EOS', price: 0.74, change: '+1.11%', isPos: true },
  { symbol: 'ZEC', name: 'Zcash', price: 28.92, change: '-2.11%', isPos: false },
  { symbol: 'ZRX', name: '0x', price: 0.328, change: '-4.67%', isPos: false },
];

export default function App() {
  const [amount, setAmount] = useState('100');
  const [multiplier, setMultiplier] = useState('x50');
  const [balance, setBalance] = useState(5367.50);
  const [activeAsset, setActiveAsset] = useState('EUR/USD');
  const [openingPrice, setOpeningPrice] = useState(1.05);
  
  // State for live chart
  const [chartData, setChartData] = useState(generateData());


  const handleAssetChange = (assetName, price) => {
    setActiveAsset(assetName);
    setOpeningPrice(price);
    // Regenerate chart to simulate looking at a different asset
    setChartData(generateData());
  };

  const handleTrade = (type) => {
    const numAmount = parseFloat(amount || 0);
    if (balance >= numAmount) {
      setBalance(prev => prev - numAmount);
      alert(`Successfully ${type} ${amount} on ${activeAsset}!`);
    } else {
      alert("Insufficient balance!");
    }
  };

  const handleExchange = () => {
    const numAmount = parseFloat(amount || 0);
    if (balance >= numAmount) {
       setBalance(prev => prev - numAmount);
       alert(`Exchanged ${amount} from Balance!`);
    } else {
       alert("Insufficient balance to exchange!");
    }
  };

  return (
    <div className="trading-dashboard">
      {/* Top Navbar */}
      <header className="top-nav">
        <div className="nav-left">
          <div className="brand">TRADING<br/>PLATFORM</div>
          <div className="nav-links">
            <div className="nav-link"><Home size={16} /></div>
            <div className="nav-link"><List size={16} /></div>
            <div className="nav-link"><BarChart2 size={16} /></div>
            <div className="nav-link"><Star size={16} /></div>
          </div>
        </div>

        <div className="nav-center">
          <div className="search-bar">
            <Search size={16} color="var(--text-muted)" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="nav-right">
          <div className="user-balance">
            <div>Balance:</div>
            <div className="balance-amount">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
              <ChevronDown size={12} display="inline" />
            </div>
          </div>
          <div className="user-profile">
            <User size={20} />
            <Settings size={18} color="var(--text-muted)" style={{cursor: 'pointer'}} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-layout">
        {/* Left Side (Charts & Panels) */}
        <div className="left-column">
          
          {/* Main Chart Area */}
          <div className="chart-and-order">
            <div className="main-chart">
              {/* Asset Info Header */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f23645' }}></div>
                  <span>{activeAsset}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Opening Price </span>
                  <span style={{ color: '#f23645', fontWeight: 'bold' }}>
                    {openingPrice < 10 ? openingPrice.toFixed(4) : openingPrice.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Investment </span>
                  <span style={{ fontWeight: 'bold' }}>${amount || '0'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Profit </span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                     +{(parseFloat(amount || 0) * 0.15).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} animationDuration={500}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2962ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2962ff" stopOpacity={0}/>
                    </linearGradient>
                    <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#10b981" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis orientation="right" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border)' }} />
                  <Area type="stepBefore" dataKey="uv" stroke="#2962ff" fillOpacity={1} fill="url(#colorUv)" isAnimationActive={false} />
                  <Area type="stepBefore" dataKey="pv" stroke="none" fill="url(#diagonalHatch)" fillOpacity={0.3} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Order Panel */}
            <div className="order-panel">
              <div className="form-group">
                <label>Amount</label>
                <div className="input-box" style={{ cursor: 'text' }}>
                  <span style={{color:'var(--text-muted)'}}>$</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e)=>setAmount(e.target.value)} 
                    style={{background:'transparent', border:'none', color:'white', textAlign:'right', outline:'none', width: '100%'}} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Multiplier</label>
                <div className="input-box" style={{ cursor: 'text' }}>
                  <input 
                    type="text" 
                    value={multiplier} 
                    onChange={(e)=>setMultiplier(e.target.value)} 
                    style={{background:'transparent', border:'none', color:'white', outline:'none', width: '100%'}} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Auto Closing</label>
                <div className="input-box hover-effect" style={{ justifyContent: 'center', cursor: 'pointer' }}>
                  <span>—</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', margin: 'auto 0' }}>
                <Clock size={16} display="inline" style={{marginRight: '8px', color: 'var(--text-muted)'}}/>
                01h 33:16
              </div>

              <div className="trade-buttons">
                <button className="btn-buy interactive-btn" onClick={() => handleTrade('bought')} style={{ display: 'flex', flexDirection: 'column', gap:'4px' }}>
                  <ArrowDownRight size={20} />
                  <span style={{fontSize: '11px'}}>BUY</span>
                </button>
                <button className="btn-sell interactive-btn" onClick={() => handleTrade('sold')} style={{ display: 'flex', flexDirection: 'column', gap:'4px' }}>
                  <ArrowUpRight size={20} />
                  <span style={{fontSize: '11px'}}>SELL</span>
                </button>
              </div>
              <button className="interactive-btn" onClick={handleExchange} style={{ background: 'linear-gradient(45deg, #f57c00, #ff9800)', color: 'white', border: 'none', padding: '14px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                Exchange
              </button>
            </div>
          </div>

          {/* Quick Tabs row */}
          <div className="tabs-row" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            {['EUR/USD', 'Bitcoin', 'Ethereum', 'Gold', 'Oil WTI', 'Oil Brent'].map(asset => (
              <div 
                key={asset} 
                className={`tab-item hover-effect ${activeAsset === asset ? 'active' : ''}`}
                onClick={() => handleAssetChange(asset, asset === 'EUR/USD' ? 1.05 : 23000)}
              >
                {activeAsset === asset && <Target size={14} color="#f23645" />}
                {asset} 
                <X size={14} color="var(--text-muted)" style={{cursor: 'pointer'}} />
              </div>
            ))}
            <div className="tab-item hover-effect" style={{ padding: '12px' }}><Plus size={16} /></div>
          </div>
          
        </div>

        {/* Right Sidebar (Crypto List) */}
        <div className="right-column">
          <div className="crypto-list-header">
            <div className="crypto-tab active">Cryptocurrencies</div>
            <div className="crypto-tab hover-effect">Exchanges</div>
          </div>
          
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
             <span style={{color: 'var(--text-muted)'}}>Notifications</span>
             <div style={{display:'flex', gap:'8px', cursor: 'pointer'}}>
               <div style={{width: 30, height: 16, background: '#089981', borderRadius: 8}}></div>
               <span style={{color: 'var(--text-muted)', fontSize: '12px'}}>Sound</span>
               <div style={{width: 30, height: 16, background: '#f23645', borderRadius: 8}}></div>
             </div>
          </div>

          <div className="crypto-list">
            {cryptoList.map((crypto, idx) => (
              <div 
                className={`crypto-item ${activeAsset === crypto.name ? 'selected-asset' : ''}`} 
                key={idx}
                onClick={() => handleAssetChange(crypto.name, crypto.price)}
              >
                <div className="crypto-symbol-col">
                  <div className="coin-icon" style={{ width: 28, height: 28, fontSize: 11, background: 'var(--border)' }}>
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{crypto.symbol}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{crypto.name}</div>
                  </div>
                </div>
                <div style={{ flex: 1, height: 35 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crypto.isPos ? smallAreaChartData : smallAreaChartDataRed}>
                      <Line type="monotone" dataKey="pv" stroke={crypto.isPos ? '#089981' : '#f23645'} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="crypto-price-col">
                  <div style={{ fontWeight: 'bold', color: crypto.isPos ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    ${crypto.price}
                  </div>
                  <div style={{ fontSize: '11px', color: crypto.isPos ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {crypto.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
