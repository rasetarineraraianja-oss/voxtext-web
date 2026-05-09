import React, { useState, useRef } from 'react';

function Player({ user }) {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setAudioUrl(URL.createObjectURL(f));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎵 Lecteur Audio</h2>

        <label style={styles.label}>Fichier audio</label>
        <input
          type="file"
          accept=".mp3,.wav,.m4a,.flac,.ogg,.aac"
          onChange={handleFile}
          style={styles.fileInput}
        />

        {file && <p style={styles.fileName}>📁 {file.name}</p>}

        {audioUrl && (
          <div style={styles.playerContainer}>
            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              style={styles.audio}
            />
          </div>
        )}

        {!audioUrl && (
          <div style={styles.placeholder}>
            <p style={styles.placeholderText}>🎵 Sélectionnez un fichier audio</p>
          </div>
        )}
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
  fileInput: { color: 'white', fontSize: 14 },
  fileName: { color: '#6c63ff', fontSize: 13, margin: 0 },
  playerContainer: {
    background: '#1e1e2e',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  audio: { width: '100%' },
  placeholder: {
    background: '#1e1e2e',
    borderRadius: 8,
    padding: 40,
    textAlign: 'center',
    marginTop: 8,
  },
  placeholderText: { color: '#a0a0c0', margin: 0 },
};

export default Player;