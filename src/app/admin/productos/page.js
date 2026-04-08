"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore'; 
import { db } from '../../../lib/firebase/config';

export default function AdminProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    const name = p.name ? p.name.toLowerCase() : '';
    const sku = p.sku ? p.sku.toLowerCase() : '';
    return name.includes(term) || sku.includes(term);
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Inventario de Productos</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestiona y edita tu catálogo activo ({products.length} piezas)</p>
        </div>
        <a href="/admin/productos/nuevo" className="btn btn-primary">
          + Subir Nueva Pieza
        </a>
      </div>

      <div className="admin-card">
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Buscador Inteligente (SKU o Nombre)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {loading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Conectando a Firebase...</p>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>No hay productos para mostrar</h2>
            <p>Sube el primer producto premium usando el botón azul de arriba.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem' }}>Imagen</th>
                <th style={{ padding: '1rem' }}>SKU</th>
                <th style={{ padding: '1rem' }}>Nombre de la Pieza</th>
                <th style={{ padding: '1rem' }}>Sedes (Stock)</th>
                <th style={{ padding: '1rem' }}>Precio / Día</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
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
                return (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: '0.75rem' }}>Sin foto</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{product.sku}</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{product.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="info-badge">{totalStock} disp. totales</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '600' }}>${product.rentalPrice}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <a 
                        href={`/admin/productos/editar/${product.id}`}
                        className="btn btn-secondary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', textDecoration: 'none' }}
                      >
                        ✏️ Editar Ficha
                      </a>
                      <button 
                        onClick={async () => {
                          if(window.confirm(`¿⚠️ ESTÁS ABSOLUTAMENTE SEGURO de querer eliminar la pieza ${product.sku} permanentemente? Esto la quitará del catálogo al instante.`)) {
                            await deleteDoc(doc(db, "products", product.id));
                          }
                        }}
                        style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                      >
                        🗑️ Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
