"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';

export default function VendedoresPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  // Fetch Vendedores
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const q = collection(db, "vendors");
      const snapshot = await getDocs(q);
      const vendorsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVendors(vendorsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAddVendor = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await addDoc(collection(db, "vendors"), {
        name,
        phone,
        code: code.toUpperCase(),
        createdAt: new Date(),
        status: 'Activo'
      });
      // Restablecer
      setName('');
      setPhone('');
      setCode('');
      fetchVendors(); // Refresh UI
    } catch(e) {
      console.error("Error", e);
      alert("Error guardando vendedor");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este vendedor?")) {
      await deleteDoc(doc(db, "vendors", id));
      fetchVendors();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Gestión de Equipo y Vendedores</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* FORMULARIO DE ALTA */}
        <div className="admin-card" style={{ alignSelf: 'start' }}>
          <h3>➕ Nuevo Vendedor</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Otorga un "Código de Vendedor" único (Ej. MAX123) que tus asesores le darán a los clientes para rastrear sus cotizaciones.
          </p>
          <form onSubmit={handleAddVendor}>
            <div className="form-group">
              <label>Nombre del Asesor</label>
              <input type="text" className="form-input" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Max Moratto" />
            </div>
            <div className="form-group">
              <label>WhatsApp de Contacto (10 dígitos)</label>
              <input type="text" className="form-input" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ej. 5512345678" />
            </div>
            <div className="form-group">
              <label>Código Único Sugerido</label>
              <input type="text" className="form-input" required value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Ej. MAX-01" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Dar de Alta'}
            </button>
          </form>
        </div>

        {/* LISTA DE VENDEDORES */}
        <div className="admin-card">
          <h3>📊 Vendedores Activos</h3>
          {loading ? <p>Cargando plantilla...</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Asesor</th>
                  <th style={{ padding: '0.75rem' }}>WhatsApp</th>
                  <th style={{ padding: '0.75rem' }}>Código asignado</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vendors.length === 0 ? (
                  <tr>
                     <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Aún no tienes vendedores dados de alta.</td>
                  </tr>
                ) : (
                  vendors.map(v => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{v.name}</td>
                      <td style={{ padding: '0.75rem' }}>{v.phone}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ backgroundColor: '#f0f9ff', color: '#0369a1', padding: '0.3rem 0.6rem', borderRadius: '4px', fontWeight: 'bold' }}>
                          {v.code}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button onClick={() => handleDelete(v.id)} style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Baja</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
