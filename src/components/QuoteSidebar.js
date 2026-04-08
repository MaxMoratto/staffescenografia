"use client";

import React, { useState } from 'react';
import { useQuote } from '../context/QuoteContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import './QuoteSidebar.css';

export default function QuoteSidebar() {
  const { 
    quoteItems, 
    isSidebarOpen, 
    setIsSidebarOpen, 
    removeFromQuote, 
    updateQuantity, 
    getTotalPrice,
    clearQuote
  } = useQuote();

  const [formData, setFormData] = useState({ name: '', email: '', location: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const quotePayload = {
        customerInfo: formData,
        items: quoteItems.map(item => ({
          sku: item.product.sku,
          name: item.product.name,
          rentalPrice: item.product.rentalPrice,
          quantity: item.quantity
        })),
        totalEstimated: getTotalPrice(),
        status: 'Pendiente', // Pendiente, Contactado, Rentado
        createdAt: new Date()
      };

      await addDoc(collection(db, "quotes"), quotePayload);
      alert("¡Cotización formal solicitada con éxito! Nuestro equipo comercial la verá al instante.");
      clearQuote();
      setFormData({ name: '', email: '', location: '', phone: '' });
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Error enviando cotización:", error);
      alert("Hubo un error al enviar tu cotización. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)}></div>
      
      {/* Sidebar Content */}
      <aside className="quote-sidebar">
        <header className="sidebar-header">
          <h2>Su Cotización</h2>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </header>

        <div className="sidebar-items">
          {quoteItems.length === 0 ? (
            <div className="empty-quote">
              <p>No hay elementos en su cotización aún.</p>
              <button className="btn btn-secondary" onClick={() => setIsSidebarOpen(false)}>Explorar Catálogo</button>
            </div>
          ) : (
            quoteItems.map((item) => (
              <div key={item.product.id} className="quote-item">
                <img src={item.product.imageUrl} alt={item.product.name} />
                <div className="quote-item-details">
                  <h4>{item.product.name}</h4>
                  <p className="item-sku">{item.product.sku}</p>
                  <p className="item-price">${item.product.rentalPrice} / día</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.product.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)}>+</button>
                    <button className="remove-item-btn" onClick={() => removeFromQuote(item.product.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {quoteItems.length > 0 && (
          <footer className="sidebar-footer">
            <div className="quote-summary">
              <span>Total Estimado (por día):</span>
              <span className="summary-total">${getTotalPrice()} MXN</span>
            </div>
            
            <form className="quote-form" onSubmit={handleSubmitQuote}>
              <h4>Datos para Solicitud</h4>
              <input 
                type="text" 
                placeholder="Nombre completo" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Tu WhatsApp (10 dígitos) *" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Sede del evento (Ej. CDMX)" 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Solicitar Cotización Formal'}
              </button>
            </form>
          </footer>
        )}
      </aside>
    </>
  );
}
