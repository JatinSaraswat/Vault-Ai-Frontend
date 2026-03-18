import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, Shield, Activity, 
  Layers, CheckCircle, AlertCircle, Info, Target, Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, 
  CartesianGrid, XAxis, YAxis, Tooltip
} from 'recharts';

const PORTFOLIO_DATA = [
  { name: 'BTC', value: 46.7, color: '#f59e0b', current: 9962.21, recommended: 50.0 },
  { name: 'ETH', value: 37.9, color: 'var(--accent-blue)', current: 8078.84, recommended: 35.0 },
  { name: 'SOL', value: 8.6, color: 'var(--accent-green)', current: 1842.15, recommended: 10.0 },
  { name: 'XRP', value: 5.9, color: 'var(--accent-purple)', current: 1258.40, recommended: 4.0 },
  { name: 'ADA', value: 1.0, color: 'var(--accent-red)', current: 208.65, recommended: 1.0 },
];

const HISTORY = [
  { id: 1, type: 'Rebalance', asset: 'ETH → USDT', amount: '$1,200', date: '2026-03-18', status: 'Completed', icon: CheckCircle, color: 'var(--accent-green)' },
  { id: 2, type: 'Optimization', asset: 'Portfolio Risk Reduced', amount: '-15%', date: '2026-03-17', status: 'AI System', icon: Shield, color: 'var(--accent-blue)' },
  { id: 3, type: 'Yield Claim', asset: 'Spark Pool Rewards', amount: '+0.042 ETH', date: '2026-03-16', status: 'Auto', icon: Zap, color: 'var(--accent-orange)' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('allocation');

  return (
    <div className="main-content" style={{ paddingBottom: '24px' }}>
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>AI Portfolio Manager</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="ai-btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Download Report</button>
          <button className="ai-btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Rebalance Now</button>
        </div>
      </div>

      <div className="content-row">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Summary Cards */}
          <div className="content-row-full" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { label: 'Total Value', val: '$21,350.25', sub: '+21.9% all time', col: 'var(--accent-blue)' },
              { label: 'AI Yield (MTD)', val: '+$840.12', sub: '+4.2% yield', col: 'var(--accent-green)' },
              { label: 'Risk Score', val: '65/100', sub: 'Medium Risk', col: 'var(--accent-orange)' },
              { label: 'Efficiency', val: '94%', sub: 'High Optimization', col: 'var(--accent-blue)' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel ai-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</div>
                <div style={{ fontSize: '20px', fontWeight: '700', margin: '4px 0' }}>{stat.val}</div>
                <div style={{ fontSize: '11px', color: stat.col }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Allocation Comparison */}
          <div className="glass-panel ai-card">
            <div className="ai-card-title">
              <Layers size={14} color="var(--accent-blue)" /> Core Allocation & AI Recommendations
            </div>
            
            <div className="smart-list" style={{ marginTop: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', padding: '0 12px', marginBottom: '8px', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>ASSET</span> <span>CURRENT WEIGHT</span> <span>AI TARGET</span>
              </div>
              {PORTFOLIO_DATA.map((item, i) => (
                <div key={i} className="smart-item" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '2px', background: item.color }}></div>
                    <span style={{ fontWeight: '600' }}>{item.name}</span>
                  </div>
                  <div style={{ paddingRight: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span>{item.value}%</span>
                    </div>
                    <div className="risk-meter-container" style={{ height: '4px' }}>
                      <div className="risk-meter-fill" style={{ width: `${item.value}%`, background: item.color }}></div>
                    </div>
                  </div>
                  <div style={{ paddingRight: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span>{item.recommended}%</span>
                      {item.recommended > item.value ? 
                        <span style={{color: 'var(--accent-green)'}}>Increase</span> : 
                        <span style={{color: 'var(--accent-red)'}}>Reduce</span>}
                    </div>
                    <div className="risk-meter-container" style={{ height: '4px', background: 'rgba(255,255,255,0.02)' }}>
                      <div className="risk-meter-fill" style={{ width: `${item.recommended}%`, background: item.color, opacity: 0.4 }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-panel ai-card">
            <div className="ai-card-title">
              <Shield size={14} color="var(--accent-blue)" /> Risk Analysis
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--accent-blue)' }}>65</div>
              <div style={{ color: 'var(--accent-orange)', fontWeight: '600', fontSize: '12px' }}>MODERATE RISK</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Your portfolio is slightly over-exposed to BTC. AI suggests rebalancing to Stablecoins.
              </div>
              <div className="risk-meter-container" style={{ height: '10px', marginTop: '16px' }}>
                <div className="risk-meter-fill" style={{ width: '65%', background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-orange) 50%, var(--accent-red) 100%)' }}></div>
              </div>
            </div>
          </div>

          <div className="glass-panel ai-card" style={{ flex: 1 }}>
            <div className="ai-card-title">
              <Activity size={14} color="var(--accent-green)" /> AI Activity Log
            </div>
            <div className="smart-list" style={{ marginTop: '12px' }}>
              {HISTORY.map(log => (
                <div key={log.id} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: `${log.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <log.icon size={14} color={log.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600' }}>{log.asset}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{log.type} • {log.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: log.color }}>{log.amount}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{log.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
