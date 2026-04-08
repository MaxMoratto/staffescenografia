"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // LLAVE MAESTRA ABSOLUTA: Saltar seguridad estricta de Firebase por un momento
    if (email === 'maxmoratto@gmail.com' && pwd === '1852maximo*1') {
      localStorage.setItem('admin_override', 'true');
      window.location.href = '/admin';
      return; // Cierra la ejecución
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
      window.location.href = '/admin';
    } catch(err) {
      console.error(err);
      setError(`Error Firebase: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', padding: '1rem' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem' }}>
            🔒
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            Acceso a Backoffice
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Plataforma operativa para Staff de Escenografía
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Correo de Autorizado
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              placeholder="vendedor@empresa.com"
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Contraseña Segura
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={pwd} 
                onChange={e => setPwd(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
                placeholder="••••••••"
              />
              <button 
                type="button"
                tabIndex="-1"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar Contraseña" : "Ver Contraseña"}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#94a3b8' }}
              >
                {showPassword ? '👁️' : '🔑'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '0.9rem', 
              backgroundColor: 'var(--primary)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Verificando credenciales...' : 'Entrar al Sistema'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="/catalogo" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Volver al Catálogo Público
          </a>
        </div>
      </div>
    </div>
  );
}
