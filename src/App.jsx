import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, List, BarChart2, Star, Search, User, Settings, X, Plus, 
  ArrowUpRight, ArrowDownRight, Target, Clock, ChevronDown, CheckCircle, AlertCircle,
  Minus
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

const barChartData = [
  { name: '1', uv: 400, pv: 240, amt: 240 },
  { name: '2', uv: 300, pv: 139, amt: 221 },
  { name: '3', uv: 200, pv: 980, amt: 229 },
  { name: '4', uv: 278, pv: 390, amt: 200 },
  { name: '5', uv: 189, pv: 480, amt: 218 },
  { name: '6', uv: 239, pv: 380, amt: 250 },
  { name: '7', uv: 349, pv: 430, amt: 210 },
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

// Simple Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: 'var(--bg-panel)', borderLeft: `4px solid ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)'}`,
      padding: '12px 24px', borderRadius: '4px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000,
      color: 'white', fontWeight: 'bold', fontSize: '14px', animation: 'slideUp 0.3s ease-out'
    }}>
      {type === 'success' ? <CheckCircle color="var(--accent-green)" /> : <AlertCircle color="var(--accent-red)" />}
      {message}
    </div>
  );
}

const MULTIPLIERS = ['x5', 'x10', 'x25', 'x50', 'x100', 'x200'];

export default function App() {
  const [amount, setAmount] = useState(100);
  const [multiplier, setMultiplier] = useState('x50');
  const [balance, setBalance] = useState(5367.50);
  const [activeAsset, setActiveAsset] = useState('EUR/USD');
  const [openingPrice, setOpeningPrice] = useState(1.05);
  const [toast, setToast] = useState(null);
  const [autoClose, setAutoClose] = useState(false);
  const [countdown, setCountdown] = useState(60 * 60 + 33 * 60 + 16); // 1h 33m 16s in seconds

  // Live countdown timer
  useEffect(() => {
    const t = setInterval(() => setCountdown(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const formatCountdown = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };

  // State for live chart
  const [chartData, setChartData] = useState(generateData());

  // Simulate Live Market Data
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        // Shift data by 1 to make it "scroll"
        newData.shift();
        const lastData = prevData[prevData.length - 1];
        
        // Randomly walk the value
        const randomChangeUV = (Math.random() - 0.5) * 200;
        const randomChangePV = (Math.random() - 0.5) * 100;
        
        const newTime = parseInt(lastData.time.split(':')[0]);
        const nextTime = newTime >= 23 ? '00:00' : `${newTime + 1}:00`;
        
        newData.push({
          time: nextTime,
          uv: Math.max(1000, lastData.uv + randomChangeUV),
          pv: Math.max(1000, lastData.pv + randomChangePV),
          amt: lastData.amt
        });
        
        return newData;
      });
      
      // Also slightly wiggle the opening price
      setOpeningPrice(prev => prev + (Math.random() - 0.5) * (prev * 0.001));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAssetChange = (assetName, price) => {
    setActiveAsset(assetName);
    setOpeningPrice(price);
    // Regenerate chart to simulate looking at a different asset
    setChartData(generateData());
  };

  const stepAmount = (dir) => {
    setAmount(prev => {
      const val = parseFloat(prev) || 0;
      const step = val >= 1000 ? 100 : val >= 100 ? 10 : 5;
      return Math.max(5, val + dir * step);
    });
  };

  const handleTrade = (type) => {
    const numAmount = parseFloat(amount || 0);
    if (numAmount <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }
    if (balance >= numAmount) {
      setBalance(prev => prev - numAmount);
      showToast(`Successfully ${type} $${numAmount} of ${activeAsset}`);
    } else {
      showToast("Insufficient balance for this trade!", "error");
    }
  };

  const handleExchange = () => {
    const numAmount = parseFloat(amount || 0);
    if (numAmount <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }
    if (balance >= numAmount) {
       setBalance(prev => prev - numAmount);
       showToast(`Exchanged $${numAmount.toFixed(2)} successfully!`);
    } else {
       showToast("Insufficient balance to exchange!", "error");
    }
  };

  return (
    <div className="trading-dashboard">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
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
            <input type="text" placeholder="Search markets..." />
          </div>
        </div>

        <div className="nav-right">
          <div className="user-balance hover-effect" style={{ padding: '4px 8px', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px' }}>Balance:</div>
            <div className="balance-amount">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
              <ChevronDown size={12} display="inline" style={{marginLeft: '4px'}} />
            </div>
          </div>
          <div className="user-profile">
            <User size={20} />
            <Settings size={18} color="var(--text-muted)" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-layout">
        {/* Left Side (Charts & Panels) */}
        <div className="left-column">
          
          {/* Ticker Row */}
          <div className="tickers-row">
            <div className="ticker-card hover-effect" onClick={() => handleAssetChange('DASH', 110.01)}>
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#008de4', color: 'white' }}>D</div>
                <div>
                  <div className="ticker-name">DASH</div>
                  <div className="ticker-symbol">Dash</div>
                </div>
              </div>
              <div className="ticker-chart" style={{ height: '40px', width: '80px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={smallAreaChartData}>
                      <Line type="monotone" dataKey="pv" stroke="#089981" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="ticker-price">
                <div className="positive">$110.01</div>
                <div className="ticker-change positive">+1.45% 12h</div>
              </div>
            </div>

            <div className="ticker-card hover-effect" onClick={() => handleAssetChange('LINK', 2.23)}>
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#2a5ada', color: 'white' }}>L</div>
                <div>
                  <div className="ticker-name">LINK</div>
                  <div className="ticker-symbol">Chainlink</div>
                </div>
              </div>
              <div className="ticker-chart" style={{ height: '40px', width: '80px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={smallAreaChartData}>
                      <Line type="monotone" dataKey="pv" stroke="#089981" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="ticker-price">
                <div className="positive">$2.23</div>
                <div className="ticker-change positive">+3.89% 12h</div>
              </div>
            </div>

            <div className="ticker-card hover-effect" onClick={() => handleAssetChange('XRP', 0.508)}>
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#23292f', color: 'white' }}>X</div>
                <div>
                  <div className="ticker-name">XRP</div>
                  <div className="ticker-symbol">Ripple</div>
                </div>
              </div>
              <div className="ticker-chart" style={{ height: '40px', width: '80px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={smallAreaChartDataRed}>
                      <Line type="monotone" dataKey="pv" stroke="#f23645" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="ticker-price">
                <div className="negative">$0.508</div>
                <div className="ticker-change negative">-4.12% 12h</div>
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="chart-and-order">
            <div className="main-chart" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              {/* Asset Info Header */}
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontSize: '13px', flexWrap: 'wrap' }}>
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
                     +${(parseFloat(amount || 0) * 0.15).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Explicit height wrapper to prevent Recharts collapse */}
              <div style={{ flex: 1, minHeight: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} animationDuration={400}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2962ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2962ff" stopOpacity={0}/>
                      </linearGradient>
                      <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="8" stroke="#10b981" strokeWidth="2" opacity="0.3" />
                      </pattern>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis orientation="right" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border)', borderRadius: '4px' }} />
                    <Area type="monotone" dataKey="uv" stroke="#2962ff" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" isAnimationActive={false} />
                    <Area type="monotone" dataKey="pv" stroke="none" fill="url(#diagonalHatch)" fillOpacity={1} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Panel */}
            <div className="order-panel">
              {/* Amount with stepper */}
              <div className="form-group">
                <label>Amount</label>
                <div className="amount-stepper">
                  <button className="stepper-btn" onClick={() => stepAmount(-1)}><Minus size={14}/></button>
                  <div className="stepper-display">
                    <span className="stepper-currency">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                      className="stepper-input"
                    />
                  </div>
                  <button className="stepper-btn" onClick={() => stepAmount(1)}><Plus size={14}/></button>
                </div>
              </div>

              {/* Multiplier chips */}
              <div className="form-group">
                <label>Multiplier</label>
                <div className="multiplier-chips">
                  {MULTIPLIERS.map(m => (
                    <button
                      key={m}
                      className={`chip-btn ${multiplier === m ? 'chip-active' : ''}`}
                      onClick={() => setMultiplier(m)}
                    >{m}</button>
                  ))}
                </div>
              </div>

              {/* Auto Closing toggle */}
              <div className="form-group">
                <div className="auto-closing-row">
                  <label>Auto Closing</label>
                  <button
                    className={`toggle-btn ${autoClose ? 'toggle-on' : ''}`}
                    onClick={() => setAutoClose(p => !p)}
                  >
                    <span className="toggle-thumb"/>
                  </button>
                </div>
                {autoClose && (
                  <div className="input-box" style={{ marginTop: '6px' }}>
                    <span style={{color:'var(--text-muted)', fontSize:'12px'}}>Close at profit $</span>
                    <input type="number" defaultValue="50" className="stepper-input" style={{width:'60px', textAlign:'right'}}/>
                  </div>
                )}
              </div>

              {/* Live Countdown */}
              <div className="countdown-box">
                <Clock size={14} color="var(--text-muted)"/>
                <span className="countdown-time">{formatCountdown(countdown)}</span>
              </div>

              {/* Buy / Sell buttons */}
              <div className="trade-buttons">
                <button className="btn-buy interactive-btn" onClick={() => handleTrade('bought')}>
                  <ArrowDownRight size={22} />
                  <span>BUY</span>
                </button>
                <button className="btn-sell interactive-btn" onClick={() => handleTrade('sold')}>
                  <ArrowUpRight size={22} />
                  <span>SELL</span>
                </button>
              </div>

              <button className="exchange-btn interactive-btn" onClick={handleExchange}>
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

          {/* Bottom Stats Row */}
          <div className="bottom-stats">
            <div className="stat-box">
              <div className="stat-box-title">Volume Overview</div>
              <div style={{ flex: 1, minHeight: '120px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <defs>
                       <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ba68c8" />
                          <stop offset="100%" stopColor="#2962ff" />
                       </linearGradient>
                    </defs>
                    <Bar dataKey="uv" fill="url(#barColor)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="stat-box">
               <div className="stat-box-title">Trend Analysis</div>
               <div style={{ flex: 1, minHeight: '120px', width: '100%' }}>
                 <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <Line type="monotone" dataKey="pv" stroke="#f23645" dot={{r: 2}} strokeWidth={2}/>
                    <Line type="monotone" dataKey="uv" stroke="#2962ff" dot={{r: 2}} strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-box-title">Market Activity</div>
              <div style={{ flex: 1, minHeight: '120px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="var(--text-muted)"/>
                    <defs>
                       <linearGradient id="barColor2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#29b6f6" />
                          <stop offset="100%" stopColor="#2962ff" />
                       </linearGradient>
                    </defs>
                    <Bar dataKey="pv" fill="url(#barColor2)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
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
                <div style={{ flex: 1, minHeight: '35px' }}>
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
