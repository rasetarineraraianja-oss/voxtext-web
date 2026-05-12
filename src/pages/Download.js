import React, { useState } from 'react';

function Download({ user, apiUrl }) {
  const [url, setUrl] = useState('');
  const [fmt, setFmt] = useState('mp3');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (!url) {
      setStatus('⚠️ Entrez un lien valide.');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setStatus('⚠️ Le lien doit commencer par http:// ou https://');
      return;
    }

    setLoading(true);
    setProgress(10);
    setStatus('⏳ Téléchargement en cours...');

    try {
      const res = await fetch(`${apiUrl}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, fmt, email: user.email }),
      });

      setProgress(80);

      if (!res.ok) {
        const data = await res.json();
        setStatus(`✖ ${data.error || 'Erreur serveur'}`);
        setLoading(false);
        setProgress(0);
        return;
      }

      // Télécharger le fichier
      const blob = await res.blob();
      const contentDisposition = res.headers.get('content-disposition');
      let filename = `voxtext_download.${fmt}`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);

      setProgress(100);
      setStatus('✔ Téléchargement terminé !');
    } catch (e) {
      setStatus('✖ Erreur réseau.');
      setProgress(0);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>⬇ Télécharger un média</h2>
        <p style={styles.subtitle}>YouTube, SoundCloud, Vimeo et plus</p>

        <label style={styles.label}>🔗 Lien du média</label>
        <input
          style={styles.input}
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={loading}
        />

        <label style={styles.label}>Format</label>
        <div style={styles.fmtRow}>
          {[['mp3', '#1db954', 'Audio MP3'], ['mp4', '#ff4444', 'Vidéo MP4'], ['wav', '#6c63ff', 'Audio WAV']].map(([f, color, label]) => (
            <button
              key={f}
              style={{
                ...styles.fmtBtn,
                background: fmt === f ? color : '#2a2a3a',
                color: fmt === f ? 'white' : '#a0a0c0',
              }}
              onClick={() => setFmt(f)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Barre de progression */}
        {loading && (
          <div style={styles.progOuter}>
            <div style={{...styles.progBar, width: `${progress}%`}} />
          </div>
        )}

        <button
          style={{...styles.btn, opacity: loading ? 0.7 : 1}}
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? `⏳ ${progress}%` : '⬇ Télécharger'}
        </button>

        {status && (
          <p style={{
            ...styles.status,
            color: status.startsWith('✔') ? '#1db954' : status.startsWith('✖') ? '#ff4444' : '#a0a0c0'
          }}>
            {status}
          </p>
        )}
      </div>

      {/* Plateformes supportées */}
      <div style={styles.card}>
        <h3 style={styles.title}>📱 Plateformes supportées</h3>
        <div style={styles.platforms}>
          {[
            ['YouTube', '#FF0000'],
            ['SoundCloud', '#FF5500'],
            ['Vimeo', '#1AB7EA'],
            ['Dailymotion', '#0066CC'],
          ].map(([name, color]) => (
            <div key={name} style={{...styles.platform, borderLeft: `3px solid ${color}`}}>
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Avertissement */}
      <div style={{...styles.card, borderLeft: '3px solid #ff4444'}}>
        <p style={styles.warning}>
          ⚖️ <strong>Droits d'auteur :</strong> Utilisez cet outil uniquement pour des contenus libres de droits ou dont vous êtes l'auteur.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, margin: '0 auto' },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: { color: 'white', margin: 0, fontSize: 18 },
  subtitle: { color: '#a0a0c0', margin: 0, fontSize: 13 },
  label: { color: '#a0a0c0', fontSize: 12, fontWeight: 'bold' },
  input: {
    background: '#1e1e2e',
    border: '1px solid #2a2a3a',
    borderRadius: 8,
    padding: '12px 16px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  fmtRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  fmtBtn: {
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 'bold',
  },
  progOuter: {
    background: '#2a2a3a',
    borderRadius: 4,
    height: 4,
    overflow: 'hidden',
  },
  progBar: {
    background: '#6c63ff',
    height: '100%',
    transition: 'width 0.3s ease',
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
  },
  status: { margin: 0, fontSize: 13 },
  platforms: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  platform: {
    background: '#1e1e2e',
    padding: '8px 16px',
    borderRadius: 8,
    color: '#a0a0c0',
    fontSize: 13,
  },
  warning: { color: '#a0a0c0', fontSize: 13, margin: 0 },
};

export default Download;