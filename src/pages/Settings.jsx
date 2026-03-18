import React, { useState } from 'react';
import { Moon, Sun, Bell, Shield, Globe, CreditCard, Key, ChevronRight, Smartphone, Eye, EyeOff } from 'lucide-react';

const ToggleRow = ({ label, desc, value, onChange }) => (
  <div className="settings-row">
    <div>
      <div style={{fontWeight:500}}>{label}</div>
      {desc && <div style={{fontSize:11, color:'var(--text-muted)', marginTop:2}}>{desc}</div>}
    </div>
    <button className={`toggle-btn ${value ? 'toggle-on' : ''}`} onClick={() => onChange(!value)}>
      <span className="toggle-thumb"/>
    </button>
  </div>
);

const LinkRow = ({ icon: Icon, label, desc, badge }) => (
  <div className="settings-row clickable">
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <div className="settings-icon-wrap"><Icon size={15}/></div>
      <div>
        <div style={{fontWeight:500}}>{label}</div>
        {desc && <div style={{fontSize:11, color:'var(--text-muted)', marginTop:2}}>{desc}</div>}
      </div>
    </div>
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      {badge && <span className="settings-badge">{badge}</span>}
      <ChevronRight size={15} color="var(--text-muted)"/>
    </div>
  </div>
);

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Customize your trading platform experience</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Appearance */}
        <div className="settings-section">
          <div className="settings-section-title">
            {darkMode ? <Moon size={14}/> : <Sun size={14}/>} Appearance
          </div>
          <ToggleRow label="Dark Mode" desc="Use dark theme across all pages" value={darkMode} onChange={setDarkMode}/>
          <div className="settings-row">
            <div>
              <div style={{fontWeight:500}}>Currency</div>
              <div style={{fontSize:11, color:'var(--text-muted)', marginTop:2}}>Display currency</div>
            </div>
            <select className="settings-select" value={currency} onChange={e => setCurrency(e.target.value)}>
              {['USD', 'EUR', 'GBP', 'JPY', 'INR'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="settings-row">
            <div>
              <div style={{fontWeight:500}}>Language</div>
              <div style={{fontSize:11, color:'var(--text-muted)', marginTop:2}}>Interface language</div>
            </div>
            <select className="settings-select" value={language} onChange={e => setLanguage(e.target.value)}>
              {['English', 'Spanish', 'French', 'German', 'Japanese'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <div className="settings-section-title"><Bell size={14}/> Notifications</div>
          <ToggleRow label="Push Notifications" desc="Real-time alerts in the app" value={notifications} onChange={setNotifications}/>
          <ToggleRow label="Email Alerts" desc="Price alerts via email" value={emailAlerts} onChange={setEmailAlerts}/>
          <ToggleRow label="SMS Alerts" desc="Critical alerts via SMS" value={smsAlerts} onChange={setSmsAlerts}/>
        </div>

        {/* Security */}
        <div className="settings-section">
          <div className="settings-section-title"><Shield size={14}/> Security</div>
          <ToggleRow label="Two-Factor Authentication" desc="Extra login security layer" value={twoFA} onChange={setTwoFA}/>
          <ToggleRow label="Biometric Login" desc="Use fingerprint or Face ID" value={biometric} onChange={setBiometric}/>
          <LinkRow icon={Key} label="Change Password" desc="Last changed 30 days ago"/>
          <LinkRow icon={Smartphone} label="Trusted Devices" desc="3 devices authorized" badge="3"/>
        </div>

        {/* Account */}
        <div className="settings-section">
          <div className="settings-section-title"><CreditCard size={14}/> Account</div>
          <LinkRow icon={CreditCard} label="Payment Methods" desc="Manage linked cards & wallets" badge="2"/>
          <LinkRow icon={Globe} label="KYC Verification" desc="Identity verified" badge="✓"/>
          <LinkRow icon={Shield} label="API Keys" desc="Manage trading API access"/>
          <div className="settings-row">
            <button className="danger-btn">Delete Account</button>
            <button className="logout-btn">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
