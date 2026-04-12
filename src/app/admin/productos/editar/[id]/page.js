"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../../../../lib/firebase/config';

export const ALL_THEMES = [
  "NOCHE DE OSCARES / ALFOMBRA ROJA", "FÓRMULA 1", "F1 GRAN PRIX", "F1 FIESTA TEMA", "F1 SIMULADORES", "ALICIA EN EL PAÍS DE LAS MARAVILLAS", "PARÍS & BURLESQUE", "CASINO LAS VEGAS", "CIRCO VINTAGE", "BAILE DE MÁSCARAS / VENECIANO", "MARDI GRAS", "BLANCO Y NEGRO (ELEGANTE)", "SAFARI / SELVA", "ANIMALES", "ANIMALES DE GRANJA", "ANIMALES DE JUNGLA", "ANIMALES DE ZOOLÓGICO", "CABALLOS", "CABALLOS DE CARRUSEL", "CARIBE", "CARNAVAL", "DÉCADAS 70S", "DÉCADAS 80S", "DESPECHO", "DRAGONES", "GODZILLA", "GRANJA", "GREASE", "GRIEGO", "HARRY POTTER", "JUNGLA / SELVA", "KING KONG", "LONDRES", "PIRATA", "PLAYA", "PREHISTÓRICO", "ROMANO", "SAFARI", "SELVA / SALVAJE", "VENECIANO", "VINTAGE", "GREAT GASTBY", "MEXICANO", "ARABE", "LAS MIL Y UNA NOCHES", "STAR WARS", "JURASICC PARK", "CARICATURAS", "NEON PARTY", "NAVIDAD / CHRISTMAS", "NACIMIENTOS", "POSADAS", "FIESTA DE FIN DE AÑO", "PASCUA", "HALLOWEEN", "CASA DE LOS ESPANTOS", "CATRINAS", "DÍA DE MUERTOS", "DÍA DEL AMOR Y LA AMISTAD", "OKTOBERFEST", "SUPER HÉROES"
];

export default function EditarProductoPage() {
  const params = useParams();
  const id = params?.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [productData, setProductData] = useState(null);
  const [themes, setThemes] = useState([]);

  // IMAGE EDITING STATES
  const [existingImages, setExistingImages] = useState([null, null, null, null]);
  const [newFiles, setNewFiles] = useState({ 0: null, 1: null, 2: null, 3: null });
  const [previews, setPreviews] = useState({ 0: null, 1: null, 2: null, 3: null });

  useEffect(() => {
    return () => Object.values(previews).forEach(url => { if (url) URL.revokeObjectURL(url); });
  }, [previews]);

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
          // Set existing images
          if (data.images && data.images.length > 0) {
            const loaded = [null, null, null, null];
            data.images.forEach((imgUrl, i) => { if(i < 4) loaded[i] = imgUrl; });
            setExistingImages(loaded);
          } else if (data.imageUrl) {
            setExistingImages([data.imageUrl, null, null, null]); // Fallback antiguo
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

  const resizeImage = (file, maxWidth = 1200) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) return resolve(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          // Función para exportar el canvas a archivo final
          const finalizeImage = () => {
            canvas.toBlob((blob) => {
              const resizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(resizedFile);
            }, 'image/jpeg', 0.82);
          };

          // 🔥 INYECCIÓN DE SELLO DE AGUA 🔥
          const watermark = new Image();
          watermark.crossOrigin = "anonymous";
          watermark.src = '/logo.png'; 
          
          watermark.onload = () => {
            const wmWidth = width * 0.25; 
            const wmHeight = (watermark.height / watermark.width) * wmWidth;
            const padding = 30; 
            
            ctx.globalAlpha = 0.6;
            ctx.drawImage(watermark, width - wmWidth - padding, height - wmHeight - padding, wmWidth, wmHeight);
            ctx.globalAlpha = 1.0; 
            
            finalizeImage();
          };
          
          watermark.onerror = () => {
            finalizeImage();
          };
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setNewFiles(prev => ({ ...prev, [index]: file }));
      setPreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
    }
  };

  const handleRemoveImage = (index) => {
    // Si era una existente, la borramos del arreglo
    const updatedExisting = [...existingImages];
    updatedExisting[index] = null;
    setExistingImages(updatedExisting);
    
    // Si era una nueva, la quitamos
    setNewFiles(prev => ({ ...prev, [index]: null }));
    if(previews[index]) {
      URL.revokeObjectURL(previews[index]);
      setPreviews(prev => ({ ...prev, [index]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const form = new FormData(e.target);
      const sku = productData.sku;

      // 1. Upload any NEW images
      import('firebase/storage').then(async ({ ref, uploadBytes, getDownloadURL }) => {
        import('../../../../../lib/firebase/config').then(async ({ storage }) => {
          
          const finalImages = [...existingImages];
          
          for (let i = 0; i < 4; i++) {
            if (newFiles[i]) {
              const fileToUpload = await resizeImage(newFiles[i], 1200);
              const imageRef = ref(storage, `products/${sku}/edit_${i}_${fileToUpload.name}`);
              await uploadBytes(imageRef, fileToUpload);
              const url = await getDownloadURL(imageRef);
              finalImages[i] = url; // Put the new cloud URL in the specific slot
            }
          }

          // 2. Filter out nulls to make the pure final Array
          const cleanImagesArray = finalImages.filter(url => url !== null);

          const updatedProduct = {
            name: form.get('name'),
            category: form.get('category'),
            theme: form.get('theme') || '',
            rentalPrice: Number(form.get('price')),
            shortDescription: form.get('description') || '',
            images: cleanImagesArray,
            imageUrl: cleanImagesArray[0] || '', // Principal image
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
        });
      });
      
    } catch(err) {
      console.error(err);
      alert('Hubo un error editando. Revisa la consola.');
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
        
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
          📸 Editar Fotografías de Pieza
        </h3>
        
        <div className="form-row" style={{ flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[0, 1, 2, 3].map(index => {
            const hasImage = previews[index] || existingImages[index];
            const currentImgSrc = previews[index] || existingImages[index];
            
            return (
              <div key={index} className="form-group" style={{ minWidth: '22%' }}>
                <label>Foto {index + 1} {index === 0 ? '(Principal)' : ''}</label>
                
                <div style={{ position: 'relative', border: '2px dashed #94a3b8', borderRadius: '12px', padding: hasImage ? '0' : '1.5rem', textAlign: 'center', backgroundColor: '#f8fafc', height: '150px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  {hasImage ? (
                    <>
                      <img src={currentImgSrc} alt={`Foto ${index+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveImage(index)}
                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontWeight: 'bold' }}
                      >X</button>
                    </>
                  ) : (
                    <>
                      <div style={{ color: '#64748b' }} onClick={() => document.getElementById(`editImage_${index}`).click()}>
                        <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>➕ Reemplazar</span>
                      </div>
                      <input 
                        id={`editImage_${index}`}
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(e, index)} 
                        style={{ display: 'none' }} 
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
