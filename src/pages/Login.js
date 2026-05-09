import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, apiUrl }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${apiUrl}/login`, { email, password });
      if (res.data.error) {
        setError(res.data.error);
      } else {
        onLogin(res.data);
      }
    } catch (e) {
      setError('Serveur inaccessible. Réessayez.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎙 VoxText</h1>
        <p style={styles.subtitle}>Transcription IA</p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.btn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? '⏳ Connexion...' : 'Se connecter'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0d0d14',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 16,
    padding: '48px 40px',
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0,
  },
  subtitle: {
    color: '#a0a0c0',
    textAlign: 'center',
    margin: '0 0 16px',
  },
  input: {
    background: '#1e1e2e',
    border: '1px solid #2a2a3a',
    borderRadius: 8,
    padding: '12px 16px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
  },
  error: {
    color: '#ff4444',
    fontSize: 13,
    margin: 0,
  },
  btn: {
    background: '#6c63ff',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '14px',
    fontSize: 15,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 8,
  },
};

export default Login;
