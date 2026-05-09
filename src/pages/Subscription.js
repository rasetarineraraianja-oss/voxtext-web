import React, { useState } from 'react';

function Subscription({ user, apiUrl }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = async (provider) => {
    setLoading(true);
    setStatus(`⏳ Connexion à ${provider}...`);
    try {
      const res = await fetch(`${apiUrl}/create-checkout-session/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus(`✖ ${data.error}`);
      } else {
        window.open(data.checkout_url, '_blank');
        setStatus('✔ Page de paiement ouverte dans un nouvel onglet.');
      }
    } catch (e) {
      setStatus('✖ Erreur réseau.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Abonnement</h2>

        <div style={styles.planRow}>
          {/* Plan Gratuit */}
          <div style={{...styles.plan, border: user.plan === 'free' ? '2px solid #6c63ff' : '1px solid #2a2a3a'}}>
            <h3 style={styles.planTitle}>🆓 Gratuit</h3>
            <p style={styles.planPrice}>0 € / mois</p>
            <ul style={styles.features}>
              <li>✔ 3 transcriptions d'essai</li>
              <li>✔ Lecteur audio</li>
              <li>✔ Téléchargement</li>
              <li style={{color: '#555'}}>✖ Transcriptions illimitées</li>
            </ul>
            {user.plan === 'free' && <span style={styles.current}>Plan actuel</span>}
          </div>

          {/* Plan Pro */}
          <div style={{...styles.plan, border: user.plan === 'pro' ? '2px solid #a78bfa' : '1px solid #2a2a3a'}}>
            <h3 style={styles.planTitle}>⭐ Pro</h3>
            <p style={{...styles.planPrice, color: '#a78bfa'}}>4,99 € / mois</p>
            <ul style={styles.features}>
              <li>✔ Transcriptions illimitées</li>
              <li>✔ Lecteur audio</li>
              <li>✔ Téléchargement</li>
              <li>✔ Support prioritaire</li>
            </ul>
            {user.plan === 'pro' && <span style={{...styles.current, background: '#a78bfa'}}>Plan actuel</span>}
          </div>
        </div>

        {user.plan === 'free' && (
          <div style={styles.paySection}>
            <h3 style={styles.payTitle}>Passer au Pro</h3>
            <div style={styles.btnRow}>
              <button
                style={styles.stripeBtn}
                onClick={() => handlePay('stripe')}
                disabled={loading}
              >
                💳 Payer par carte
              </button>
              <button
                style={styles.paypalBtn}
                onClick={() => handlePay('paypal')}
                disabled={loading}
              >
                🅿 PayPal
              </button>
            </div>
            {status && <p style={styles.status}>{status}</p>}
          </div>
        )}

        {user.plan === 'pro' && (
          <p style={styles.proMsg}>
            🎉 Vous êtes sur le plan Pro — transcriptions illimitées !
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 800, margin: '0 auto' },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 12,
    padding: 24,
  },
  title: { color: 'white', margin: '0 0 20px', fontSize: 18 },
  planRow: { display: 'flex', gap: 16, marginBottom: 24 },
  plan: {
    flex: 1,
    background: '#1e1e2e',
    borderRadius: 12,
    padding: 20,
  },
  planTitle: { color: 'white', margin: '0 0 8px', fontSize: 16 },
  planPrice: { color: '#6c63ff', fontSize: 22, fontWeight: 'bold', margin: '0 0 16px' },
  features: { color: '#a0a0c0', fontSize: 13, paddingLeft: 0, listStyle: 'none', margin: 0, lineHeight: 2 },
  current: {
    background: '#6c63ff',
    color: 'white',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: 12,
  },
  paySection: { borderTop: '1px solid #2a2a3a', paddingTop: 20 },
  payTitle: { color: 'white', margin: '0 0 16px', fontSize: 16 },
  btnRow: { display: 'flex', gap: 12 },
  stripeBtn: {
    background: '#635bff',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '14px 24px',
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  paypalBtn: {
    background: '#003087',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '14px 24px',
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  status: { color: '#a0a0c0', fontSize: 13, marginTop: 12 },
  proMsg: { color: '#1db954', fontSize: 15, textAlign: 'center', margin: '16px 0 0' },
};

export default Subscription;