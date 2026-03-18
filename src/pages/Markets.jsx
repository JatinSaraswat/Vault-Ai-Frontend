import React, { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const smallUp = [{ v: 2400 }, { v: 1398 }, { v: 9800 }, { v: 3908 }, { v: 4800 }, { v: 3800 }, { v: 6300 }, { v: 8900 }];
const smallDown = [{ v: 8900 }, { v: 6398 }, { v: 7800 }, { v: 3908 }, { v: 4800 }, { v: 2800 }, { v: 4300 }, { v: 2400 }];

const allMarkets = [
  { category: 'Crypto', items: [
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 41509.23, change: '+2.41%', volume: '24.5B', cap: '812.3B', isPos: true },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 2308.24, change: '+1.45%', volume: '11.2B', cap: '277.1B', isPos: true },
    { symbol: 'XRP/USD', name: 'Ripple', price: 0.508, change: '-4.12%', volume: '2.1B', cap: '27.3B', isPos: false },
    { symbol: 'LTC/USD', name: 'Litecoin', price: 69.72, change: '+1.12%', volume: '540M', cap: '5.1B', isPos: true },
    { symbol: 'ADA/USD', name: 'Cardano', price: 0.428, change: '-1.22%', volume: '310M', cap: '15.1B', isPos: false },
    { symbol: 'SOL/USD', name: 'Solana', price: 152.10, change: '+5.33%', volume: '3.4B', cap: '66.7B', isPos: true },
  ]},
  { category: 'Forex', items: [
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0842, change: '+0.12%', volume: '6.6T', cap: '—', isPos: true },
    { symbol: 'GBP/USD', name: 'Pound / US Dollar', price: 1.2741, change: '-0.08%', volume: '3.8T', cap: '—', isPos: false },
    { symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 151.84, change: '+0.22%', volume: '4.1T', cap: '—', isPos: true },
    { symbol: 'AUD/USD', name: 'Australian / US Dollar', price: 0.6521, change: '-0.15%', volume: '1.8T', cap: '—', isPos: false },
  ]},
  { category: 'Commodities', items: [
    { symbol: 'GOLD', name: 'Gold Spot', price: 2338.50, change: '+0.55%', volume: '180B', cap: '—', isPos: true },
    { symbol: 'SILVER', name: 'Silver Spot', price: 27.42, change: '-0.31%', volume: '14B', cap: '—', isPos: false },
    { symbol: 'OIL WTI', name: 'Crude Oil WTI', price: 78.31, change: '+1.02%', volume: '22B', cap: '—', isPos: true },
  ]},
];

export default function Markets() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const categories = ['All', 'Crypto', 'Forex', 'Commodities'];

  const filtered = allMarkets
    .filter(g => activeCategory === 'All' || g.category === activeCategory)
    .map(g => ({
      ...g,
      items: g.items.filter(i =>
        i.symbol.toLowerCase().includes(search.toLowerCase()) ||
        i.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Markets</h1>
          <p className="page-subtitle">Live prices across all asset classes</p>
        </div>
        <div className="page-search">
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search symbol or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(c => (
          <button
            key={c}
            className={`category-tab ${activeCategory === c ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}
          >{c}</button>
        ))}
      </div>

      <div className="markets-table-wrapper">
        <table className="markets-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Volume</th>
              <th>Market Cap</th>
              <th>Trend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(group => (
              <React.Fragment key={group.category}>
                <tr className="category-row">
                  <td colSpan={9}>{group.category}</td>
                </tr>
                {group.items.map((item, idx) => (
                  <tr key={item.symbol} className="market-row" onClick={() => navigate('/')}>
                    <td className="row-num">{idx + 1}</td>
                    <td className="symbol-cell">
                      <div className="market-coin-icon">{item.symbol.charAt(0)}</div>
                      <span className="symbol-text">{item.symbol}</span>
                    </td>
                    <td className="name-cell">{item.name}</td>
                    <td className="price-cell">
                      {item.price < 10 ? item.price.toFixed(4) : item.price.toLocaleString()}
                    </td>
                    <td className={item.isPos ? 'positive change-cell' : 'negative change-cell'}>
                      {item.isPos ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {item.change}
                    </td>
                    <td className="muted-cell">{item.volume}</td>
                    <td className="muted-cell">{item.cap}</td>
                    <td className="trend-cell">
                      <ResponsiveContainer width={80} height={36}>
                        <LineChart data={item.isPos ? smallUp : smallDown}>
                          <Line type="monotone" dataKey="v" stroke={item.isPos ? '#089981' : '#f23645'} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </td>
                    <td>
                      <button className="trade-now-btn" onClick={e => { e.stopPropagation(); navigate('/'); }}>Trade</button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
