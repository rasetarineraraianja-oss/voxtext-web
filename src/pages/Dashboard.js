import React, { useState } from 'react';
import Download from './Download';

function Dashboard({ user, onLogout, apiUrl }) {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoText}>🎙 VoxText</span>
          <span style={styles.logoSub}>Transcription IA</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.email}>{user.email}</span>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Banner */}
      <div style={styles.banner}>
        <span>🎙 Vous voulez transcrire vos audios ?</span>

          href="https://github.com/rasetarineraraianja-oss/voxtext-backend/releases"
          target="_blank"
          rel="noreferrer"
          style={styles.bannerLink}
        >
          Télécharger l'appli VoxText →
        </a>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <Download user={user} apiUrl={apiUrl} />
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
  banner: {
    background: '#1e1e2e',
    borderBottom: '1px solid #2a2a3a',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#a0a0c0',
    fontSize: 13,
  },
  bannerLink: {
    color: '#6c63ff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  content: { padding: 24 },
};

export default Dashboard;