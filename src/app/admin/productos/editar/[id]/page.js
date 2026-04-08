"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../../../../lib/firebase/config';

export const ALL_THEMES = [
  "NOCHE DE OSCARES / ALFOMBRA ROJA", "FÓRMULA 1", "F1 GRAN PRIX", "F1 FIESTA TEMA", "F1 SIMULADORES", "ALICIA EN EL PAÍS DE LAS MARAVILLAS", "PARÍS & BURLESQUE", "CASINO LAS VEGAS", "CIRCO VINTAGE", "BAILE DE MÁSCARAS / VENECIANO", "MARDI GRAS", "BLANCO Y NEGRO (ELEGANTE)", "SAFARI / SELVA", "ANIMALES", "ANIMALES DE GRANJA", "ANIMALES DE JUNGLA", "ANIMALES DE ZOOLÓGICO", "CABALLOS", "CABALLOS DE CARRUSEL", "CARIBE", "CARNAVAL", "DÉCADAS 70S", "DÉCADAS 80S", "DESPECHO", "DRAGONES", "GODZILLA", "GRANJA", "GREASE", "GRIEGO", "HARRY POTTER", "JUNGLA / SELVA", "KING KONG", "LONDRES", "PIRATA", "PLAYA", "PREHISTÓRICO", "ROMANO", "SAFARI", "SELVA / SALVAJE", "VENECIANO", "VINTAGE", "GREAT GASTBY", "MEXICANO", "ARABE", "LAS MIL Y UNA NOCHES", "STAR WARS", "JURASICC PARK", "CARICATURAS", "NEON PARTY", "NAVIDAD / CHRISTMAS", "NACIMIENTOS", "POSADAS", "FIESTA DE FIN DE AÑO", "PASCUA", "HALLOWEEN", "CASA DE LOS ESPANTOS", "CATRINAS", "DÍA DE MUERTOS", "DÍA DEL AMOR Y LA AMISTAD", "OKTOBERFEST"
];

export default function EditarProductoPage() {
  const params = useParams();
  const id = params?.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [productData, setProductData] = useState(null);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProductData({ id: docSnap.id, ...data });
          if(data.theme) {
            setThemes(data.theme.split(',').map(t => t.trim()));
          }
        } else {
          alert('No se encontró el producto');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const form = new FormData(e.target);
      
      const updatedProduct = {
        name: form.get('name'),
        category: form.get('category'),
        theme: form.get('theme') || '',
        rentalPrice: Number(form.get('price')),
        shortDescription: form.get('description') || '',
        dimensions: {
          height: form.get('height') ? Number(form.get('height')) : null,
          width: form.get('width') ? Number(form.get('width')) : null,
          depth: form.get('depth') ? Number(form.get('depth')) : null,
        },
        weight: form.get('weight') ? Number(form.get('weight')) : null,
        availability: {
          cdmx: form.get('cdmx') ? Number(form.get('cdmx')) : 0,
          gdl: form.get('gdl') ? Number(form.get('gdl')) : 0,
          mty: form.get('mty') ? Number(form.get('mty')) : 0,
          puebla: form.get('puebla') ? Number(form.get('puebla')) : 0,
          slp: form.get('slp') ? Number(form.get('slp')) : 0,
          toluca: form.get('toluca') ? Number(form.get('toluca')) : 0,
        }
      };

      await updateDoc(doc(db, "products", id), updatedProduct);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        window.location.href = '/admin/productos'; // Regresa al inventario principal
      }, 2000);
      
    } catch(err) {
      console.error(err);
      alert('Hubo un error editando. Revisa la consola.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando pieza para edición...</p>;
  if (!productData) return <p>Pieza no encontrada.</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Editar Ficha: {productData.name} ({productData.sku})</h2>
        <a href="/admin/productos" className="btn btn-secondary">← Cancelar y Regresar</a>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #ceead6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
          <strong>¡Ficha actualizada exitosamente! Regresando al inventario...</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card">
        <h3>Datos Principales</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de la Pieza *</label>
            <input 
              name="name" 
              type="text" 
              className="form-input" 
              defaultValue={productData.name}
              required 
            />
          </div>
          <div className="form-group" style={{ flex: '0 0 150px' }}>
            <label>Código (SKU) *</label>
            <input 
              name="sku" 
              type="text" 
              className="form-input" 
              defaultValue={productData.sku}
              readOnly
              style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
              title="El SKU no se puede editar"
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Categoría General</label>
            <select name="category" className="form-input" defaultValue={productData.category}>
              <option value="Escenografía Temática">Escenografía Temática</option>
              <option value="Props y Decoración">Props y Decoración</option>
              <option value="Mobiliario para Eventos">Mobiliario para Eventos</option>
              <option value="Árboles y Plantas">Árboles y Plantas</option>
              <option value="Juegos e Interactivos">Juegos e Interactivos</option>
            </select>
          </div>
          <div className="form-group">
            <label>Temáticas (Selecciona una o varias)</label>
            <div style={{
              maxHeight: '120px',
              overflowY: 'auto',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {ALL_THEMES.map(theme => (
                <label key={theme} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    value={theme}
                    onChange={(e) => {
                      if (e.target.checked) setThemes([...themes, theme]);
                      else setThemes(themes.filter(t => t !== theme));
                    }}
                    checked={themes.includes(theme)}
                  />
                  {theme}
                </label>
              ))}
            </div>
            <input type="hidden" name="theme" value={themes.join(',')} />
          </div>
          <div className="form-group">
            <label>Precio de Renta (MXN/día) *</label>
            <input name="price" type="number" className="form-input" defaultValue={productData.rentalPrice} required />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción Comercial</label>
          <textarea name="description" className="form-input" rows="3" defaultValue={productData.shortDescription}></textarea>
        </div>

        <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

        <h3>Logística e Inventario</h3>
        <div className="form-row">
          <div className="form-group"><label>Alto (cm)</label><input name="height" type="number" className="form-input" defaultValue={productData.dimensions?.height || ''} /></div>
          <div className="form-group"><label>Ancho (cm)</label><input name="width" type="number" className="form-input" defaultValue={productData.dimensions?.width || ''} /></div>
          <div className="form-group"><label>Fondo (cm)</label><input name="depth" type="number" className="form-input" defaultValue={productData.dimensions?.depth || ''} /></div>
          <div className="form-group"><label>Peso (kg)</label><input name="weight" type="number" className="form-input" defaultValue={productData.weight || ''} /></div>
        </div>

        <div className="form-group">
          <label>Disponibilidad por Sede</label>
          <div className="form-row" style={{ marginBottom: 'var(--spacing-sm)' }}>
            <input name="cdmx" type="number" className="form-input" placeholder="CDMX" defaultValue={productData.availability?.cdmx || ''} />
            <input name="gdl" type="number" className="form-input" placeholder="Guadalajara" defaultValue={productData.availability?.gdl || ''} />
            <input name="mty" type="number" className="form-input" placeholder="Monterrey" defaultValue={productData.availability?.mty || ''} />
          </div>
          <div className="form-row">
            <input name="puebla" type="number" className="form-input" placeholder="Puebla" defaultValue={productData.availability?.puebla || ''} />
            <input name="slp" type="number" className="form-input" placeholder="San Luis Potosí" defaultValue={productData.availability?.slp || ''} />
            <input name="toluca" type="number" className="form-input" placeholder="Toluca" defaultValue={productData.availability?.toluca || ''} />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Aplicando cambios en The Firebase...' : '💾 Guardar Edición Completa'}
          </button>
        </div>
      </form>
    </div>
  );
}
