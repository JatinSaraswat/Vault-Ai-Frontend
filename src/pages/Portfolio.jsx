import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const portfolioHistory = [
  { date: 'Jan', value: 12000 },
  { date: 'Feb', value: 11500 },
  { date: 'Mar', value: 13200 },
  { date: 'Apr', value: 14800 },
  { date: 'May', value: 13900 },
  { date: 'Jun', value: 16200 },
  { date: 'Jul', value: 15800 },
  { date: 'Aug', value: 17500 },
  { date: 'Sep', value: 18200 },
  { date: 'Oct', value: 17800 },
  { date: 'Nov', value: 19500 },
  { date: 'Dec', value: 21340 },
];

const holdings = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.24, value: 9962.21, change: '+2.41%', isPos: true, color: '#f59e0b', allocation: 46.7 },
  { symbol: 'ETH', name: 'Ethereum', amount: 3.5, value: 8078.84, change: '+1.45%', isPos: true, color: '#6366f1', allocation: 37.9 },
  { symbol: 'SOL', name: 'Solana', amount: 12, value: 1825.20, change: '+5.33%', isPos: true, color: '#10b981', allocation: 8.6 },
  { symbol: 'XRP', name: 'Ripple', amount: 2500, value: 1270, change: '-4.12%', isPos: false, color: '#3b82f6', allocation: 5.9 },
  { symbol: 'ADA', name: 'Cardano', amount: 500, value: 214, change: '-1.22%', isPos: false, color: '#ec4899', allocation: 1.0 },
];

const transactions = [
  { type: 'buy', symbol: 'BTC', amount: 0.05, price: 41200, date: 'Mar 15, 2025', total: 2060, isPos: true },
  { type: 'sell', symbol: 'ETH', amount: 1.2, price: 2290, date: 'Mar 12, 2025', total: 2748, isPos: false },
  { type: 'buy', symbol: 'SOL', amount: 5, price: 148.50, date: 'Mar 10, 2025', total: 742.50, isPos: true },
  { type: 'buy', symbol: 'XRP', amount: 1000, price: 0.52, date: 'Mar 8, 2025', total: 520, isPos: true },
  { type: 'sell', symbol: 'ADA', amount: 200, price: 0.44, date: 'Mar 5, 2025', total: 88, isPos: false },
];

const TOTAL = holdings.reduce((a, h) => a + h.value, 0);
const PROFIT = 3840.25;
const PROFIT_PCT = '+21.9%';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('holdings');

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">Track your investments and performance</p>
        </div>
        <button className="primary-btn"><Plus size={15}/> Deposit Funds</button>
      </div>

      {/* Summary Cards */}
      <div className="portfolio-stats">
        <div className="pstat-card">
          <div className="pstat-label"><DollarSign size={14}/> Total Value</div>
          <div className="pstat-value">${TOTAL.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div className="pstat-sub positive">{PROFIT_PCT} all time</div>
        </div>
        <div className="pstat-card">
          <div className="pstat-label"><TrendingUp size={14}/> Total P&L</div>
          <div className="pstat-value positive">+${PROFIT.toLocaleString()}</div>
          <div className="pstat-sub positive">Since Jan 2025</div>
        </div>
        <div className="pstat-card">
          <div className="pstat-label"><PieChart size={14}/> Assets</div>
          <div className="pstat-value">{holdings.length}</div>
          <div className="pstat-sub" style={{color:'var(--text-muted)'}}>Diversified</div>
        </div>
        <div className="pstat-card">
          <div className="pstat-label">Best Performer</div>
          <div className="pstat-value">SOL</div>
          <div className="pstat-sub positive">+5.33% today</div>
        </div>
      </div>

      <div className="portfolio-grid">
        {/* Chart */}
        <div className="portfolio-chart-box">
          <div className="box-title">Portfolio Value (12 months)</div>
          <div style={{flex:1, minHeight:0}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory} margin={{top:10, right:10, left:0, bottom:0}}>
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2962ff" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#2962ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`}/>
                <Tooltip contentStyle={{backgroundColor:'var(--bg-panel)', borderColor:'var(--border)', borderRadius:'4px'}} formatter={v => [`$${v.toLocaleString()}`, 'Value']}/>
                <Area type="monotone" dataKey="value" stroke="#2962ff" strokeWidth={2} fillOpacity={1} fill="url(#portGrad)" isAnimationActive={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Pie */}
        <div className="portfolio-pie-box">
          <div className="box-title">Allocation</div>
          <div style={{flex:1, minHeight:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12}}>
            <ResponsiveContainer width="100%" height={160}>
              <RechartsPie>
                <Pie data={holdings} dataKey="allocation" nameKey="symbol" cx="50%" cy="50%" innerRadius={45} outerRadius={75} strokeWidth={0}>
                  {holdings.map((h,i) => <Cell key={i} fill={h.color}/>)}
                </Pie>
                <Tooltip contentStyle={{backgroundColor:'var(--bg-panel)', borderColor:'var(--border)', borderRadius:'4px'}} formatter={(v, name) => [`${v}%`, name]}/>
              </RechartsPie>
            </ResponsiveContainer>
            <div className="pie-legend">
              {holdings.map(h => (
                <div key={h.symbol} className="pie-legend-item">
                  <div className="pie-dot" style={{background: h.color}}/>
                  <span>{h.symbol}</span>
                  <span style={{color:'var(--text-muted)'}}>{h.allocation}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="port-tabs">
        {['holdings', 'transactions'].map(t => (
          <button key={t} className={`port-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'holdings' ? (
        <div className="data-table-wrapper">
          <table className="markets-table">
            <thead><tr><th>Asset</th><th>Amount</th><th>Value</th><th>24h Change</th><th>Allocation</th></tr></thead>
            <tbody>
              {holdings.map(h => (
                <tr key={h.symbol} className="market-row">
                  <td className="symbol-cell">
                    <div className="market-coin-icon" style={{background: h.color}}>{h.symbol.charAt(0)}</div>
                    <div><div style={{fontWeight:700}}>{h.symbol}</div><div style={{fontSize:11, color:'var(--text-muted)'}}>{h.name}</div></div>
                  </td>
                  <td>{h.amount} {h.symbol}</td>
                  <td style={{fontWeight:700}}>${h.value.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                  <td className={h.isPos ? 'positive change-cell' : 'negative change-cell'}>
                    {h.isPos ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>}{h.change}
                  </td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div style={{flex:1, height:4, background:'var(--bg-main)', borderRadius:2}}>
                        <div style={{width:`${h.allocation}%`, height:'100%', background:h.color, borderRadius:2}}/>
                      </div>
                      <span style={{color:'var(--text-muted)', fontSize:11, width:36}}>{h.allocation}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table className="markets-table">
            <thead><tr><th>Type</th><th>Asset</th><th>Amount</th><th>Price</th><th>Total</th><th>Date</th></tr></thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="market-row">
                  <td><span className={`tx-badge ${tx.type === 'buy' ? 'buy' : 'sell'}`}>{tx.type.toUpperCase()}</span></td>
                  <td style={{fontWeight:700}}>{tx.symbol}</td>
                  <td>{tx.amount} {tx.symbol}</td>
                  <td>${tx.price.toLocaleString()}</td>
                  <td style={{fontWeight:700}}>${tx.total.toLocaleString()}</td>
                  <td style={{color:'var(--text-muted)'}}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
