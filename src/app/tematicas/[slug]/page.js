"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';
import { ALL_THEMES } from '../../admin/productos/nuevo/page';
import ProductCard from '../../../components/ProductCard';

export default function TematicaLanding() {
  const params = useParams();
  const slug = params?.slug;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [matchedTheme, setMatchedTheme] = useState(null);

  // Helper to map DB Theme name to URL Slug
  const getSlug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  useEffect(() => {
    async function loadData() {
      // 1. Identify theme
      const exactTheme = ALL_THEMES.find(t => getSlug(t) === slug);
      if (!exactTheme) {
        setLoading(false);
        return;
      }
      setMatchedTheme(exactTheme);

      // 2. Fetch all products logic (Real system will filter DB via query)
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const inv = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter those that include matchedTheme
        const themeProducts = inv.filter(p => {
          if (!p.theme) return false;
          const tags = p.theme.split(',').map(tag => tag.trim().toUpperCase());
          return tags.includes(exactTheme.toUpperCase());
        });
        
        setProducts(themeProducts);
      } catch (error) {
        console.error("Error fetching db", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  // Design Logic: Hardcoded beautiful Heros for the ones we generated
  let heroImage = '/themes/tema_placeholder.jpg'; // fallback
  let defaultBg = `linear-gradient(135deg, #111, #333)`;
  
  if (matchedTheme === "NOCHE DE OSCARES / ALFOMBRA ROJA") heroImage = '/themes/tema_oscares_1775628584134.png';
  if (["FÓRMULA 1", "F1 GRAN PRIX", "F1 FIESTA TEMA", "F1 SIMULADORES"].includes(matchedTheme)) heroImage = '/themes/tema_f1_1775629680591.png';
  if (matchedTheme === "ALICIA EN EL PAÍS DE LAS MARAVILLAS") heroImage = '/themes/tema_alicia_1775628599698.png';
  if (matchedTheme === "PARÍS & BURLESQUE") heroImage = '/themes/tema_paris_1775629698111.png';
  if (matchedTheme === "CASINO LAS VEGAS") heroImage = '/themes/tema_casino_1775628613468.png';
  if (matchedTheme === "CIRCO VINTAGE") heroImage = '/themes/tema_circo_1775629712579.png';
  if (["BAILE DE MÁSCARAS / VENECIANO", "MARDI GRAS", "VENECIANO", "CARNAVAL"].includes(matchedTheme)) heroImage = '/themes/tema_veneciano_1775629726730.png';
  if (matchedTheme === "BLANCO Y NEGRO (ELEGANTE)") heroImage = '/themes/tema_blancoynegro_1775629742168.png';
  if (["SAFARI / SELVA", "ANIMALES", "ANIMALES DE JUNGLA", "JUNGLA / SELVA", "ANIMALES DE ZOOLÓGICO", "SAFARI", "SELVA / SALVAJE"].includes(matchedTheme)) heroImage = '/themes/tema_safari_1775631433405.png';
  if (["ANIMALES DE GRANJA", "GRANJA"].includes(matchedTheme)) heroImage = '/themes/tema_granja_1775631452123.png';
  if (["LONDRES"].includes(matchedTheme)) heroImage = '/themes/tema_londres_1775636270738.png';
  if (["CARIBE", "PLAYA"].includes(matchedTheme)) heroImage = '/themes/tema_caribe_1775631469531.png';
  if (matchedTheme === "DÉCADAS 70S") heroImage = '/themes/tema_70s_1775631487091.png';
  if (["DÉCADAS 80S", "80S", "RETRO"].includes(matchedTheme)) heroImage = '/themes/tema_80s_1775631803118.png';
  if (["GREASE", "DÉCADAS 50S", "ROCK AND ROLL"].includes(matchedTheme)) heroImage = '/themes/tema_50s_1775631817666.png';
  if (["HARRY POTTER", "MAGIA Y HECHICERÍA"].includes(matchedTheme)) heroImage = '/themes/tema_magia_1775631829703.png';
  if (["GRIEGO", "DIOSES", "OLIMPO"].includes(matchedTheme)) heroImage = '/themes/tema_griego_1775631843850.png';
  if (matchedTheme === "PIRATA") heroImage = '/themes/tema_pirata_1775631860005.png';
  if (["CABALLOS", "CABALLOS DE CARRUSEL"].includes(matchedTheme)) heroImage = '/themes/tema_caballos_1775635746730.png';
  if (["MEXICANO", "DESPECHO", "ARTE MEXICANO"].includes(matchedTheme)) heroImage = '/themes/tema_mexicano_1775635761419.png';
  if (["PREHISTÓRICO", "JURASICC PARK"].includes(matchedTheme)) heroImage = '/themes/tema_dinos_1775635777241.png';
  if (["DRAGONES", "GODZILLA", "KING KONG"].includes(matchedTheme)) heroImage = '/themes/tema_monstruos_1775635793769.png';
  if (["ARABE", "LAS MIL Y UNA NOCHES"].includes(matchedTheme)) heroImage = '/themes/tema_arabe_1775635809361.png';
  if (["ROMANO", "ANTIGUEDAD"].includes(matchedTheme)) heroImage = '/themes/tema_romano_1775635879594.png';
  if (["VINTAGE", "GREAT GASTBY", "CIRCO VINTAGE"].includes(matchedTheme)) heroImage = '/themes/tema_gatsby_1775635894583.png';
  if (["STAR WARS", "ESPACIAL"].includes(matchedTheme)) heroImage = '/themes/tema_starwars_1775635909844.png';
  if (["OKTOBERFEST", "CERVEZA"].includes(matchedTheme)) heroImage = '/themes/tema_oktoberfest_1775635925342.png';
  if (["NAVIDAD / CHRISTMAS", "NACIMIENTOS", "POSADAS"].includes(matchedTheme)) heroImage = '/themes/tema_navidad_1775635963825.png';
  if (["HALLOWEEN", "CASA DE LOS ESPANTOS"].includes(matchedTheme)) heroImage = '/themes/tema_halloween_1775635979854.png';
  if (["DÍA DE MUERTOS", "CATRINAS"].includes(matchedTheme)) heroImage = '/themes/tema_diademuertos_1775635992113.png';
  if (["DÍA DEL AMOR Y LA AMISTAD"].includes(matchedTheme)) heroImage = '/themes/tema_sanvalentin_1775636005008.png';
  if (["FIESTA DE FIN DE AÑO", "NEON PARTY", "CARICATURAS", "PASCUA"].includes(matchedTheme)) heroImage = '/themes/tema_neon_1775636019582.png';

  const hasPhoto = heroImage.includes('.png');
  const heroStyle = hasPhoto ? {
    background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('${heroImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : { background: defaultBg };

  // Artificial Logic "ZONAS" based purely on matching products
  const mobiliarioZ = products.filter(p => (p.category || '').toLowerCase().includes('mobiliario'));
  const decoracionZ = products.filter(p => !(p.category || '').toLowerCase().includes('mobiliario'));

  // Artificial Logic "PRESUPUESTOS"
  const totalCost = products.reduce((acc, p) => acc + (p.rentalPrice || 0), 0);
  const basicCost = Math.floor(totalCost * 0.3) > 0 ? Math.floor(totalCost * 0.3) : 2500;
  const premiumCost = totalCost > 0 ? totalCost : 15000;

  // DYNAMIC PROPS GENERATOR FOR EDUCATIONAL OVERLAYS
  const t = (matchedTheme || '').toUpperCase();
  const getProps = (zone) => {
    if (t.includes('F1') || t.includes('FÓRMULA')) {
      if (zone==='entrada') return ['Arco de Neumáticos Gigantes', 'Auto Monoplaza Fórmula de Exhibición', 'Semáforo de Salida a escala real 3D', 'Banderas a cuadros monumentales'];
      if (zone==='lobby') return ['Pódium de ganadores volumétrico', 'Cascos de piloto gigantes (Photo Op)', 'Módulos tipo Pits para recepción', 'Copas / Trofeos XL'];
      if (zone==='salon') return ['Centros de mesa temáticos de engranajes', 'Llantas colgantes para pistas', 'Barras forradas tipo escudería'];
      if (zone==='foto') return ['Muro de patrocinadores (Backdrop F1)', 'Simulador de carreras estático', 'Silueta de monoplaza 2D iluminado', 'Botella de Champán Gigante de Victoria'];
      if (zone==='escenario') return ['Estructuras Truss de meta', 'Pantallas LED envolventes curvas', 'Podio central de premiación tipo Grand Prix'];
    }
    if (t.includes('OSCAR') || t.includes('HOLLYWOOD')) {
      if (zone==='entrada') return ['Estatuilla dorada de 2 metros', 'Claqueta de cine gigante articulada', 'Alfombra Roja con Postes unifila dorados', 'Estrella gigante del Paseo de la Fama'];
      if (zone==='lobby') return ['Rollo de película volumétrico', 'Cámaras vintage sobre trípodes 3D', 'Reflectores de Hollywood industriales'];
      if (zone==='salon') return ['Centros de mesa con estrellas neón', 'Mobiliario tapizado en terciopelo rojo', 'Casetones iluminados tipo cine'];
      if (zone==='foto') return ['Fondo de Letras Gigantes HOLLYWOOD', 'Claqueta XL personalizable', 'Silla de Director a escala masiva'];
      if (zone==='escenario') return ['Tarimas con estrellas doradas', 'Atriles de acrílico iluminado', 'Decoración de carretes gigantes como fondo'];
    }
    if (t.includes('CASINO') || t.includes('VEGAS')) {
      if (zone==='entrada') return ['Letrero Neón gigante de Welcome to Fabulous Las Vegas', 'Fichas de póker 3D gigantes', 'Dados luminosos de 1.5m, Cartas de As y Rey a escala humana'];
      if (zone==='lobby') return ['Máquinas Tragamonedas estáticas', 'Mesas de Black Jack decorativas', 'Ruleta dorada volumétrica'];
      if (zone==='salon') return ['Mesas de ruleta funcional', 'Mobiliario tapizado en tonos rojos y negros', 'Lámparas de techo estilo casino'];
      if (zone==='foto') return ['Trébol, picas, diamantes y corazones monumentales', 'Arco de cartas de la baraja inglesa', 'Fichas de casino colosales apiladas'];
      if (zone==='escenario') return ['Dados XL iluminados', 'Fondo tipo show de magia / Las vegas', 'Podio con forro de terciopelo verde'];
    }
    if (t.includes('ALICIA') || t.includes('MARAVILLAS')) {
      if (zone==='entrada') return ['Reloj Gigante de Bolsillo', 'Cerrojo o Puerta Mágica a escala', 'Hongos iluminados XL', 'Conejo Blanco Estatua'];
      if (zone==='lobby') return ['Tazas de Té gigantes', 'Cartas de Reina de corazones armables', 'Llave Mágica Volumétrica'];
      if (zone==='salon') return ['Centros de mesa con tazas dispares', 'Sillas desiguales para el sombrero loco', 'Jaulas colgadas con teteras'];
      if (zone==='foto') return ['Sombrero Loco Gigante 3D', 'Gato de Cheshire en Neón', 'Fondo del laberinto del jardín de la Reina'];
      if (zone==='escenario') return ['Trono de la Reina de Corazones', 'Castillo de cartas de póker gigantes', 'Tablero de ajedrez monumental como tarima'];
    }
    if (t.includes('CIRCO')) {
       if (zone==='entrada') return ['Fachada de carpa de circo vintage', 'Taquilla retro iluminada', 'Boleto Gigante Admit One', 'Animales de carrusel volumétricos'];
       if (zone==='lobby') return ['Cañón humano decorativo', 'Espejos concavos y convexos XL', 'Carros de palomitas antiguos', 'Aros de fuego estáticos'];
       if (zone==='salon') return ['Mobiliario rojo y blanco a rayas', 'Lámparas de techo tipo carpa de feria', 'Bases cilíndricas pintadas'];
       if (zone==='foto') return ['Aro acrobático cubierto en flores/tela', 'Plataforma para domador con látigos simulados', 'Carteles gigantes de Freak Show', 'Letras iluminadas CIRCUS'];
       if (zone==='escenario') return ['Pista de circo redonda central', 'Telones de terciopelo rojo dramáticos', 'Trapecios suspendidos sobre tarima'];
    }
    // Mapeo genérico para temáticas que aún no tienen su función matemática
    if (zone==='entrada') return ['Arcos inmersivos de entrada brandeados', `Letras iluminadas GIGANTES con la frase de la temática`, `Props volumétricos 3D icónicos de ${matchedTheme}`, 'Pórticos espectaculares tematizados a 3 metros de altura'];
    if (zone==='lobby') return [`Mesas periqueras con faldón acorde a la temática`, 'Módulos y stands de experiencias y alimentos volumétricos', 'Tótems iluminados con ambientación visual', `Siluetas personalizadas en 2D alusivas a ${matchedTheme}`];
    if (zone==='salon') return ['Centros de mesa majestuosos y altos', `Mobiliario tapizado enfocado a la vibra de ${matchedTheme}`, 'Complementos colgantes y lámparas de gran formato', 'Pistas de baile estampadas y decoradas'];
    if (zone==='foto') return [`Backdrops tridimensionales con escenografía multicapa de ${matchedTheme}`, 'Sillones extravagantes de acento fotográfico', 'Marcos gigantes de Instagram tematizados', 'Props corporales divertidos o estatuas para posar'];
    if (zone==='escenario') return ['Tarimas profesionales altas con faldaje temático', 'Pantallas de marco forrado', `Estructuras y trusses gigantes como marco de ${matchedTheme}`, 'Atriles de conferencia con props secundarios'];
    return [];
  };

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Conectando Arquitectura Web...</h2></div>;
  }

  if (!matchedTheme) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Ups, la temática no existe en nuestro mapeo oficial.</h2>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Regresar al inicio</Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#fcfaf8', minHeight: '100vh', paddingBottom: '100px', position: 'relative' }}>
      
      {/* Botón flotante superior de Regreso */}
      <Link href="/" style={{ 
        position: 'absolute', 
        top: '2rem', 
        left: '2rem', 
        color: 'white', 
        textDecoration: 'none', 
        fontWeight: 'bold', 
        fontSize: '1.1rem', 
        zIndex: 100, 
        textShadow: '0 2px 4px rgba(0,0,0,0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
         <span style={{ fontSize: '1.5rem' }}>←</span> Menú de Temáticas
      </Link>

      {/* 1. HERO SECTION */}
      <section style={{ 
        ...heroStyle, 
        height: '60vh', 
        minHeight: '400px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '2rem'
      }}>
        <span style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.4rem 1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>
          GUÍA PARA ARMAR TU EVENTO
        </span>
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', fontFamily: 'serif', letterSpacing: '-1px', maxWidth: '800px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
          {matchedTheme}
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '700px', opacity: 0.9, lineHeight: 1.6, textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
          Descubre cómo transformar un espacio vacío en una experiencia inolvidable. 
          En Staff Escenografía curamos las piezas precisas para que vivas exactamente la atmósfera de {matchedTheme}.
        </p>
      </section>

      <div className="container" style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        
        {/* 2. NIVEL DE INVERSIÓN (RESUMEN) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Experiencia Básica</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text)' }}>A partir de $35,000 MXN</div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Ideal para acentos en entrada y photo ops compactos.</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '1px solid #334155', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase' }}>Producción Premium</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>Tu imaginación es el límite</div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: '0.5rem 0 0 0' }}>Transformación 360 del Venue sin presupuesto tope.</p>
          </div>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', textAlign: 'center', marginBottom: '3rem' }}>Arma la atmósfera perfecta por Zonas</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* ZONA 1: ENTRADA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🚪</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Entrada</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>El primer impacto es vital. Marca la pauta del evento desde el primer paso que dan tus invitados.</p>
            </div>
            <div>
              <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#475569', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>Piezas imprescindibles recomendadas:</h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                  <li><strong>Arco de bienvenida</strong> o túnel inmersivo para cruzar al mundo temático.</li>
                  <li><strong>Letras iluminadas</strong> o letrero neón con nombre de la empresa a tamaño real.</li>
                  <li><strong>Iluminación arquitectónica</strong> que pinte las paredes exteriores del color de tu marca.</li>
                  {getProps('entrada').map((item, i) => (
                    <li key={i} style={{ fontSize: '0.9em', color: '#64748b', marginTop: '0.2rem' }}>✨ <strong>{item.split(' ')[0]} {item.split(' ')[1] || ''}</strong> {item.split(' ').slice(2).join(' ')}</li>
                  ))}
                </ul>
              </div>

              {decoracionZ.length > 0 && (
                <>
                  <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Elementos disponibles en catálogo:</h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {decoracionZ.map(p => {
                       const img = p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png';
                       return (
                         <Link href="/catalogo" key={p.id} style={{ width: '90px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                           <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                           <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', lineHeight: '1.2', color: '#64748b', fontWeight: 'bold' }}>{p.name.substring(0, 25)}{p.name.length > 25 ? '...' : ''}</div>
                         </Link>
                       );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          <hr style={{ borderColor: '#e2e8f0', margin: '0' }} />

          {/* ZONA 2: LOBBY */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🛋️</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Lobby</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>La antesala. El lugar ideal para recibir y preparar a los invitados antes de la gran revelación.</p>
            </div>
            <div>
              <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#475569' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>Piezas imprescindibles recomendadas:</h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li><strong>Salas Lounge y Periqueras</strong> para crear pequeñas islas de charla y cóctel.</li>
                  <li><strong>Módulos de registro/acreditación</strong> forrados o brandeados.</li>
                  <li><strong>Barras de servicio iluminadas</strong> para la entrega de bebidas iniciales.</li>
                  {getProps('lobby').map((item, i) => (
                    <li key={i} style={{ fontSize: '0.9em', color: '#64748b', marginTop: '0.2rem' }}>✨ <strong>{item.split(' ')[0]} {item.split(' ')[1] || ''}</strong> {item.split(' ').slice(2).join(' ')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr style={{ borderColor: '#e2e8f0', margin: '0' }} />

          {/* ZONA 3: SALÓN */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🥂</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Salón</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>La experiencia central inmersiva 360 grados. Combina mobiliario con utilería pesada que abrace todo el espacio.</p>
            </div>
            <div>
              <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#475569', marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>Piezas imprescindibles recomendadas:</h4>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', margin: 0 }}>
                  <li><strong>Mobiliario de Banquete</strong> con mesas imperiales o tablones decorados.</li>
                  <li><strong>Centros de mesa temáticos</strong> y follaje que unifique la visión de la gala.</li>
                  <li><strong>Sillas Tiffany, Ghost o Crossback</strong> según la elegancia del evento.</li>
                  {getProps('salon').map((item, i) => (
                    <li key={i} style={{ fontSize: '0.9em', color: '#64748b', marginTop: '0.2rem' }}>✨ <strong>{item.split(' ')[0]} {item.split(' ')[1] || ''}</strong> {item.split(' ').slice(2).join(' ')}</li>
                  ))}
                </ul>
              </div>

              {mobiliarioZ.length > 0 && (
                <>
                  <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text)', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '0.5rem' }}>Mobiliario disponible en catálogo:</h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {mobiliarioZ.map(p => {
                       const img = p.images && p.images.length > 0 ? p.images[0] : '/placeholder.png';
                       return (
                         <Link href="/catalogo" key={p.id} style={{ width: '90px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                           <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                           <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', lineHeight: '1.2', color: '#64748b', fontWeight: 'bold' }}>{p.name.substring(0, 25)}{p.name.length > 25 ? '...' : ''}</div>
                         </Link>
                       );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          <hr style={{ borderColor: '#e2e8f0', margin: '0' }} />

          {/* ZONA 4: SET FOTOGRÁFICO / PHOTO OP */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>📸</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Set Fotográfico</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>Diseñado para las redes sociales. El Photo Op perfecto para que la marca viva más allá del evento real.</p>
            </div>
            <div>
               <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#475569' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>Piezas imprescindibles recomendadas:</h4>
                  <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>Backdrop o Mampara Volumétrica</strong> impresa o forrada.</li>
                    <li><strong>Alfombra temática perimetral</strong> para marcar el cuadrado de la foto.</li>
                    {getProps('foto').map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9em', color: '#64748b', marginTop: '0.2rem' }}>✨ <strong>{item}</strong></li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>

          <hr style={{ borderColor: '#e2e8f0', margin: '0' }} />

          {/* ZONA 5: ESCENARIO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🎤</span>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Escenario</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>El punto focal de la gala donde suceden los momentos clave y las premiaciones estelares.</p>
            </div>
            <div>
               <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#475569' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)' }}>Piezas imprescindibles recomendadas:</h4>
                  <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>Tarima Profesional</strong> forrada en charol, vinil o alfombra premium.</li>
                    <li><strong>Grand Support / Truss</strong> para sostener iluminación robótica y pantallas LED.</li>
                    <li><strong>Atril de acrílico o madera</strong> para voceros y conductores.</li>
                    {getProps('escenario').map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9em', color: '#64748b', marginTop: '0.2rem' }}>✨ <strong>{item}</strong></li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* FLOAT CTA WHATSAPP */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
        <a 
          href="https://wa.me/525519925221"
          target="_blank"
          style={{ 
            backgroundColor: '#25D366', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: '50px', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            boxShadow: '0 10px 25px rgba(37,211,102,0.4)',
            transition: 'transform 0.2s',
            fontSize: '1.2rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          Cotiza
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
         <Link href="/catalogo" className="btn btn-secondary">← Explorar el Catálogo Completo</Link>
      </div>

    </main>
  );
}
