"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore'; 
import { db } from '../../lib/firebase/config';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeQuotes: 0,
    rentedThisWeek: 0,
    totalCities: 6
  });

  useEffect(() => {
    // Escuchar el total de productos en vivo
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      setStats(prev => ({ ...prev, totalProducts: snapshot.size }));
    });

    // Simularemos cotizaciones activas y rentas de la semana
    // (Esto leerá de la bbdd de cotizaciones/reservas más adelante)
    setStats(prev => ({ 
      ...prev, 
      activeQuotes: 3,
      rentedThisWeek: 14 // Dato simulado por ahora
    }));

    return () => {
      unsubProducts();
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Panorama General (Dashboard)</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Métricas en tiempo real de tu negocio escenográfico.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="admin-card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 0 }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Inventario Activo</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
            {stats.totalProducts} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>piezas</span>
          </p>
        </div>
        
        <div className="admin-card" style={{ borderLeft: '4px solid #10b981', marginBottom: 0 }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Cotizaciones Pendientes</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', margin: '0.5rem 0' }}>
            {stats.activeQuotes} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>leads</span>
          </p>
          <a href="/admin/cotizaciones" style={{ fontSize: '0.85rem', color: '#10b981', textDecoration: 'underline' }}>Atender ahora →</a>
        </div>

        <div className="admin-card" style={{ borderLeft: '4px solid #3b82f6', marginBottom: 0 }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Rentadas (Esta semana)</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', margin: '0.5rem 0' }}>
            {stats.rentedThisWeek} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>piezas</span>
          </p>
        </div>

        <div className="admin-card" style={{ borderLeft: '4px solid #f59e0b', marginBottom: 0 }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Sedes Operativas</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0.5rem 0' }}>
            {stats.totalCities}
          </p>
        </div>
      </div>

      <div className="admin-card">
        <h3>Última Actividad</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          El sistema está monitoreando en tiempo real. Configura tu primera cuenta de correo para recibir notificaciones cuando un cliente envíe el Carrito B2B desde el catálogo público.
        </p>
      </div>
    </div>
  );
}
