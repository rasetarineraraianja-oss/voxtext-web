import React, { useState } from 'react';

function Download({ user, apiUrl }) {
  const [url, setUrl] = useState('');
  const [fmt, setFmt] = useState('mp3');
  const [status, setStatus] = useState('');

  const handleDownload = async () => {
    if (!url) {
      setStatus('⚠️ Entrez un lien valide.');
      return;
    }
    setStatus('⏳ Téléchargement en cours...');
    try {
      const res = await fetch(`${apiUrl}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, fmt, email: user.email }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus(`✖ ${data.error}`);
      } else {
        setStatus('✔ Téléchargement terminé !');
      }
    } catch (e) {
      setStatus('✖ Erreur réseau.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>⬇ Télécharger un média</h2>

        <label style={styles.label}>Lien du média</label>
        <input
          style={styles.input}
          type="url"
          placeholder="https://youtube.com/..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />

        <label style={styles.label}>Format</label>
        <div style={styles.fmtRow}>
          {[['mp3', '#1db954'], ['mp4', '#ff4444'], ['wav', '#6c63ff']].map(([f, color]) => (
            <button
              key={f}
              style={{
                ...styles.fmtBtn,
                background: fmt === f ? color : '#2a2a3a',
                color: fmt === f ? 'white' : '#a0a0c0',
              }}
              onClick={() => setFmt(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <button style={styles.btn} onClick={handleDownload}>
          ⬇ Télécharger
        </button>

        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: '0 auto' },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: { color: 'white', margin: '0 0 8px', fontSize: 18 },
  label: { color: '#a0a0c0', fontSize: 12, fontWeight: 'bold' },
  input: {
    background: '#1e1e2e',
    border: '1px solid #2a2a3a',
    borderRadius: 8,
    padding: '12px 16px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
  },
  fmtRow: { display: 'flex', gap: 8 },
  fmtBtn: {
    border: 'none',
    borderRadius: 8,
    padding: '8px 20px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 'bold',
  },
  btn: {
    background: '#4ecdc4',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '14px',
    fontSize: 15,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 8,
  },
  status: { color: '#a0a0c0', fontSize: 13, margin: 0 },
};

export default Download;