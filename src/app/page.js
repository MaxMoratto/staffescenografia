import './globals.css';
import './catalog.css';
import Link from 'next/link';
import RandomProducts from '../components/RandomProducts';

export default function Home() {
  return (
    <main className="catalog-main container">
      <header className="catalog-header">
        <div className="header-logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Staff <span className="highlight">Escenografía</span></h1>
          </Link>
        </div>
        <nav className="header-nav">
          <Link href="/colecciones" className="nav-item">Temáticas</Link>
          <Link href="/catalogo" className="nav-item">Catálogo</Link>
          <Link href="/admin" className="nav-item">Acceso Staff</Link>
        </nav>
        <div className="header-actions">
          <Link href="/catalogo" className="btn btn-primary" style={{ textDecoration: 'none' }}>Ir al Catálogo</Link>
        </div>
      </header>
      
      {/* HERO SECTION PREMIUM */}
      <section className="hero-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content" style={{ maxWidth: '900px' }}>
          <span className="badge">Staff Escenografía B2B</span>
          <h2 className="hero-title" style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>
            Escenografía, props y decoración para transformar cualquier espacio.
          </h2>
          <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginTop: '1.5rem', color: '#475569', maxWidth: '800px', margin: '1.5rem auto', lineHeight: '1.6' }}>
            Ofrecemos renta de elementos volumétricos, temáticos y decorativos para eventos, activaciones, exhibiciones, espacios comerciales, sets y experiencias de marca.
            Trabajamos con agencias, corporativos, hoteles, productoras y clientes particulares. Contamos con más de 10,000 elementos disponibles.
          </p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/catalogo" className="btn btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>Ver catálogo completo</Link>
            <Link href="/colecciones" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>Buscar por temática</Link>
            <a href="https://wa.me/5211234567890" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: '#25D366', color: 'white', border: 'none' }}>Hablar por WhatsApp</a>
          </div>
        </div>
      </section>

      {/* MARQUEE INFINITO B2B */}
      <div className="marquee-container" style={{ borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div className="marquee-content">
          {[...Array(8)].map((_, i) => (
            <div className="marquee-item" key={i}>
              <span>RENTAS B2B</span> <span className="marquee-dot"></span>
              <span>MÁS DE 10,000 PIEZAS</span> <span className="marquee-dot"></span>
              <span>ESCENOGRAFÍA IMPACTANTE</span> <span className="marquee-dot"></span>
              <span>COBERTURA NACIONAL</span> <span className="marquee-dot"></span>
            </div>
          ))}
        </div>
      </div>

      {/* BIG STATEMENT SECTION */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f8fafc', color: '#1e293b' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
          No rentamos objetos. <br/> <span style={{ color: 'var(--primary)' }}>Rentamos impacto visual.</span>
        </h2>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: '#475569', lineHeight: '1.8' }}>
          No vendemos piezas sueltas. Resolvemos la ambientación, la presencia y la experiencia. Soluciones rápidas, visuales y rentables para cualquier industria.
        </p>
      </section>

      {/* RANDOM PRODUCTS GALLERY */}
      <RandomProducts />

      {/* ESTRUCTURA DE SOLUCIONES (4 Pilares) */}
      <section style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '0.5rem' }}>Estructura de Soluciones</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Si necesitas llamar la atención, crear una experiencia o vestir un espacio, podemos ayudarte.</p>
        </div>

        <div className="features-grid-b2b">
          <div className="feature-card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏛️</div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ambientación y Transformación</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>Para quienes quieren cambiar por completo la percepción de un lugar.</p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Hoteles • Salones • Restaurantes • Oficinas</strong>
          </div>

          <div className="feature-card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛍️</div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Exhibición y Atracción</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>Para negocios que necesitan un foco visual innegable para llamar la atención masiva.</p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Escaparates • Aperturas • Activaciones • Stands</strong>
          </div>

          <div className="feature-card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎭</div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Producción Temática</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>Para marcas o clientes que necesitan crear una experiencia temática inmersiva y real.</p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Fiestas Coporativas • Halloween • Fin de Año</strong>
          </div>

          <div className="feature-card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Producción Audiovisual</h3>
            <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '1rem' }}>Para quienes necesitan piezas hiperrealistas para grabaciones o campañas digitales.</p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Comerciales • Cine • Sesiones de Foto • Videos</strong>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO SECTION (VIDEOS - KEPT) */}
      <section style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center', padding: '0 1rem', backgroundColor: '#ffffff', color: 'var(--text-primary)' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Portafolio Visual</span>
        <h2 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>Casos de Éxito</h2>
        <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
          Ve en acción cómo nuestras piezas monumentales transforman por completo la inmersión y la escala de eventos reales en vivo.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {/* Video 1 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/irVPmhTSDhc?autoplay=0&rel=0" title="Caso de Éxito 1" frameBorder="0" allowFullScreen></iframe>
          </div>
          {/* Video 2 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/TuU_K_qZwOw?autoplay=0&rel=0" title="Caso de Éxito 2" frameBorder="0" allowFullScreen></iframe>
          </div>
          {/* Video 3 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/m9QQKzApkXY?autoplay=0&rel=0" title="Caso de Éxito 3" frameBorder="0" allowFullScreen></iframe>
          </div>
          {/* Video 4 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cBT8kZ_KSGM?autoplay=0&rel=0" title="Caso de Éxito 4" frameBorder="0" allowFullScreen></iframe>
          </div>
          {/* Video 5 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/idXaYBzp_-M?autoplay=0&rel=0" title="Caso de Éxito 5" frameBorder="0" allowFullScreen></iframe>
          </div>
          {/* Video 6 */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', aspectRatio: '16/9' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/YcRGXZzq2IU?autoplay=0&rel=0" title="Caso de Éxito 6" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* INDUSTRIAS QUE ATENDEMOS */}
      <section style={{ maxWidth: '1200px', margin: '3rem auto 3rem', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>Industrias que Atendemos</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: "Eventos y Celebraciones", desc: "Bodas, XV años, cumpleaños, aniversarios, fiestas temáticas y eventos privados." },
            { title: "Empresas y Corporativos", desc: "Convenciones, lanzamientos, aniversarios de marca, foros, premiaciones y activaciones." },
            { title: "Hoteles y Nightlife", desc: "Ambientación temporal, decoración rotativa, photo opportunities y experiencias." },
            { title: "Retail y Plazas Comerciales", desc: "Escaparates, exhibiciones de temporada, decoración promocional para aumentar tráfico." },
            { title: "Escuelas y Universidades", desc: "Graduaciones, festivales, ceremonias, eventos institucionales y escenografía teatral." },
            { title: "Gobierno y Cultura", desc: "Ferias, festivales de ciudad, exposiciones, celebraciones patrias y arte inmersivo." }
          ].map((ind, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <h4 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>{ind.title}</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP 6 TEMÁTICAS NUMERADAS */}
      <section style={{ marginTop: '4rem', marginBottom: '1rem', textAlign: 'center', padding: '0 1rem' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>TOP DE EVENTOS</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Las 6 Temáticas Más Demandadas</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0' }}>El mercado corporativo escoge mayormente estos ambientes.</p>
      </section>

      <section className="categories-grid" style={{
        marginTop: '1.5rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem',
        padding: '0 1rem',
        maxWidth: '1200px',
        margin: '3rem auto 0'
      }}>
        {[
          { name: "NOCHE DE OSCARES / ALFOMBRA ROJA", slug: "noche-de-oscares-alfombra-roja", bg: "tema_oscares_1775628584134.png" },
          { name: "FÓRMULA 1", slug: "formula-1", bg: "tema_f1_1775629680591.png" },
          { name: "CASINO LAS VEGAS", slug: "casino-las-vegas", bg: "tema_casino_1775628613468.png" },
          { name: "ALICIA EN EL PAÍS DE LAS MARAVILLAS", slug: "alicia-en-el-pais-de-las-maravillas", bg: "tema_alicia_1775628599698.png" },
          { name: "SAFARI / SELVA", slug: "safari-selva", bg: "tema_safari_1775631433405.png" },
          { name: "FIESTA NEÓN", slug: "neon-party", bg: "tema_neon_1775636019582.png" }
        ].map((theme, index) => {
          const bgImage = `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 100%), url('/themes/${theme.bg}')`;

          return (
            <Link key={theme.name} href={`/tematicas/${theme.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                height: '250px', // Cuadros más grandes
                borderRadius: '12px',
                background: bgImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                transition: 'all 0.3s',
                border: '1px solid #333',
                position: 'relative',
                overflow: 'hidden'
              }} className="theme-card-hover">
                
                {/* Número Gigante con Transparencia */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  fontSize: '8rem',
                  fontWeight: '900',
                  color: 'rgba(255,255,255,0.1)',
                  lineHeight: '1',
                  fontFamily: 'Outfit'
                }}>
                  {index + 1}
                </div>

                <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '0.5rem' }}>TOP {index + 1}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', lineHeight: '1.1' }}>
                  {theme.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </section>

      {/* INSTAGRAM GALLERY */}
      <section style={{ marginTop: '5rem', marginBottom: '2rem', padding: '0 1rem', textAlign: 'center' }}>
        <a href="https://instagram.com/staffescenografia" target="_blank" rel="noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', color: '#E1306C' }}>📸</span>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Síguenos en Instagram</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#1e293b' }}>@staffescenografia</h2>
        </a>
        
        <div className="insta-grid-5">
          {[
            "tema_oscares_1775628584134.png",
            "tema_f1_1775629680591.png",
            "tema_casino_1775628613468.png",
            "tema_safari_1775631433405.png",
            "tema_alicia_1775628599698.png"
          ].map((img, idx) => (
            <a key={idx} href="https://instagram.com/staffescenografia" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="insta-hover" style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundImage: `url('/themes/${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div className="insta-overlay">
                  <span style={{ color: 'white', fontSize: '2.5rem', transform: 'scale(0.8)', transition: 'transform 0.3s' }}>♥</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '5rem' }}>
        <Link href="/colecciones" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1.2rem 3.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          Explorar las +50 Colecciones
        </Link>
      </div>
    </main>
  );
}
