"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../../lib/firebase/config';

export default function AdminProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodega, setSelectedBodega] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  // Escuchar la base de datos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error obteniendo productos de Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleApprove = async (id) => {
    if(window.confirm("¿Aprobar esta pieza para que aparezca públicamente en el catálogo?")) {
      await updateDoc(doc(db, "products", id), { status: 'Activo' });
    }
  };

  const filteredProducts = products.filter(p => {
    // 1. Search term
    const term = searchTerm.toLowerCase();
    const name = p.name ? p.name.toLowerCase() : '';
    const sku = p.sku ? p.sku.toLowerCase() : '';
    const matchesSearch = name.includes(term) || sku.includes(term);

    // 2. Bodega Filter
    let matchesBodega = true;
    if (selectedBodega !== 'Todas') {
      const key = selectedBodega.toLowerCase();
      matchesBodega = p.availability && p.availability[key] > 0;
    }

    // 3. Status Filter (Activo / Pendiente)
    let matchesStatus = true;
    const prodStatus = p.status || 'Activo'; // Fallback a Activo si no tiene
    if (selectedStatus === 'Pendientes') matchesStatus = prodStatus === 'Pendiente';
    if (selectedStatus === 'Activos') matchesStatus = prodStatus === 'Activo';

    return matchesSearch && matchesBodega && matchesStatus;
  });

  // Calculate counters based on specific needs
  const totalPhysicalItems = filteredProducts.reduce((acc, p) => {
    return acc + (p.availability?.cdmx || 0) + 
                 (p.availability?.gdl || 0) + 
                 (p.availability?.mty || 0) +
                 (p.availability?.puebla || 0) +
                 (p.availability?.slp || 0) +
                 (p.availability?.toluca || 0);
  }, 0);

  const pendientesCount = products.filter(p => p.status === 'Pendiente').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Inventario Maestro</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Fichas únicas: <strong>{filteredProducts.length}</strong> | Piezas físicas contabilizadas: <strong style={{color: 'var(--primary)'}}>{totalPhysicalItems}</strong>
          </p>
        </div>
        <a href="/admin/productos/nuevo" className="btn btn-primary">
          + Subir Nueva Pieza
        </a>
      </div>

      <div className="admin-card">
        {/* FILTERS TRAY */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="🔍 Buscar SKU o Nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px', flexGrow: 1 }}
          />

          <select className="form-input" value={selectedBodega} onChange={e => setSelectedBodega(e.target.value)} style={{ width: 'auto', minWidth: '150px' }}>
            <option value="Todas">🛢️ Todas las Bodegas</option>
            <option value="cdmx">Bodega CDMX</option>
            <option value="gdl">Bodega Guadalajara</option>
            <option value="mty">Bodega Monterrey</option>
            <option value="puebla">Bodega Puebla</option>
            <option value="slp">Bodega San Luis Potosí</option>
            <option value="toluca">Bodega Toluca</option>
          </select>

          <select className="form-input" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ width: 'auto', minWidth: '150px' }}>
            <option value="Todos">📦 Todo el Estatus</option>
            <option value="Activos">🟢 Activos (Públicos)</option>
            <option value="Pendientes">🔴 Pendientes de Aprobar ({pendientesCount})</option>
          </select>
        </div>

        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Conectando a Firebase Database...</p>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>No hay productos coincidentes</h2>
            <p>Intenta cambiar los filtros de búsqueda o bodega arriba.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '1rem' }}>Fotografía</th>
                  <th style={{ padding: '1rem' }}>Identificador</th>
                  <th style={{ padding: '1rem' }}>Sedes con Stock</th>
                  <th style={{ padding: '1rem' }}>Estatus</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Administrar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => {
                  const totalStock = (product.availability?.cdmx || 0) + 
                                     (product.availability?.gdl || 0) + 
                                     (product.availability?.mty || 0) +
                                     (product.availability?.puebla || 0) +
                                     (product.availability?.slp || 0) +
                                     (product.availability?.toluca || 0);
                  const isPending = product.status === 'Pendiente';
                                     
                  return (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s', backgroundColor: isPending ? '#fffbeb' : 'transparent' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: '0.75rem' }}>Sin foto</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: 'var(--primary)', display: 'block' }}>{product.sku}</strong>
                        <span style={{ fontWeight: '500', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>{product.name}</span>
                        <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 'bold' }}>${product.rentalPrice} MXN / día</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="info-badge" style={{ display: 'inline-block', marginBottom: '4px' }}>{totalStock} piezas totales</span>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {product.availability?.cdmx > 0 && <span style={{ marginRight: '6px' }}>CDMX:{product.availability.cdmx}</span>}
                          {product.availability?.gdl > 0 && <span style={{ marginRight: '6px' }}>GDL:{product.availability.gdl}</span>}
                          {product.availability?.mty > 0 && <span style={{ marginRight: '6px' }}>MTY:{product.availability.mty}</span>}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {isPending ? (
                          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            Por Aprobar
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            Público Activo
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                        
                        {isPending && (
                          <button onClick={() => handleApprove(product.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem' }}>
                            ✅ Aprobar
                          </button>
                        )}

                        <a 
                          href={`/admin/productos/editar/${product.id}`}
                          className="btn btn-secondary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8.5rem', textDecoration: 'none' }}
                        >
                          ✏️ Editar
                        </a>
                        <button 
                          onClick={async () => {
                            if(window.confirm(`¿ESTÁS SEGURO de querer eliminar la pieza ${product.sku} permanentemente?`)) {
                              await deleteDoc(doc(db, "products", product.id));
                            }
                          }}
                          style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.4rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                          title="Borrar Pieza"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
