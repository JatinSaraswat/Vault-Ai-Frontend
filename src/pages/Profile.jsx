import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Award, Calendar, Edit3, Camera } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const monthlyPnl = [
  { month: 'Jan', pnl: 820 }, { month: 'Feb', pnl: -450 }, { month: 'Mar', pnl: 1100 },
  { month: 'Apr', pnl: 650 }, { month: 'May', pnl: -180 }, { month: 'Jun', pnl: 940 },
  { month: 'Jul', pnl: 1250 }, { month: 'Aug', pnl: 880 }, { month: 'Sep', pnl: -320 },
  { month: 'Oct', pnl: 1450 }, { month: 'Nov', pnl: 720 }, { month: 'Dec', pnl: 1030 },
];

const achievements = [
  { icon: Award, label: 'First Trade', date: 'Jan 14, 2025', color: '#f59e0b' },
  { icon: Shield, label: 'KYC Verified', date: 'Jan 16, 2025', color: '#10b981' },
  { icon: Award, label: '10 Trades', date: 'Feb 3, 2025', color: '#6366f1' },
  { icon: Award, label: 'Profit Streak', date: 'Mar 1, 2025', color: '#f23645' },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@email.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [location, setLocation] = useState('New York, USA');

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your account and trading statistics</p>
        </div>
        <button className="primary-btn" onClick={() => setEditing(e => !e)}>
          <Edit3 size={14}/> {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-grid">
        {/* Left Card */}
        <div className="profile-card">
          <div className="profile-avatar-area">
            <div className="profile-avatar">
              <User size={52} color="var(--text-muted)"/>
              <div className="avatar-upload-btn"><Camera size={12}/></div>
            </div>
            <div className="profile-badge verified"><Shield size={11}/> Verified</div>
          </div>

          <div className="profile-info-list">
            {[
              { icon: User, label: 'Full Name', value: name, setter: setName },
              { icon: Mail, label: 'Email', value: email, setter: setEmail },
              { icon: Phone, label: 'Phone', value: phone, setter: setPhone },
              { icon: MapPin, label: 'Location', value: location, setter: setLocation },
            ].map(({icon: Icon, label, value, setter}) => (
              <div key={label} className="profile-info-item">
                <Icon size={14} color="var(--text-muted)"/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11, color:'var(--text-muted)', marginBottom:2}}>{label}</div>
                  {editing ? (
                    <input className="profile-input" value={value} onChange={e => setter(e.target.value)}/>
                  ) : (
                    <div style={{fontWeight:500}}>{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="profile-join-date">
            <Calendar size={13} color="var(--text-muted)"/>
            <span style={{color:'var(--text-muted)', fontSize:12}}>Member since January 2025</span>
          </div>
        </div>

        {/* Right: Stats + PnL */}
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="profile-stats-row">
            {[
              { label: 'Total Trades', value: '147' },
              { label: 'Win Rate', value: '64%' },
              { label: 'Best Trade', value: '+$2,460' },
              { label: 'Avg. Hold', value: '3.2 days' },
            ].map(s => (
              <div key={s.label} className="pstat-card">
                <div className="pstat-label">{s.label}</div>
                <div className="pstat-value">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="stat-box" style={{flex:1, minHeight:200}}>
            <div className="box-title">Monthly P&L (2025)</div>
            <div style={{flex:1, minHeight:0}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPnl} margin={{top:5, right:5, left:0, bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false}/>
                  <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`}/>
                  <Tooltip contentStyle={{backgroundColor:'var(--bg-panel)', borderColor:'var(--border)', borderRadius:'4px'}} formatter={v => [`$${v}`, 'P&L']}/>
                  <Bar dataKey="pnl" radius={[4,4,0,0]} fill="#2962ff"
                    label={false}
                    cells={monthlyPnl.map((e, i) => (
                      <rect key={i} fill={e.pnl >= 0 ? '#089981' : '#f23645'} />
                    ))}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="stat-box" style={{height:'auto', padding:'16px'}}>
        <div className="box-title" style={{marginBottom:12}}>Achievements</div>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          {achievements.map(a => (
            <div key={a.label} className="achievement-chip">
              <a.icon size={16} color={a.color}/>
              <div>
                <div style={{fontWeight:600, fontSize:12}}>{a.label}</div>
                <div style={{fontSize:10, color:'var(--text-muted)'}}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
