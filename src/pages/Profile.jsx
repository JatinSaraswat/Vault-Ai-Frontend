import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit2, 
  Award, TrendingUp, Shield, Brain, Zap, CheckCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { mlEngine } from '../services/mlEngine';
import { motion } from 'framer-motion';

const PERFORMANCE_DATA = [
  { month: 'Jan', pnl: 840 },
  { month: 'Feb', pnl: -420 },
  { month: 'Mar', pnl: 1150 },
  { month: 'Apr', pnl: 680 },
  { month: 'May', pnl: -150 },
  { month: 'Jun', pnl: 920 },
  { month: 'Jul', pnl: 1240 },
  { month: 'Aug', pnl: 980 },
  { month: 'Sep', pnl: -310 },
  { month: 'Oct', pnl: 1540 },
  { month: 'Nov', pnl: 720 },
  { month: 'Dec', pnl: 1100 },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@vault.ai',
    phone: '+1 (555) 234-5678',
    location: 'New York, USA',
    memberSince: 'January 2026'
  });

  return (
    <div className="main-content">
      <div className="ai-header" style={{ marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Investor Profile</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI Identification & performance tiering</p>
        </div>
        <button className="ai-btn-primary" onClick={() => setIsEditing(!isEditing)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '12px' }}>
          <Edit2 size={14} /> {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="content-row">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* User Info Card */}
          <motion.div 
            className="glass-panel ai-card" 
            style={{ padding: '24px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--bg-panel-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent-blue)', boxShadow: 'var(--neon-glow)' }}>
                  <User size={48} color="var(--accent-blue)" />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-main)' }}>
                  <Zap size={14} color="white" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700' }}>{userInfo.name}</h3>
                  <div className="impact-badge positive" style={{ fontSize: '10px' }}>
                    <Shield size={10} /> Verified AI Investor
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Tier: **Diamond Vault Access**</p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <Mail size={14} /> {userInfo.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    <MapPin size={14} /> {userInfo.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <div className="glass-panel ai-card" style={{ flex: 1 }}>
            <div className="ai-card-title">
              <TrendingUp size={14} color="var(--accent-green)" /> Monthly AI Yield Performance
            </div>
            <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px' }}
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  />
                  <Bar 
                    dataKey="pnl" 
                    radius={[6, 6, 0, 0]}
                    fill={(entry) => entry.pnl > 0 ? 'var(--accent-blue)' : 'var(--accent-red)'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Stats Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-panel ai-card">
            <div className="ai-card-title">
              <Brain size={14} color="var(--accent-blue)" /> System Trust Score
            </div>
            {(() => {
              const baseScore = 94.2; // Base system stability
              const marketMultiplier = mlEngine.predictMarket('BTC').confidence / 100;
              const trustScore = (baseScore + (marketMultiplier * 5)).toFixed(1);
              return (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--accent-blue)' }}>{trustScore}<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>%</span></div>
                  <div style={{ color: 'var(--accent-green)', fontWeight: '600', fontSize: '13px', marginTop: '4px' }}>EXCELLENCE LEVEL</div>
                  <div className="risk-meter-container" style={{ height: '8px', marginTop: '16px' }}>
                    <div className="risk-meter-fill" style={{ width: `${trustScore}%`, background: 'var(--accent-blue)' }}></div>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
                    Based on 1,420 successful AI rebalances and zero liquidate events.
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="glass-panel ai-card" style={{ flex: 1 }}>
            <div className="ai-card-title">
              <Award size={14} color="var(--accent-orange)" /> Achievement Log
            </div>
            <div className="smart-list" style={{ marginTop: '12px' }}>
              {[
                { title: 'Yield Master', desc: 'Reached 15% Annual Yield', date: 'Mar 2026', icon: Zap, col: 'var(--accent-orange)' },
                { title: 'Risk Neutralizer', desc: 'Avoided 3 Market Crashes', date: 'Feb 2026', icon: Shield, col: 'var(--accent-blue)' },
                { title: 'Vault Veteran', desc: '3 Months Active Status', date: 'Jan 2026', icon: CheckCircle, col: 'var(--accent-green)' },
              ].map((ach, i) => (
                <motion.div 
                  key={i} 
                  style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${ach.col}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ach.icon size={16} color={ach.col} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{ach.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ach.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Performance Tracking Layer
