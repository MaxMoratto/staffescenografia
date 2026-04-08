"use client";

import { useQuote } from '../context/QuoteContext';

export default function ProductCard({ product, onOpenDetails }) {
  const { addToQuote } = useQuote();

  return (
    <article className="product-card">
      <div 
        className="product-image-container" 
        onClick={() => onOpenDetails && onOpenDetails(product)}
        style={{ cursor: 'pointer' }}
      >
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <button 
            className="btn btn-primary add-to-quote-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToQuote(product);
            }}
          >
            Cotizar
          </button>
        </div>
        <span className="product-sku">{product.sku}</span>
      </div>
      
      <div className="product-info">
        <span className="product-theme">{product.theme}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        
        <div className="product-meta">
          <div className="product-logistics">
            <span className="info-badge">
              📐 {typeof product.dimensions === 'object' ? `${product.dimensions?.height || '-'}x${product.dimensions?.width || '-'}cm` : product.dimensions?.split(' | ')[0]}
            </span>
            <span className="info-badge">
              📍 {typeof product.availability === 'object' ? `En Stock` : product.availability?.split(',')[0]}
            </span>
          </div>
          <div className="product-price">
            ${product.rentalPrice} <span>MXN / día</span>
          </div>
        </div>
      </div>
    </article>
  );
}
