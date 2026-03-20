import React, { useState } from 'react';
import { 
  Star, Bell, Trash2, TrendingUp, TrendingDown, 
  Brain, Zap, Shield, Info, AlertTriangle, Activity
} from 'lucide-react';
import { mlEngine } from '../services/mlEngine';
import { motion } from 'framer-motion';

const WATCHLIST_DATA = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: '$41,509', sentiment: 'Bullish', sentimentScore: 82, trend: 'up' },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: '$2,308', sentiment: 'Neutral', sentimentScore: 54, trend: 'stable' },
  { id: 3, symbol: 'SOL', name: 'Solana', price: '$152.1', sentiment: 'Bullish', sentimentScore: 76, trend: 'up' },
  { id: 4, symbol: 'XRP', name: 'Ripple', price: '$0.508', sentiment: 'Bearish', sentimentScore: 28, trend: 'down' },
];

export default function Watchlist() {
  const [alerts, setAlerts] = useState({ 1: true, 2: false, 3: true, 4: false });

  const toggleAlert = (id) => {
    setAlerts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="main-content">
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>AI Asset Monitor</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Real-time sentiment & predictive volatility alerts</p>
        </div>
        <div className="ai-status-pulse">
          <Brain size={14} color="var(--accent-blue)" />
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-blue)' }}>Sentiment Analysis: ACTIVE</span>
        </div>
      </div>

      <div className="content-row-full" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {WATCHLIST_DATA.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="glass-panel ai-card hover-glow" 
            style={{ padding: '20px', position: 'relative' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.03 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="sidebar-logo" style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.05)', boxShadow: 'none' }}>
                  {item.symbol.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.symbol}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => toggleAlert(item.id)}
                  style={{ background: 'none', border: 'none', color: alerts[item.id] ? 'var(--accent-orange)' : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Bell size={18} fill={alerts[item.id] ? 'var(--accent-orange)' : 'none'} />
                </button>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <Star size={18} fill="var(--accent-blue)" color="var(--accent-blue)" />
                </button>
              </div>
            </div>

            <div style={{ margin: '20px 0' }}>
              <div style={{ fontSize: '24px', fontWeight: '800' }}>{item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                {(() => {
                  const pred = mlEngine.predictMarket(item.symbol);
                  const isUp = pred.trend === 'BULLISH';
                  return (
                    <>
                      {isUp ? <TrendingUp size={14} color="var(--accent-green)" /> : <TrendingDown size={14} color="var(--accent-red)" />}
                      <span style={{ fontSize: '12px', color: isUp ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                        {isUp ? `+${pred.predictedMove}% AI Forecast` : `${pred.predictedMove}% AI Forecast`}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div className="ai-card-title" style={{ fontSize: '9px', marginBottom: '8px' }}>
                <Zap size={10} color="var(--accent-blue)" /> Sentiment Analysis
              </div>
              {(() => {
                const pred = mlEngine.predictMarket(item.symbol);
                const sentiment = pred.trend === 'BULLISH' ? 'Bullish' : 'Bearish';
                const score = pred.confidence;
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '13px', fontWeight: '700',
                        color: sentiment === 'Bullish' ? 'var(--accent-green)' : 'var(--accent-red)'
                      }}>
                        {sentiment}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{score}%</span>
                    </div>
                    <div className="risk-meter-container" style={{ height: '4px', marginTop: '8px' }}>
                      <div className="risk-meter-fill" style={{ 
                        width: `${score}%`, 
                        background: sentiment === 'Bullish' ? 'var(--accent-green)' : 'var(--accent-red)'
                      }}></div>
                    </div>
                  </>
                );
              })()}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button className="ai-btn-secondary" style={{ flex: 1, fontSize: '11px', padding: '10px' }}>Analyze</button>
              <button className="ai-btn-primary" style={{ flex: 1, fontSize: '11px', padding: '10px' }}>Setup Alert</button>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          className="glass-panel ai-card" 
          style={{ padding: '20px', border: '2px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '300px' }}
          whileHover={{ scale: 1.02 }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,210,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Activity size={24} color="var(--accent-blue)" />
            </div>
            <div style={{ fontWeight: '700', fontSize: '14px' }}>Monitor New Asset</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>AI will begin tracking sentiment</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Sentiment Analysis Layer
