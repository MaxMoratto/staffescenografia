"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import ProductCard from './ProductCard';
import '../app/catalogo/catalogo.css'; // Add this to steal the catalog CSS!

export default function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const inv = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Shuffle array safely
        for (let i = inv.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [inv[i], inv[j]] = [inv[j], inv[i]];
        }
        
        // Take exactly 5
        setProducts(inv.slice(0, 5));
      } catch (err) {
        console.error("Error fetching random products", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
         Cargando catálogo destacado...
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section style={{ maxWidth: '1200px', margin: '5rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>EXPLORA</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: '#1e293b' }}>Piezas Destacadas</h2>
        <p style={{ color: '#475569' }}>Un vistazo a nuestro inventario premium.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '1.5rem' 
      }}>
        {products.map(p => (
           <div key={p.id} style={{ flex: '1 1 200px', maxWidth: '220px', minWidth: '180px' }}>
             <ProductCard 
               product={p} 
               onOpenDetails={(p) => window.location.href = `/catalogo?busqueda=${p.sku || p.id}`} 
             />
           </div>
        ))}
      </div>
    </section>
  );
}
