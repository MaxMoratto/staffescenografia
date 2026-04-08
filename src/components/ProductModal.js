import React, { useState } from 'react';
import { useQuote } from '../context/QuoteContext';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
  const { addToQuote } = useQuote();
  
  // Si no tiene arreglo de 4 imágenes, que use imageUrl como fallback
  const fallbackImages = product?.imageUrl ? [product.imageUrl] : ['https://via.placeholder.com/600x600?text=Sin+Imagen'];
  const gallery = product?.images?.length > 0 ? product.images : fallbackImages;
  
  const [mainImage, setMainImage] = useState(gallery[0]);
  const [vendorCode, setVendorCode] = useState('');

  if (!product) return null;

  const handleShareWhatsApp = () => {
    const baseDomain = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://staffescenografia.com';
    const productLink = `${baseDomain}/catalogo?busqueda=${product.sku}`;
    const altura = product.dimensions?.height ? `${product.dimensions.height} cm` : 'Pendiente';

    const rawText = `¡Hola! Aquí tienes la ficha de la pieza de Staff Escenografía:
${productLink}

${vendorCode ? `Asesor: ${vendorCode}` : ''}`.trim();

    const encodedText = encodeURIComponent(rawText);
    
    // Detectar si el usuario está en celular o PC
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    } else {
      // Abre en la pestaña actual de WhatsApp Web de forma sigilosa sin lanzar la app de Windows
      window.open(`https://web.whatsapp.com/send?text=${encodedText}`, '_blank');
    }
  };

  const handleShareEmail = () => {
    const subject = `Cotización Escenografía: ${product.name}`;
    const body = `Mira esta pieza de Staff Escenografía:\n\n${product.name} (SKU: ${product.sku})\nPrecio: $${product.rentalPrice} / día\n\n${vendorCode ? `Vendedor: ${vendorCode}` : ''}\n\nDimensiones: ${product.dimensions?.height || '-'}x${product.dimensions?.width || '-'}x${product.dimensions?.depth || '-'} cm`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-grid">
          {/* Columna Izquierda: Galería */}
          <div className="modal-gallery">
            <div className="main-image-container">
              <img src={mainImage} alt={product.name} className="main-image" />
            </div>
            {gallery.length > 1 && (
              <div className="thumbnail-strip">
                {gallery.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${product.name} toma ${idx+1}`} 
                    className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
            <div className="modal-aesthetic-hint">
              <span>📷 Tomas premium obligatorias aprobadas</span>
            </div>
          </div>

          {/* Columna Derecha: Ficha Técnica Completa */}
          <div className="modal-details">
            <div className="modal-header">
              <span className="sku-badge">REF: {product.sku}</span>
              <span className="category-tag">{product.category}</span>
            </div>
            
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="price-block">
              <span className="price-label">Precio Renta (Base)</span>
              <p className="price-tag">${product.rentalPrice} <span className="price-period">MXN / día</span></p>
            </div>
            
            <div className="description-box">
              <p>{product.shortDescription || "Esta pieza está diseñada bajo los más altos estándares escenográficos, ideal para crear atmósferas inmersivas en eventos corporativos y temáticos."}</p>
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Dimensiones Reales</span>
                <span className="spec-value">
                  {product.dimensions?.height || '-'} Alto x {product.dimensions?.width || '-'} Ancho x {product.dimensions?.depth || '-'} Fondo cm
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Peso Est.</span>
                <span className="spec-value">{product.weight || '-'} kg</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Temática Ideal</span>
                <span className="spec-value">{product.theme || 'Versátil'}</span>
              </div>
            </div>

            <div className="availability-box">
              <h4 className="availability-title">Sedes con Disponibilidad Inmediata</h4>
              <div className="city-chips">
                {(product.availability?.cdmx > 0) && <span className="city-chip">CDMX: {product.availability.cdmx}</span>}
                {(product.availability?.gdl > 0) && <span className="city-chip">GDL: {product.availability.gdl}</span>}
                {(product.availability?.mty > 0) && <span className="city-chip">MTY: {product.availability.mty}</span>}
                {(product.availability?.puebla > 0) && <span className="city-chip">Puebla: {product.availability.puebla}</span>}
                {(product.availability?.slp > 0) && <span className="city-chip">SLP: {product.availability.slp}</span>}
                {(product.availability?.toluca > 0) && <span className="city-chip">Toluca: {product.availability.toluca}</span>}
              </div>
            </div>

            <div className="share-box" style={{marginTop: '1.5rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
              <h4 style={{fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.8rem', color: '#64748b', fontWeight: 'bold'}}>📲 Enviar al Cliente</h4>
              <input 
                type="text" 
                placeholder="Código Autorizado de Vendedor (Opcional)" 
                value={vendorCode}
                onChange={(e) => setVendorCode(e.target.value)}
                style={{width: '100%', padding: '0.6rem', paddingLeft: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', marginBottom: '0.8rem'}} 
              />
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button onClick={handleShareWhatsApp} style={{flex: 1, backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
                  WhatsApp
                </button>
                <button onClick={handleShareEmail} style={{flex: 1, backgroundColor: '#334155', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
                  ✉️ Correo
                </button>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-full-modal"
              onClick={() => {
                addToQuote(product);
                onClose();
              }}
            >
              Agregar Pieza a Cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
