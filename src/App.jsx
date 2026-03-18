import React, { useState } from 'react';
import { 
  Home, 
  List, 
  BarChart2, 
  Star, 
  Search, 
  RefreshCw,
  Bell,
  User,
  Settings,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Clock,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import './index.css';

// Mock Data
const mainChartData = Array.from({ length: 50 }, (_, i) => ({
  time: `${Math.floor(i / 6) + 12}:00`,
  pv: Math.random() * 2000 + 4000,
  uv: Math.random() * 1000 + 3000,
  amt: Math.random() * 2000 + 2000,
}));

const barChartData = [
  { name: '1', uv: 400, pv: 240, amt: 240 },
  { name: '2', uv: 300, pv: 139, amt: 221 },
  { name: '3', uv: 200, pv: 980, amt: 229 },
  { name: '4', uv: 278, pv: 390, amt: 200 },
  { name: '5', uv: 189, pv: 480, amt: 218 },
  { name: '6', uv: 239, pv: 380, amt: 250 },
  { name: '7', uv: 349, pv: 430, amt: 210 },
  { name: '8', uv: 200, pv: 980, amt: 229 },
  { name: '9', uv: 278, pv: 390, amt: 200 },
  { name: '10', uv: 189, pv: 480, amt: 218 },
];

const smallAreaChartData = [
  { pv: 2400 }, { pv: 1398 }, { pv: 9800 }, { pv: 3908 },
  { pv: 4800 }, { pv: 3800 }, { pv: 4300 }, { pv: 8900 }
];

const smallAreaChartDataRed = [
  { pv: 8900 }, { pv: 6398 }, { pv: 7800 }, { pv: 3908 },
  { pv: 4800 }, { pv: 2800 }, { pv: 4300 }, { pv: 2400 }
];

const cryptoList = [
  { symbol: 'ETH', name: 'Ethereum', price: '$2,308.24', change: '+1.45%', isPos: true },
  { symbol: 'BTC', name: 'Bitcoin', price: '$41,509.23', change: '+2.41%', isPos: true },
  { symbol: 'XRP', name: 'Ripple', price: '$0.508', change: '-4.12%', isPos: false },
  { symbol: 'LTC', name: 'Litecoin', price: '$69.72', change: '+1.12%', isPos: true },
  { symbol: 'BCH', name: 'Bitcoin Cash', price: '$268.52', change: '+3.44%', isPos: true },
  { symbol: 'EOS', name: 'EOS', price: '$0.74', change: '+1.11%', isPos: true },
  { symbol: 'ZEC', name: 'Zcash', price: '$28.92', change: '-2.11%', isPos: false },
  { symbol: 'ZRX', name: '0x', price: '$0.328', change: '-4.67%', isPos: false },
];

const COLORS = ['#2962ff', '#f23645', '#089981', '#f57c00'];

export default function App() {
  const [amount, setAmount] = useState('100');
  const [multiplier, setMultiplier] = useState('x50');

  return (
    <div className="trading-dashboard">
      {/* Top Navbar */}
      <header className="top-nav">
        <div className="nav-left">
          <div className="brand">
            TRADING<br/>PLATFORM
          </div>
          <div className="nav-links">
            <div className="nav-link"><Home size={16} /></div>
            <div className="nav-link"><List size={16} /></div>
            <div className="nav-link"><BarChart2 size={16} /></div>
            <div className="nav-link"><Star size={16} /></div>
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-link">
            <Target size={16} />
          </div>
          <div className="nav-link">
            <RefreshCw size={16} />
          </div>
          <div className="nav-link">
            <Clock size={16} />
          </div>
          <div className="search-bar">
            <Search size={16} color="var(--text-muted)" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="nav-right">
          <div className="user-balance">
            <div>Balance:</div>
            <div className="balance-amount">5,367.50 $ <ChevronDown size={12} display="inline" /></div>
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
            <div className="ticker-card">
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#008de4', color: 'white' }}>D</div>
                <div>
                  <div className="ticker-name">DASH</div>
                  <div className="ticker-symbol">Dash</div>
                </div>
              </div>
              <div className="ticker-chart">
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

            <div className="ticker-card">
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#2a5ada', color: 'white' }}>L</div>
                <div>
                  <div className="ticker-name">LINK</div>
                  <div className="ticker-symbol">Chainlink</div>
                </div>
              </div>
              <div className="ticker-chart">
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

            <div className="ticker-card">
              <div className="ticker-info">
                <div className="coin-icon" style={{ backgroundColor: '#23292f', color: 'white' }}>X</div>
                <div>
                  <div className="ticker-name">XRP</div>
                  <div className="ticker-symbol">Ripple</div>
                </div>
              </div>
              <div className="ticker-chart">
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
            <div className="main-chart">
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f23645' }}></div>
                  <span>EUR/USD</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Opening Price </span>
                  <span style={{ color: '#f23645' }}>0.20</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Amount of investment </span>
                  <span>$20.00</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Profit </span>
                  <span>355</span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mainChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  <XAxis dataKey="time" />
                  <YAxis orientation="right" domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border)' }} />
                  <Area type="stepBefore" dataKey="uv" stroke="#2962ff" fillOpacity={1} fill="url(#colorUv)" />
                  <Area type="stepBefore" dataKey="pv" stroke="none" fill="url(#diagonalHatch)" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Order Panel */}
            <div className="order-panel">
              <div className="form-group">
                <label>Amount</label>
                <div className="input-box">
                  <span style={{color:'var(--text-muted)'}}>$</span>
                  <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{background:'transparent', border:'none', color:'white', textAlign:'right', outline:'none'}} />
                </div>
              </div>

              <div className="form-group">
                <label>Multiplier</label>
                <div className="input-box">
                  <input type="text" value={multiplier} onChange={(e)=>setMultiplier(e.target.value)} style={{background:'transparent', border:'none', color:'white', outline:'none'}} />
                </div>
              </div>

              <div className="form-group">
                <label>Auto Closing</label>
                <div className="input-box" style={{ justifyContent: 'center', cursor: 'pointer' }}>
                  <span>—</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}>
                01h 33:16
              </div>

              <div className="trade-buttons">
                <button className="btn-buy" style={{ display: 'flex', flexDirection: 'column' }}>
                  <ArrowDownRight size={20} />
                </button>
                <button className="btn-sell" style={{ display: 'flex', flexDirection: 'column' }}>
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <button style={{ backgroundColor: '#f57c00', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                Exchange
              </button>
            </div>
          </div>

          {/* Tabs row */}
          <div className="tabs-row">
            <div className="tab-item active" style={{ borderBottomColor: '#f23645' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={14} /> EUR/USD <X size={14} color="var(--text-muted)" />
              </div>
            </div>
            <div className="tab-item">Bitcoin <X size={14} /></div>
            <div className="tab-item">Ethereum <X size={14} /></div>
            <div className="tab-item">Gold <X size={14} /></div>
            <div className="tab-item">Oil WTI <X size={14} /></div>
            <div className="tab-item">Oil Brent <X size={14} /></div>
            <div className="tab-item" style={{ padding: '12px' }}><Plus size={16} /></div>
          </div>

          {/* Bottom Stats Row */}
          <div className="bottom-stats">
            <div className="stat-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
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

            <div className="stat-box">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="pv" stroke="#f23645" dot={{r: 2}} />
                  <Line type="monotone" dataKey="uv" stroke="#2962ff" dot={{r: 2}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="stat-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
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
          
          <div className="bottom-stats">
             <div className="stat-box" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie data={[{value: 5371}, {value: 2000}, {value: 1500}]} innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value">
                      <Cell fill="#f23645" />
                      <Cell fill="#2962ff" />
                      <Cell fill="#ba68c8" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{flex: 1, fontSize: '10px', color: 'var(--text-muted)'}}>Lorem ipsum dolor sit amet.</div>
             </div>
             
             <div className="stat-box" style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie data={[{value: 116001}, {value: 40000}]} innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={0} dataKey="value">
                       <Cell fill="#f57c00" />
                       <Cell fill="#1e222d" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{flex: 1, fontSize: '10px'}}>
                   <div style={{color:'#f57c00', marginBottom: '4px'}}>• Donec tortor</div>
                   <div style={{color:'var(--accent-blue)'}}>• Nunc dapibus</div>
                </div>
             </div>
             <div className="stat-box" style={{ display:'flex', flexDirection:'row', gap:'8px', alignItems:'center'}}>
                <div style={{flex:1, textAlign:'center'}}>
                   <div style={{width:60, height:60, borderRadius:'50%', background:'linear-gradient(45deg, #2962ff, #29b6f6)', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
                     561
                   </div>
                   <div style={{marginTop:8}}>XLM Stellar</div>
                </div>
                <div style={{flex:1, textAlign:'center'}}>
                   <div style={{width:60, height:60, borderRadius:'50%', background:'linear-gradient(45deg, #089981, #29b6f6)', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
                     163
                   </div>
                   <div style={{marginTop:8}}>IOTA</div>
                </div>
             </div>
          </div>

        </div>

        {/* Right Sidebar (Crypto List) */}
        <div className="right-column">
          <div className="crypto-list-header">
            <div className="crypto-tab active">Cryptocurrencies</div>
            <div className="crypto-tab">Exchanges</div>
          </div>
          
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
             <span style={{color: 'var(--text-muted)'}}>Notifications</span>
             <div style={{display:'flex', gap:'8px'}}>
               <div style={{width: 30, height: 16, background: '#089981', borderRadius: 8}}></div>
               <span style={{color: 'var(--text-muted)'}}>Sound</span>
               <div style={{width: 30, height: 16, background: '#f23645', borderRadius: 8}}></div>
             </div>
          </div>

          <div className="crypto-list">
            {cryptoList.map((crypto, idx) => (
              <div className="crypto-item" key={idx}>
                <div className="crypto-symbol-col">
                  <div className="coin-icon" style={{ width: 24, height: 24, fontSize: 10, background: 'var(--border)' }}>
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{crypto.symbol}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{crypto.name}</div>
                  </div>
                </div>
                <div style={{ flex: 1, height: 30 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crypto.isPos ? smallAreaChartData : smallAreaChartDataRed}>
                      <Line type="monotone" dataKey="pv" stroke={crypto.isPos ? '#089981' : '#f23645'} strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="crypto-price-col">
                  <div style={{ fontWeight: 'bold', color: crypto.isPos ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {crypto.price}
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
