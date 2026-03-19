import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, TrendingUp, TrendingDown, Info, 
  Layers, AlertCircle, Zap, Star, ChevronRight, Activity, Shield
} from 'lucide-react';
import { mlEngine } from '../services/mlEngine';

const MARKET_DATA = [
  { id: 1, symbol: 'BTC/USD', name: 'Bitcoin', price: 41509.23, change: '+2.41%', isPos: true, yield: '3.2%', risk: 'Low', category: 'Crypto' },
  { id: 2, symbol: 'ETH/USD', name: 'Ethereum', price: 2308.24, change: '+1.45%', isPos: true, yield: '12.5%', risk: 'Low', category: 'Crypto' },
  { id: 3, symbol: 'SOL/USD', name: 'Solana', price: 152.10, change: '+5.33%', isPos: true, yield: '8.2%', risk: 'Medium', category: 'Crypto' },
  { id: 4, symbol: 'XRP/USD', name: 'Ripple', price: 0.5082, change: '-4.12%', isPos: false, yield: '1.5%', risk: 'High', category: 'Crypto' },
  { id: 5, symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0842, change: '+0.12%', isPos: true, yield: '0.0%', risk: 'Low', category: 'Forex' },
  { id: 6, symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.2741, change: '-0.08%', isPos: false, yield: '0.0%', risk: 'Low', category: 'Forex' },
  { id: 7, symbol: 'GOLD', name: 'Gold Spot', price: 2024.50, change: '+0.45%', isPos: true, yield: '0.0%', risk: 'Low', category: 'Commodities' },
  { id: 8, symbol: 'OIL', name: 'Crude Oil WTI', price: 73.20, change: '-1.22%', isPos: false, yield: '0.0%', risk: 'Medium', category: 'Commodities' },
];

export default function Markets() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [markets, setMarkets] = useState(MARKET_DATA);

  useEffect(() => {
    fetch("http://localhost:8080/api/markets")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (Array.isArray(data)) {
          setMarkets(data);
        }
      })
      .catch(err => console.error("Market fetch failed:", err));
  }, []);

  const filteredData = markets.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.symbol.toLowerCase().includes(search.toLowerCase()) || 
                          item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="ai-header" style={{ marginBottom: '12px', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Smart Market Explorer</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI-filtered opportunities & yield-bearing assets</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="chart-controls">
            {['All', 'Crypto', 'Forex', 'Commodities'].map(f => (
              <button 
                key={f} 
                className={`chart-ctrl-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border)', width: '300px', alignItems: 'center', gap: '8px' }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Filter by symbol..." 
              style={{ background: 'none', border: 'none', color: 'white', outline: 'none', fontSize: '12px', width: '100%' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="impact-badge positive">
            <Activity size={12} /> AI Scanning 842 Markets...
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-panel)', zIndex: 1, backdropFilter: 'blur(8px)' }}>
              <tr style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <th style={{ padding: '12px' }}>Asset</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>24h Change</th>
                <th style={{ padding: '12px' }}>AI Yield Est.</th>
                <th style={{ padding: '12px' }}>Risk Assessment</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="smart-item" style={{ borderBottom: '1px solid var(--border)', cursor: 'default' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="sidebar-logo" style={{ width: 32, height: 32, fontSize: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', boxShadow: 'none' }}>
                        {item.symbol.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '13px' }}>{item.symbol}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px', fontWeight: '600' }}>
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ color: item.isPos ? 'var(--accent-green)' : 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                      {item.isPos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {item.change}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    {(() => {
                      const pred = mlEngine.predictMarket(item.symbol);
                      return (
                        <div className="impact-badge positive" style={{ background: 'rgba(0, 255, 195, 0.05)', cursor: 'help' }} title={`AI Confidence: ${pred.confidence}% | Trend: ${pred.trend}`}>
                          <Zap size={10} /> {item.yield !== '0.0%' ? item.yield : '2.1%*'}
                        </div>
                      );
                    })()}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    {(() => {
                      const pred = mlEngine.predictMarket(item.symbol);
                      const riskLevel = pred.trend === 'BEARISH' && item.risk === 'Low' ? 'Medium' : item.risk;
                      return (
                        <div style={{ 
                          display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                          background: riskLevel === 'Low' ? 'rgba(0, 255, 195, 0.05)' : riskLevel === 'Medium' ? 'rgba(255, 157, 0, 0.05)' : 'rgba(255, 62, 94, 0.05)',
                          color: riskLevel === 'Low' ? 'var(--accent-green)' : riskLevel === 'Medium' ? 'var(--accent-orange)' : 'var(--accent-red)'
                        }}>
                          <Shield size={10} /> {riskLevel} Risk
                        </div>
                      );
                    })()}
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <button className="ai-btn-secondary" style={{ padding: '6px 14px', fontSize: '11px' }}>
                      Monitor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Smart Market Data Layer
