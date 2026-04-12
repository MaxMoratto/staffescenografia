"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModal';
import { useQuote } from '../../context/QuoteContext';
import './catalogo.css'; // specific styles for catalog view
import './catalogo-layout.css'; // specific structural styles
import Link from 'next/link';

export default function CatalogoPage() {
  const { quoteItems, setIsSidebarOpen } = useQuote();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas las Categorías');
  const [themeFilter, setThemeFilter] = useState('TODAS LAS TEMÁTICAS');
  const [bodegaFilter, setBodegaFilter] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Read URL params safely
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      const themeParam = params.get('theme');
      if (themeParam) {
        setThemeFilter(themeParam.toUpperCase()); // Set the exact theme
      }

      const busquedaParam = params.get('busqueda');
      if (busquedaParam) {
        setSearchTerm(busquedaParam); // Set exact SKU or search query from URL link
      }
    }

    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inv = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(inv);
      setLoading(false);
    }, (error) => {
      console.error("Error trayendo inventario de Firebase en tiempo real:", error);
      // Fallback in case of error so it doesn't hang forever
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const uniqueCategories = [
    'Todas las Categorías', 
    'Escenografía Temática', 
    'Props y Decoración', 
    'Mobiliario para Eventos', 
    'Árboles y Plantas', 
    'Juegos e Interactivos'
  ];

  const totalItems = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const THEME_CATEGORIES = [
    {
      title: "🔥 TENDENCIAS (TOP 10)",
      styles: { color: '#b91c1c', marginTop: '1rem' },
      themes: ["Noche de Oscares / Alfombra Roja", "Fórmula 1 / F1 Fiesta Tema", "Alicia en el País de las Maravillas", "París & Burlesque", "Casino Las Vegas", "Circo Vintage", "Baile de Máscaras / Veneciano", "Mardi Gras", "Blanco y Negro (elegante)", "Safari / Selva"]
    },
    {
      title: "🎭 TEMÁTICAS (A - Z)",
      styles: { color: '#334155', marginTop: '1.5rem' },
      themes: ["Alicia en el País de las Maravillas", "Animales", "Animales de Granja", "Animales de Jungla", "Animales de Zoológico", "Árabe", "Baile de Máscaras", "Blanco y Negro", "Caballos", "Caballos de Carrusel", "Caribe", "Caricaturas", "Carnaval", "Casino Las Vegas", "Circo Vintage", "Décadas 70s", "Décadas 80s", "Despecho", "Dragones", "Fórmula 1", "F1 Gran Prix", "F1 Simuladores", "Godzilla", "Granja", "Great Gatsby", "Grease", "Griego", "Harry Potter", "Jungla / Selva", "Jurassic Park", "King Kong", "Las Mil y Una Noches", "Londres", "Mardi Gras", "Mexicano", "Neon Party", "París & Burlesque", "Pirata", "Playa", "Prehistórico", "Romano", "Safari", "Selva / Salvaje", "Star Wars", "Super Héroes", "Veneciano", "Vintage"]
    },
    {
      title: "🎄 TEMPORADA",
      styles: { color: '#15803d', marginTop: '1.5rem' },
      themes: ["Navidad / Christmas", "Nacimientos", "Posadas", "Fiesta de Fin de Año", "Pascua", "Halloween", "Casa de los Espantos", "Catrinas", "Día de Muertos", "Día del Amor y la Amistad", "Oktoberfest"]
    }
  ];

  // Instant Smart Filter Logic
  const filteredProducts = products.filter((p) => {
    const nameStr = (p.name || '').toLowerCase();
    const skuStr = (p.sku || '').toLowerCase();
    const themeStr = (p.theme || '').toLowerCase();
    const searchLow = searchTerm.toLowerCase();

    const matchesSearch = searchTerm === '' || 
      nameStr.includes(searchLow) || 
      skuStr.includes(searchLow) ||
      themeStr.includes(searchLow);

    const matchesCategory = categoryFilter === 'Todas las Categorías' || p.category === categoryFilter;
    
    // Bodega filter
    let matchesBodega = true;
    if (bodegaFilter !== 'Todas') {
      matchesBodega = p.availability && p.availability[bodegaFilter] > 0;
    }

    // Al filtrar por tema, revisar si la selección EXACTA existe dentro del arreglo del producto
    const pThemesArr = (p.theme || '').split(',').map(t => t.trim().toUpperCase());
    const matchesTheme = themeFilter === 'TODAS LAS TEMÁTICAS' || pThemesArr.includes(themeFilter.toUpperCase());
    
    const isActive = p.status === 'Activo' || p.status === 'activo';

    return matchesSearch && matchesCategory && matchesBodega && matchesTheme && isActive;
  });

  return (
    <div className="catalog-page-fluid">
      <header className="catalog-page-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="header-logo">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 className="page-title">Staff <span className="highlight">Escenografía</span></h1>
            </Link>
            <p className="page-subtitle">Inventario de elementos</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%', maxWidth: '500px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="🔍 Buscar pieza, código o estilo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '30px', padding: '0.6rem 1.2rem', flexGrow: 1, minWidth: '200px' }}
            />
            <button className="btn btn-primary" onClick={() => setIsSidebarOpen(true)} style={{ whiteSpace: 'nowrap' }}>
              Cotización ({totalItems})
            </button>
          </div>
        </div>

        {/* TOP MENU FOR CATEGORIES */}
        <nav className="top-category-nav" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '5px', flexGrow: 1 }}>
            {uniqueCategories.map(cat => (
              <button 
                key={cat} 
                className={`category-tab ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <select 
            value={bodegaFilter} 
            onChange={(e) => setBodegaFilter(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid var(--border)', outline: 'none', backgroundColor: '#fff', fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500' }}
          >
            <option value="Todas">🌎 Todas las Bodegas</option>
            <option value="cdmx">📍 Bodega CDMX</option>
            <option value="gdl">📍 Bodega Guadalajara</option>
            <option value="mty">📍 Bodega Monterrey</option>
            <option value="puebla">📍 Bodega Puebla</option>
            <option value="slp">📍 Bodega San Luis Potosí</option>
            <option value="toluca">📍 Bodega Toluca</option>
          </select>
        </nav>
      </header>

      <div className="catalog-layout-wrapper">
        {/* LEFT SIDEBAR FOR THEMES */}
        <aside className="catalog-theme-sidebar" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 className="sidebar-title">Colecciones y Temáticas</h3>
          
          <ul className="theme-list">
            <li 
              className={`theme-item ${themeFilter === 'TODAS LAS TEMÁTICAS' ? 'active' : ''}`}
              onClick={() => setThemeFilter('TODAS LAS TEMÁTICAS')}
            >
              <strong>TODAS LAS TEMÁTICAS</strong>
            </li>
          </ul>

          {THEME_CATEGORIES.map((section, idx) => (
            <div key={idx}>
              <h4 style={{ ...section.styles, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                {section.title}
              </h4>
              <ul className="theme-list">
                {section.themes.map(theme => (
                  <li 
                    key={theme} 
                    className={`theme-item ${themeFilter === theme ? 'active' : ''}`}
                    onClick={() => setThemeFilter(theme)}
                    style={{ paddingLeft: '1rem', fontSize: '0.9rem' }}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* MAIN GRID */}
        <main className="catalog-main-area">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <h2>Conectando a The Firebase...</h2>
              <p>Descargando inventario maestro.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <h2>Tu catálogo está totalmente limpio y vacío.</h2>
              <p>Es seguro comenzar a inyectar verdaderas piezas en "Alta de Pieza".</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpenDetails={setSelectedProduct} />
              ))}
            </div>
          )}

          <div className="load-more-container" style={{ marginTop: '3rem' }}>
            <button className="btn btn-secondary">Cargar más resultados</button>
          </div>
        </main>
      </div>

      {/* Ficha Técnica Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
