"use client";

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/config';

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // 🚦 Bypaseo de seguridad para el Master
    const isMaster = localStorage.getItem('admin_override') === 'true';
    if (isMaster) {
      setAuthenticated(true);
      setLoading(false);
      return;
    }

    // Escuchar el estado de autenticación real de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        // Redirigir inmediatamente y duro
        setAuthenticated(false);
        window.location.href = "/login";
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
        <h2 style={{ color: 'var(--text-secondary)' }}>Protocolo de Seguridad...</h2>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Si no está autenticado, no renderiza NADA del backoffice porque ya lo mandó a volar a /login.
  return authenticated ? <>{children}</> : null;
}
