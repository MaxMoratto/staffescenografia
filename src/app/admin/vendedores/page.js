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
  const [emailField, setEmailField] = useState('');
  const [pwdField, setPwdField] = useState('');

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
        email: emailField.toLowerCase(),
        password: pwdField,
        code: code.toUpperCase(),
        createdAt: new Date(),
        status: 'Activo'
      });
      // Restablecer
      setName('');
      setPhone('');
      setCode('');
      setEmailField('');
      setPwdField('');
      fetchVendors(); // Refresh UI
    } catch(e) {
      console.error("Error", e);
      alert("Error guardando vendedor");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    import('firebase/firestore').then(({ updateDoc }) => {
      const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
      updateDoc(doc(db, "vendors", id), { status: newStatus }).then(() => {
        fetchVendors();
      });
    });
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este vendedor por completo? (Es mejor solo Apagar su Acceso)")) {
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
              <label>Nombre del Asesor o Staff</label>
              <input type="text" className="form-input" required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Max Moratto" />
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Correo Electrónico (Acceso)</label>
                <input type="email" className="form-input" required value={emailField} onChange={e => setEmailField(e.target.value)} placeholder="juan@staff.com" />
              </div>
              <div>
                <label>Contraseña (Acceso)</label>
                <input type="text" className="form-input" required value={pwdField} onChange={e => setPwdField(e.target.value)} placeholder="Crea una clave temporal" />
              </div>
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>WhatsApp de Contacto (10 dígitos)</label>
                <input type="text" className="form-input" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ej. 5512345678" />
              </div>
              <div>
                <label>Código Único (Rastreo)</label>
                <input type="text" className="form-input" required value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Ej. MAX-01" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Dar de Alta al Sistema'}
            </button>
          </form>
        </div>

        {/* LISTA DE VENDEDORES / STAFF */}
        <div className="admin-card">
          <h3>📊 Staff Operativo y Vendedores</h3>
          {loading ? <p>Cargando plantilla...</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', minWidth: '500px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Personal</th>
                    <th style={{ padding: '0.75rem' }}>Acceso Web</th>
                    <th style={{ padding: '0.75rem' }}>Estatus</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length === 0 ? (
                    <tr>
                       <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Aún no tienes equipo dado de alta.</td>
                    </tr>
                  ) : (
                    vendors.map(v => (
                      <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9', opacity: v.status === 'Inactivo' ? 0.6 : 1 }}>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ fontWeight: 'bold', display: 'block' }}>{v.name}</span>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cód: <b style={{color: '#c39b5b'}}>{v.code}</b> | WA: {v.phone}</span>
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                          {v.email} <br/> <span style={{ color: '#94a3b8' }}>🔑 {v.password}</span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          {v.status === 'Activo' 
                            ? <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>🟢 Activo</span>
                            : <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>⚫ Apagado</span>
                          }
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => handleToggleStatus(v.id, v.status)} 
                            style={{ backgroundColor: v.status === 'Activo' ? '#fffbeb' : '#f0fdf4', color: v.status === 'Activo' ? '#d97706' : '#16a34a', border: '1px solid', borderColor: v.status === 'Activo' ? '#fcd34d' : '#86efac', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {v.status === 'Activo' ? 'Apagar Acceso' : 'Encender Acceso'}
                          </button>
                          <button onClick={() => handleDelete(v.id)} style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Borrar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
