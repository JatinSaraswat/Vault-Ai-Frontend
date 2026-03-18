import React, { useState } from 'react';
import { Star, StarOff, TrendingUp, TrendingDown, Plus, Bell, BellOff } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const smallUp = [{ v: 2400 }, { v: 1398 }, { v: 9800 }, { v: 3908 }, { v: 4800 }, { v: 3800 }, { v: 6300 }, { v: 8900 }];
const smallDown = [{ v: 8900 }, { v: 6398 }, { v: 7800 }, { v: 3908 }, { v: 4800 }, { v: 2800 }, { v: 4300 }, { v: 2400 }];

const initialWatchlist = [
  { id: 1, symbol: 'BTC/USD', name: 'Bitcoin', price: 41509.23, change: '+2.41%', high: 42100, low: 40200, isPos: true, alert: false },
  { id: 2, symbol: 'ETH/USD', name: 'Ethereum', price: 2308.24, change: '+1.45%', high: 2350, low: 2250, isPos: true, alert: true },
  { id: 3, symbol: 'SOL/USD', name: 'Solana', price: 152.10, change: '+5.33%', high: 158, low: 143, isPos: true, alert: false },
  { id: 4, symbol: 'XRP/USD', name: 'Ripple', price: 0.508, change: '-4.12%', high: 0.54, low: 0.49, isPos: false, alert: false },
  { id: 5, symbol: 'GOLD', name: 'Gold Spot', price: 2338.50, change: '+0.55%', high: 2350, low: 2320, isPos: true, alert: true },
  { id: 6, symbol: 'EUR/USD', name: 'Euro / USD', price: 1.0842, change: '+0.12%', high: 1.086, low: 1.081, isPos: true, alert: false },
];

export default function Watchlist() {
  const [items, setItems] = useState(initialWatchlist);

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const toggleAlert = (id) => setItems(prev => prev.map(i => i.id === id ? {...i, alert: !i.alert} : i));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Watchlist</h1>
          <p className="page-subtitle">Your starred assets and price alerts</p>
        </div>
        <button className="primary-btn"><Plus size={15}/> Add Asset</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <Star size={48} color="var(--text-muted)"/>
          <p>Your watchlist is empty</p>
          <span>Add assets from the Markets page to track them here</span>
        </div>
      ) : (
        <div className="watchlist-grid">
          {items.map(item => (
            <div key={item.id} className="watchlist-card">
              <div className="wl-card-header">
                <div className="wl-symbol-group">
                  <div className="market-coin-icon" style={{width:36, height:36, fontSize:13, background: item.isPos ? 'rgba(8,153,129,0.2)' : 'rgba(242,54,69,0.2)', color: item.isPos ? 'var(--accent-green)' : 'var(--accent-red)'}}>
                    {item.symbol.charAt(0)}
                  </div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{item.symbol}</div>
                    <div style={{fontSize:11, color:'var(--text-muted)'}}>{item.name}</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button className="icon-btn" onClick={() => toggleAlert(item.id)} title="Toggle Alert">
                    {item.alert ? <Bell size={15} color="var(--accent-blue)"/> : <BellOff size={15} color="var(--text-muted)"/>}
                  </button>
                  <button className="icon-btn" onClick={() => removeItem(item.id)} title="Remove from Watchlist">
                    <StarOff size={15} color="var(--text-muted)"/>
                  </button>
                </div>
              </div>

              <div style={{height:60}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.isPos ? smallUp : smallDown}>
                    <Line type="monotone" dataKey="v" stroke={item.isPos ? '#089981' : '#f23645'} strokeWidth={2} dot={false} isAnimationActive={false}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="wl-card-footer">
                <div>
                  <div style={{fontSize:18, fontWeight:700}}>{item.price < 10 ? item.price.toFixed(4) : item.price.toLocaleString()}</div>
                  <div className={item.isPos ? 'positive' : 'negative'} style={{fontSize:12, display:'flex', alignItems:'center', gap:2}}>
                    {item.isPos ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                    {item.change}
                  </div>
                </div>
                <div style={{textAlign:'right', fontSize:11, color:'var(--text-muted)'}}>
                  <div>H: {item.high.toLocaleString()}</div>
                  <div>L: {item.low.toLocaleString()}</div>
                </div>
              </div>
              {item.alert && (
                <div className="alert-badge"><Bell size={10}/> Alert Active</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
