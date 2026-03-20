import React, { useState } from 'react';
import { 
  Settings, Monitor, Bell, Shield, User, CreditCard, 
  Key, LogOut, Brain, Zap, Sliders, Info, Cpu, Activity, TrendingUp
} from 'lucide-react';

export default function SettingsPage() {
  const [autoPilot, setAutoPilot] = useState(true);
  const [riskLevel, setRiskLevel] = useState(65);

  // AI Explainability States
  const [explainAI, setExplainAI] = useState(() => {
    const saved = localStorage.getItem('vaultai_explain_ai');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showRiskBreakdown, setShowRiskBreakdown] = useState(() => {
    const saved = localStorage.getItem('vaultai_risk_breakdown');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showPredictionGraph, setShowPredictionGraph] = useState(() => {
    const saved = localStorage.getItem('vaultai_prediction_graph');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Sync with LocalStorage
  React.useEffect(() => {
    localStorage.setItem('vaultai_explain_ai', JSON.stringify(explainAI));
  }, [explainAI]);

  React.useEffect(() => {
    localStorage.setItem('vaultai_risk_breakdown', JSON.stringify(showRiskBreakdown));
  }, [showRiskBreakdown]);

  React.useEffect(() => {
    localStorage.setItem('vaultai_prediction_graph', JSON.stringify(showPredictionGraph));
  }, [showPredictionGraph]);

  return (
    <div className="main-content">
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>AI Configuration</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Manage system logic, risk parameters, and auto-pilot modes</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="ai-btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Reset Defaults</button>
          <button className="ai-btn-primary" style={{ padding: '8px 24px', fontSize: '12px' }}>Save Changes</button>
        </div>
      </div>

      <div className="content-row-full">
        {/* AI System Settings */}
        <div className="glass-panel ai-card">
          <div className="ai-card-title">
            <Cpu size={14} color="var(--accent-blue)" /> Core Logic Engine
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>AI Auto-Pilot</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Allow VaultAI to execute rebalances automatically</div>
              </div>
              <button 
                onClick={() => setAutoPilot(!autoPilot)}
                style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', background: autoPilot ? 'var(--accent-blue)' : 'var(--bg-panel-hover)', transition: '0.3s' }}
              >
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: autoPilot ? 23 : 3, transition: '0.3s' }} />
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Risk Tolerance</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-blue)' }}>{riskLevel}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" value={riskLevel} 
                onChange={(e) => setRiskLevel(e.target.value)}
                style={{ width: '100%', height: '4px', appearance: 'none', background: 'var(--border)', borderRadius: '2px', outline: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>Conservative</span> <span>Aggressive</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Inference Model</div>
              <select style={{ width: '100%', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'white', padding: '10px', borderRadius: '8px', outline: 'none', fontSize: '12px' }}>
                <option>Vault-Engine V4 (Optimized for Yield)</option>
                <option>GPT-4o (Standard Logic)</option>
                <option>Claude 3.5 Sonnet (High Reasoning)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="glass-panel ai-card">
          <div className="ai-card-title">
            <Shield size={14} color="var(--accent-green)" /> Security & Bio-Auth
          </div>
          <div className="smart-list" style={{ marginTop: '10px' }}>
            {[
              { label: 'Two-Factor (2FA)', status: 'Enabled', icon: Shield, color: 'var(--accent-green)' },
              { label: 'Biometric Login', status: 'Disabled', icon: User, color: 'var(--text-muted)' },
              { label: 'API Access Keys', status: '3 Active', icon: Key, color: 'var(--accent-blue)' },
            ].map((item, i) => (
              <div key={i} className="smart-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <item.icon size={16} color={item.color} />
                  <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: item.color }}>{item.status}</span>
              </div>
            ))}
            <button className="ai-btn-secondary" style={{ marginTop: '10px', width: '100%', fontSize: '12px', padding: '10px' }}>Change Access Password</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-panel ai-card">
          <div className="ai-card-title">
            <Bell size={14} color="var(--accent-orange)" /> Alert Configuration
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {[
              { label: 'AI Rebalance Alerts', desc: 'Notify on every automated move' },
              { label: 'Risk Level Changes', desc: 'Warn if portfolio risk exceeds limit' },
              { label: 'Yield Pool Updates', desc: 'Alert when pool yields drop > 2%' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <div style={{ width: 36, height: 18, borderRadius: 9, background: 'var(--accent-blue)', position: 'relative' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2 }} />
                </div>
              </div>
            ))}
          </div>
          <button className="ai-btn-secondary" style={{ marginTop: '20px', width: '100%', color: 'var(--accent-red)', border: '1px solid rgba(255, 62, 94, 0.2)' }}>
            <LogOut size={14} /> Terminate AI Session
          </button>
        </div>

        {/* AI Explainability Toggle (MARC BOOSTER) */}
        <div className="glass-panel ai-card hover-glow" style={{ border: '1px solid rgba(0, 210, 255, 0.2)' }}>
          <div className="ai-card-title" style={{ color: 'var(--accent-blue)' }}>
            <Brain size={14} /> AI Explainability & Transparency
            <span style={{ marginLeft: 'auto', fontSize: '10px', background: 'rgba(0, 210, 255, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 210, 255, 0.2)' }}>PRO</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
            {[
              { 
                label: 'Explain AI Decisions', 
                desc: 'Real-time text reasoning for rebalances', 
                state: explainAI, 
                setter: setExplainAI,
                icon: Info
              },
              { 
                label: 'Show Risk Breakdown', 
                desc: 'Detailed matrix of asset vulnerability', 
                state: showRiskBreakdown, 
                setter: setShowRiskBreakdown,
                icon: Activity
              },
              { 
                label: 'Show Prediction Graph', 
                desc: 'Overlay futurist trends on price charts', 
                state: showPredictionGraph, 
                setter: setShowPredictionGraph,
                icon: TrendingUp
              }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                   <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={16} color="var(--accent-blue)" />
                   </div>
                   <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</div>
                   </div>
                </div>
                <button 
                  onClick={() => item.setter(!item.state)}
                  style={{ 
                    width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', position: 'relative', 
                    background: item.state ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)', 
                    transition: '0.3s',
                    boxShadow: item.state ? '0 0 10px rgba(0, 210, 255, 0.3)' : 'none'
                  }}
                >
                  <div style={{ 
                    width: 16, height: 16, borderRadius: '50%', background: 'white', 
                    position: 'absolute', top: 3, left: item.state ? 21 : 3, 
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: 'auto', padding: '10px', borderRadius: '8px', 
            background: 'linear-gradient(90deg, rgba(0, 210, 255, 0.05), transparent)',
            borderLeft: '2px solid var(--accent-blue)', fontSize: '10px', color: 'var(--text-muted)'
          }}>
            Transparency settings apply globally across your VaultAI dashboard interfaces.
          </div>
        </div>
      </div>
    </div>
  );
}

// Configuration Layer
