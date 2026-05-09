import React, { useState } from 'react';
import axios from 'axios';

function Transcribe({ user, apiUrl }) {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState('auto');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleTranscribe = async () => {
    if (!file) {
      setStatus('⚠️ Sélectionnez un fichier audio.');
      return;
    }
    setLoading(true);
    setStatus('⏳ Transcription en cours...');
    setResult('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', lang);
    formData.append('email', user.email);

    try {
      const res = await axios.post(`${apiUrl}/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000,
      });
      if (res.data.error) {
        setStatus(`✖ ${res.data.error}`);
      } else {
        setResult(res.data.text || '');
        setStatus('✔ Transcription terminée !');
      }
    } catch (e) {
      setStatus('✖ Erreur lors de la transcription.');
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    setStatus('✔ Copié !');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎙 Transcription Audio</h2>

        {/* Sélection fichier */}
        <div style={styles.section}>
          <label style={styles.label}>Fichier audio</label>
          <input
            type="file"
            accept=".mp3,.wav,.m4a,.flac,.ogg,.aac"
            onChange={e => setFile(e.target.files[0])}
            style={styles.fileInput}
          />
          {file && <p style={styles.fileName}>📁 {file.name}</p>}
        </div>

        {/* Langue */}
        <div style={styles.section}>
          <label style={styles.label}>Langue</label>
          <div style={styles.langRow}>
            {[['auto', '🌐 Auto'], ['fr', '🇫🇷 Français'], ['en', '🇬🇧 English']].map(([code, label]) => (
              <button
                key={code}
                style={{
                  ...styles.langBtn,
                  ...(lang === code ? styles.langActive : {}),
                }}
                onClick={() => setLang(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton */}
        <button
          style={styles.btn}
          onClick={handleTranscribe}
          disabled={loading}
        >
          {loading ? '⏳ Transcription...' : '🎙 Transcrire'}
        </button>

        {status && <p style={styles.status}>{status}</p>}
      </div>

      {/* Résultat */}
      {result && (
        <div style={styles.card}>
          <div style={styles.resultHeader}>
            <h3 style={styles.title}>📝 Transcription</h3>
            <button style={styles.copyBtn} onClick={copyText}>📋 Copier</button>
          </div>
          <textarea
            style={styles.textarea}
            value={result}
            onChange={e => setResult(e.target.value)}
            rows={12}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 800, margin: '0 auto' },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 12,
    padding: 24,
  },
  title: { color: 'white', margin: '0 0 16px', fontSize: 18 },
  section: { marginBottom: 16 },
  label: { color: '#a0a0c0', fontSize: 12, fontWeight: 'bold', display: 'block', marginBottom: 8 },
  fileInput: { color: 'white', fontSize: 14 },
  fileName: { color: '#6c63ff', fontSize: 13, margin: '8px 0 0' },
  langRow: { display: 'flex', gap: 8 },
  langBtn: {
    background: '#2a2a3a',
    color: '#a0a0c0',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 13,
  },
  langActive: { background: '#6c63ff', color: 'white' },
  btn: {
    background: '#1db954',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '14px 24px',
    fontSize: 15,
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },
  status: { color: '#a0a0c0', fontSize: 13, margin: '12px 0 0' },
  resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  copyBtn: {
    background: '#2a2a3a',
    color: '#a0a0c0',
    border: 'none',
    borderRadius: 8,
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: 13,
  },
  textarea: {
    width: '100%',
    background: '#1e1e2e',
    border: '1px solid #2a2a3a',
    borderRadius: 8,
    color: 'white',
    fontSize: 14,
    padding: 12,
    resize: 'vertical',
    boxSizing: 'border-box',
  },
};

export default Transcribe;