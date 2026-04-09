"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getCountFromServer } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../lib/firebase/config';

export const ALL_THEMES = [
  "NOCHE DE OSCARES / ALFOMBRA ROJA", "FÓRMULA 1", "F1 GRAN PRIX", "F1 FIESTA TEMA", "F1 SIMULADORES", "ALICIA EN EL PAÍS DE LAS MARAVILLAS", "PARÍS & BURLESQUE", "CASINO LAS VEGAS", "CIRCO VINTAGE", "BAILE DE MÁSCARAS / VENECIANO", "MARDI GRAS", "BLANCO Y NEGRO (ELEGANTE)", "SAFARI / SELVA", "ANIMALES", "ANIMALES DE GRANJA", "ANIMALES DE JUNGLA", "ANIMALES DE ZOOLÓGICO", "CABALLOS", "CABALLOS DE CARRUSEL", "CARIBE", "CARNAVAL", "DÉCADAS 70S", "DÉCADAS 80S", "DESPECHO", "DRAGONES", "GODZILLA", "GRANJA", "GREASE", "GRIEGO", "HARRY POTTER", "JUNGLA / SELVA", "KING KONG", "LONDRES", "PIRATA", "PLAYA", "PREHISTÓRICO", "ROMANO", "SAFARI", "SELVA / SALVAJE", "VENECIANO", "VINTAGE", "GREAT GASTBY", "MEXICANO", "ARABE", "LAS MIL Y UNA NOCHES", "STAR WARS", "JURASICC PARK", "CARICATURAS", "NEON PARTY", "NAVIDAD / CHRISTMAS", "NACIMIENTOS", "POSADAS", "FIESTA DE FIN DE AÑO", "PASCUA", "HALLOWEEN", "CASA DE LOS ESPANTOS", "CATRINAS", "DÍA DE MUERTOS", "DÍA DEL AMOR Y LA AMISTAD", "OKTOBERFEST"
];

export default function NuevoProductoPage() {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [themes, setThemes] = useState([]);
  const [previews, setPreviews] = useState({ image1: null, image2: null, image3: null, image4: null });

  // Limpiar URLs en memoria cuando el componente se desmonte
  useEffect(() => {
    return () => Object.values(previews).forEach(url => { if (url) URL.revokeObjectURL(url); });
  }, [previews]);

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) handleFileSelected(files[0], name);
  };

  const handleFileSelected = (file, name) => {
    setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    // Asignar el File al input hidden/real usando DataTransfer
    const input = document.getElementById(`input_${name}`);
    if (input) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    }
  };

  const handleDrop = async (e, name) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Si soltaron un archivo local desde su PC
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0], name);
      return;
    }

    // 2. Si arrastraron una imagen desde otra ventana del navegador
    const htmlData = e.dataTransfer.getData('text/html');
    const textData = e.dataTransfer.getData('text/plain');
    
    let url = null;
    if (htmlData) {
      const match = htmlData.match(/src=["']([^"']+)["']/);
      if (match) url = match[1];
    }
    if (!url && textData && textData.startsWith('http')) {
      url = textData;
    }

    if (url) {
      setLoading(true);
      try {
        // Enviar al proxy para saltar bloqueos CORS del navegador
        const res = await fetch('/api/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        
        if (!res.ok) throw new Error("CORS o error de descarga");
        
        const blob = await res.blob();
        const file = new File([blob], `dragged_${Date.now()}.jpg`, { type: blob.type });
        handleFileSelected(file, name);
      } catch (err) {
        console.error("Error dragging url", err);
        alert("No se pudo descargar la imagen secreta del otro navegador por bloqueos de seguridad. Intenta guardarla en tu PC y luego arrástrala.");
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerClick = (name) => {
    document.getElementById(`input_${name}`).click();
  };

  // Auto-generate REAL SKU counter when name changes (Debounced)
  useEffect(() => {
    const generateRealSku = async () => {
      if (productName.length >= 3) {
        const cleanStr = productName.replace(/[^a-zA-Z]/g, '').padEnd(3, 'X');
        const prefix = cleanStr.substring(0, 3).toUpperCase();
        
        if (!sku.startsWith(prefix)) {
          try {
            // Buscamos cuántos SKU empiezan con estas 3 letras en la base de datos real
            const q = query(collection(db, "products"), where("sku", ">=", `${prefix}-`), where("sku", "<=", `${prefix}-\uf8ff`));
            const snapshot = await getCountFromServer(q);
            const count = snapshot.data().count;
            // PadStart asegura que el contador se vea como "001", "002"...
            const nextNum = String(count + 1).padStart(3, '0');
            setSku(`${prefix}-${nextNum}`);
          } catch(e) {
            console.error("Error generando consecutivo", e);
            setSku(`${prefix}-${Math.floor(100 + Math.random() * 900)}`); // fallback
          }
        }
      } else {
        setSku('');
      }
    };

    const timer = setTimeout(() => generateRealSku(), 500); // Esperar medio segundo para no saturar DB al teclear
    return () => clearTimeout(timer);
  }, [productName]);

  const resizeImage = (file, maxWidth = 1200) => {
    return new Promise((resolve) => {
      // Si no es imagen (por si acaso), lo devolvemos tal cual
      if (!file.type.startsWith('image/')) return resolve(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Solo redimensionar si es más grande que el límite
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Exportar a JPEG comprimido
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile);
          }, 'image/jpeg', 0.82); // 82% quality (muy buena compresión sin perder calidad visual)
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const generateDynamicDescription = (name, category, themeStr) => {
    const adjectives = ['impactante', 'espectacular', 'premium', 'exclusiva', 'de alta gama', 'vanguardista', 'inmersiva', 'hiperrealista'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    let base = `La pieza ${name} es una obra ${randomAdjective} diseñada para elevar el valor de producción de tu evento. `;
    
    if (category === 'Escenografía Temática') {
      base += `Creada con calidad museográfica, se convierte en el escenari0 y punto focal perfecto para lograr una atmósfera realista e instagrameable. `;
    } else if (category === 'Props y Decoración') {
      base += `Sus texturas, relieves y detalles minuciosos aseguran que luzca perfecta ante la vista de los invitados e incluso en primeros planos de cámara. `;
    } else if (category === 'Mobiliario para Eventos') {
      base += `Combina una presencia estética superior con funcionalidad de alto nivel, pensada para sorprender asistentes V.I.P. `;
    } else {
      base += `Construida bajo estrictos manuales artísticos de Staff Escenografía para garantizar asombro y calidad visual insuperable. `;
    }

    if (themeStr && themeStr.length > 0) {
      const themesArr = themeStr.split(',');
      base += `Absolutamente recomendada para producciones inspiradas en ${themesArr[0]} o similares, logrando una narrativa inmersiva impecable.`;
    } else {
      base += `Gracias a su estética versátil, logra mimetizarse y enriquecer una amplia variedad de conceptos creativos y estilos de decoración.`;
    }

    return base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Gather basic form data
      const form = new FormData(e.target);
      const sku = form.get('sku');
      const inputName = form.get('name');
      const inputCategory = form.get('category');
      const inputTheme = form.get('theme') || '';
      
      let finalDescription = form.get('description') || '';
      if (!finalDescription || finalDescription.trim() === '') {
        // Generar el texto si lo dejaron en blanco esperando la magia
        finalDescription = generateDynamicDescription(inputName, inputCategory, inputTheme);
      }

      // 2. Definir estado y cargar las 4 imágenes a Firebase Storage
      setLoading(true);
      const imageUrls = [];
      const imageNames = ['image1', 'image2', 'image3', 'image4'];
      
      for (let i = 0; i < imageNames.length; i++) {
        const originalFile = form.get(imageNames[i]);
        if (originalFile && originalFile.size > 0) {
          
          // 🔥 MAGIA: Redimensionamiento Automático en el Navegador 🔥
          const fileToUpload = await resizeImage(originalFile, 1200);

          // Crea una ruta limpia en Storage: products/SKU/nombre_foto.jpg
          const imageRef = ref(storage, `products/${sku}/${imageNames[i]}_${fileToUpload.name}`);
          await uploadBytes(imageRef, fileToUpload);
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
        }
      }

      // 3. Crear el armazón del producto final para la Base de Datos
      const newProduct = {
        name: inputName,
        sku: sku,
        category: inputCategory,
        theme: inputTheme,
        rentalPrice: Number(form.get('price')),
        shortDescription: finalDescription,
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
        },
        images: imageUrls, // Arreglo con las 4 fotos
        imageUrl: imageUrls[0] || '', // La foto principal (Elemento Solo) para miniaturas
        status: 'Pendiente',
        createdAt: new Date()
      };

      // Guardar a Firestore
      const docRef = await addDoc(collection(db, "products"), newProduct);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 8000); // Ocultar después de 8 segundos
      
      // Clear form and previews empty
      e.target.reset();
      setProductName('');
      setThemes([]);
      setPreviews({ image1: null, image2: null, image3: null, image4: null });
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Hubo un error al guardar el producto. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Capturar Nuevo Producto</h2>
        <button className="btn btn-secondary">Cancelar</button>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: '#e6f4ea', color: '#137333', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #ceead6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
          <div>
            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>¡Pieza Guardada y Publicada Exitosamente!</strong>
            <span>La pieza ya fue inyectada en The Firebase y es visible en tu Catálogo Público. Puedes capturar otra pieza nueva a continuación.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card">
        
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
          📸 Fotografías Requeridas (4 Tomas)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
          Para que el catálogo sea considerado "Premium", debes subir obligatoriamente estas 4 tomas fotográficas siguiendo el manual de estilo.
        </p>

        <div className="form-row" style={{ flexWrap: 'wrap', marginBottom: '2rem' }}>
          
          {[
            { id: 'image1', label: '1. Elemento Solo (Obligatorio) *', tip: 'Debe estar recortado o tener un fondo limpio.', required: true },
            { id: 'image2', label: '2. Con Referencia Humana (Opcional)', tip: 'Mostrar a una persona junto a la pieza.', required: false },
            { id: 'image3', label: '3. Ángulo Diferente 1 (Opcional)', tip: 'Para ver profundidad.', required: false },
            { id: 'image4', label: '4. Ángulo Diferente 2 (Opcional)', tip: 'Para ver construcción trasera.', required: false },
          ].map(box => (
            <div key={box.id} className="form-group" style={{ minWidth: '45%' }}>
              <label>{box.label}</label>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => handleDrop(e, box.id)}
                onClick={() => triggerClick(box.id)}
                style={{ 
                  border: '2px dashed #94a3b8', 
                  borderRadius: '12px', 
                  padding: '1.5rem', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <input 
                  id={`input_${box.id}`}
                  type="file" 
                  name={box.id} 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  required={box.required}
                  style={{ display: 'none' }} // Ocultamos el input feo real
                />
                
                {previews[box.id] ? (
                  <img src={previews[box.id]} alt={`Preview ${box.id}`} style={{ width: '100%', height: '150px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '4px' }} />
                ) : (
                  <div style={{ color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
                    <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📥</span>
                    <strong>Arrastra tu foto aquí</strong>
                    <span style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>o da clic para buscar. <br/>¡Puedes arrastrar desde Google!</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginTop: '8px' }}>{box.tip}</span>
            </div>
          ))}
          
        </div>

        <h3>Datos Principales</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de la Pieza *</label>
            <input 
              name="name" 
              type="text" 
              className="form-input" 
              placeholder="Ej. Árbol de Cerezo" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required 
            />
          </div>
          <div className="form-group" style={{ flex: '0 0 150px' }}>
            <label>Código (SKU) *</label>
            <input 
              name="sku" 
              type="text" 
              className="form-input" 
              placeholder="Ej. ARB-101" 
              value={sku}
              readOnly
              style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
              title="Autogenerado por el sistema"
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Categoría General</label>
            <select name="category" className="form-input">
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
            {/* Hidden input to pass data to form submission easily */}
            <input type="hidden" name="theme" value={themes.join(',')} />
          </div>
          <div className="form-group">
            <label>Precio de Renta (MXN/día)</label>
            <input name="price" type="number" className="form-input" placeholder="1800" required />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción Comercial (Autogenerada por IA) ✨</label>
          <textarea name="description" className="form-input" rows="3" placeholder="Dejar en blanco para que la IA redacte un texto premium y atractivo..."></textarea>
        </div>

        <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

        <h3>Logística e Inventario</h3>
        <div className="form-row">
          <div className="form-group"><label>Alto (cm)</label><input name="height" type="number" className="form-input" /></div>
          <div className="form-group"><label>Ancho (cm)</label><input name="width" type="number" className="form-input" /></div>
          <div className="form-group"><label>Fondo (cm)</label><input name="depth" type="number" className="form-input" /></div>
          <div className="form-group"><label>Peso (kg)</label><input name="weight" type="number" className="form-input" /></div>
        </div>

        <div className="form-group">
          <label>Disponibilidad por Sede</label>
          <div className="form-row" style={{ marginBottom: 'var(--spacing-sm)' }}>
            <input name="cdmx" type="number" className="form-input" placeholder="CDMX (Ej. 5)" />
            <input name="gdl" type="number" className="form-input" placeholder="Guadalajara (Ej. 2)" />
            <input name="mty" type="number" className="form-input" placeholder="Monterrey (Ej. 1)" />
          </div>
          <div className="form-row">
            <input name="puebla" type="number" className="form-input" placeholder="Puebla" />
            <input name="slp" type="number" className="form-input" placeholder="San Luis Potosí" />
            <input name="toluca" type="number" className="form-input" placeholder="Toluca" />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Subiendo Fotografías y Guardando...' : saveSuccess ? '✅ ¡Hecho! Guardar otra...' : 'Guardar y Publicar en Catálogo'}
          </button>
        </div>
      </form>
    </div>
  );
}
