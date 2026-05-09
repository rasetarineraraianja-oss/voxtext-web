import React, { useState } from 'react';
import Transcribe from './Transcribe';
import Download from './Download';
import Subscription from './Subscription';
import Player from './Player';


function Dashboard({ user, onLogout, apiUrl }) {
  const [tab, setTab] = useState('transcribe');

  const tabs = [
    { key: 'transcribe', label: '🎙 Transcrire' },
    { key: 'download', label: '⬇ Télécharger' },
    { key: 'player', label: '🎵 Lecteur' },
    { key: 'subscription', label: '💳 Abonnement' },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoText}>🎙 VoxText</span>
          <span style={styles.logoSub}>Transcription IA</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.badge}>
            {user.plan === 'pro' ? '⭐ PRO' : '🆓 Free'}
          </span>
          <span style={styles.email}>{user.email}</span>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {tabs.map(t => (
          <button
            key={t.key}
            style={{
              ...styles.tabBtn,
              ...(tab === t.key ? styles.tabActive : {}),
            }}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {tab === 'transcribe' && <Transcribe user={user} apiUrl={apiUrl} />}
        {tab === 'download' && <Download user={user} apiUrl={apiUrl} />}
        {tab === 'subscription' && <Subscription user={user} apiUrl={apiUrl} />}
        {tab === 'player' && <Player user={user} />}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0d0d14', color: 'white' },
  header: {
    background: '#16161f',
    borderBottom: '1px solid #2a2a3a',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 12 },
  logoText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  logoSub: { fontSize: 12, color: '#a0a0c0' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  badge: {
    background: '#6c63ff',
    color: 'white',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
  },
  email: { color: '#a0a0c0', fontSize: 13 },
  logoutBtn: {
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: 13,
  },
  tabBar: {
    display: 'flex',
    gap: 4,
    padding: '16px 24px 0',
    borderBottom: '1px solid #2a2a3a',
  },
  tabBtn: {
    background: 'transparent',
    color: '#a0a0c0',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: 14,
    borderRadius: '8px 8px 0 0',
  },
  tabActive: {
    color: 'white',
    fontWeight: 'bold',
    borderBottom: '2px solid #6c63ff',
  },
  content: { padding: 24 },
};

export default Dashboard;