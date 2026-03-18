import React, { useState } from 'react';
import { 
  Settings, Monitor, Bell, Shield, User, CreditCard, 
  Key, LogOut, Brain, Zap, Sliders, Info, Cpu
} from 'lucide-react';

export default function SettingsPage() {
  const [autoPilot, setAutoPilot] = useState(true);
  const [riskLevel, setRiskLevel] = useState(65);

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
      </div>
    </div>
  );
}

// Configuration Layer
