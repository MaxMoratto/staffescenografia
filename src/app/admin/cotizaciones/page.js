"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; 
import { db } from '../../../lib/firebase/config';

export default function AdminCotizacionesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar la base de datos de cotizaciones ordenado por más reciente
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuotes(data);
      setLoading(false);
    }, (error) => {
      console.error("Error obteniendo cotizaciones:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Bandeja de Cotizaciones</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Solicitudes entrantes desde el catálogo público ({quotes.length} leads funcionales)</p>
        </div>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Cargando bandeja de Firebase...</p>
        ) : quotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Sin requerimientos nuevos</h2>
            <p>Aún no hay cotizaciones enviadas por clientes. Haz una prueba desde el Catálogo.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {quotes.map(quote => (
              <div key={quote.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span className="badge" style={{ backgroundColor: quote.status === 'Pendiente' ? '#fef08a' : '#bbf7d0', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {quote.status}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Enviada: {quote.createdAt?.toDate ? quote.createdAt.toDate().toLocaleString() : 'Reciente'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{quote.customerInfo.name} <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>- {quote.customerInfo.email}</span></h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}><strong>📍 Sede sugerida:</strong> {quote.customerInfo.location || 'No especificada'}</p>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#16a34a' }}><strong>📞 WhatsApp:</strong> {quote.customerInfo.phone || 'No capturado'}</p>
                  
                  <div style={{ backgroundColor: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px' }}>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>PIEZAS REQUERIDAS:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                      {quote.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span><strong>{item.quantity}x</strong> {item.name} ({item.sku})</span>
                          <span>${item.rentalPrice * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', minWidth: '150px', borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', marginLeft: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Total Estimado Día</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>${quote.totalEstimated}</p>
                  
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', backgroundColor: '#10b981', borderColor: '#10b981' }}
                    onClick={() => {
                        const encodedText = encodeURIComponent(`¡Hola ${quote.customerInfo.name}! 🌟 Somos de Staff Escenografía. Recibimos tu solicitud de cotización por un monto base de $${quote.totalEstimated} MXN / día para tu evento en ${quote.customerInfo.location}. Me encantaría ayudarte con las fechas y logística. ¿En qué fechas sería tu montaje?`);
                        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                        const phoneUrl = quote.customerInfo.phone ? quote.customerInfo.phone.replace(/[^0-9]/g, '') : '';
                        if (isMobile) {
                            window.open(`https://wa.me/${phoneUrl}?text=${encodedText}`, '_blank');
                        } else {
                            window.open(`https://web.whatsapp.com/send?phone=${phoneUrl}&text=${encodedText}`, '_blank');
                        }
                    }}
                  >
                    💬 Contactar por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
