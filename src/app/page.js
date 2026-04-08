import './globals.css';
import Link from 'next/link';

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
          <Link href="/catalogo" className="nav-item">Catálogo</Link>
          <Link href="/admin" className="nav-item">Acceso Staff</Link>
        </nav>
        <div className="header-actions">
          <Link href="/catalogo" className="btn btn-primary" style={{ textDecoration: 'none' }}>Ir al Catálogo</Link>
        </div>
      </header>
      
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">Catálogo Premium 2024</span>
          <h2 className="hero-title">Producción a otro nivel.</h2>
          <p className="hero-subtitle">
            Explora más de 5,000 elementos escenográficos auténticos. Muebles de época, 
            estatuas temáticas y utilería detallada para tu próxima gran producción o evento.
          </p>
          <div className="hero-cta">
            <Link href="/catalogo" className="btn btn-primary" style={{ textDecoration: 'none' }}>Explorar Catálogo</Link>
          </div>
        </div>
      </section>

      <section className="categories-grid" style={{
        marginTop: '2rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1rem',
        padding: '0 1rem'
      }}>
        {ALL_THEMES.map((theme) => {
          let bgImage = "linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%)";
          const gradient = `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)`;
          
          if (theme === "NOCHE DE OSCARES / ALFOMBRA ROJA") bgImage = `${gradient}, url('/themes/tema_oscares_1775628584134.png')`;
          if (["FÓRMULA 1", "F1 GRAN PRIX", "F1 FIESTA TEMA", "F1 SIMULADORES"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_f1_1775629680591.png')`;
          if (theme === "ALICIA EN EL PAÍS DE LAS MARAVILLAS") bgImage = `${gradient}, url('/themes/tema_alicia_1775628599698.png')`;
          if (theme === "PARÍS & BURLESQUE") bgImage = `${gradient}, url('/themes/tema_paris_1775629698111.png')`;
          if (theme === "CASINO LAS VEGAS") bgImage = `${gradient}, url('/themes/tema_casino_1775628613468.png')`;
          if (theme === "CIRCO VINTAGE") bgImage = `${gradient}, url('/themes/tema_circo_1775629712579.png')`;
          if (["BAILE DE MÁSCARAS / VENECIANO", "MARDI GRAS", "VENECIANO", "CARNAVAL"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_veneciano_1775629726730.png')`;
          if (theme === "BLANCO Y NEGRO (ELEGANTE)") bgImage = `${gradient}, url('/themes/tema_blancoynegro_1775629742168.png')`;
          if (["SAFARI / SELVA", "ANIMALES", "ANIMALES DE JUNGLA", "JUNGLA / SELVA", "ANIMALES DE ZOOLÓGICO", "SAFARI", "SELVA / SALVAJE"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_safari_1775631433405.png')`;
          if (["ANIMALES DE GRANJA", "GRANJA"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_granja_1775631452123.png')`;
          if (["LONDRES"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_londres_1775636270738.png')`;
          if (["CARIBE", "PLAYA"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_caribe_1775631469531.png')`;
          if (theme === "DÉCADAS 70S") bgImage = `${gradient}, url('/themes/tema_70s_1775631487091.png')`;
          if (["DÉCADAS 80S", "80S", "RETRO"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_80s_1775631803118.png')`;
          if (["GREASE", "DÉCADAS 50S", "ROCK AND ROLL"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_50s_1775631817666.png')`;
          if (["HARRY POTTER", "MAGIA Y HECHICERÍA"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_magia_1775631829703.png')`;
          if (["GRIEGO", "DIOSES", "OLIMPO"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_griego_1775631843850.png')`;
          if (theme === "PIRATA") bgImage = `${gradient}, url('/themes/tema_pirata_1775631860005.png')`;
          if (["CABALLOS", "CABALLOS DE CARRUSEL"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_caballos_1775635746730.png')`;
          if (["MEXICANO", "DESPECHO", "ARTE MEXICANO"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_mexicano_1775635761419.png')`;
          if (["PREHISTÓRICO", "JURASICC PARK"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_dinos_1775635777241.png')`;
          if (["DRAGONES", "GODZILLA", "KING KONG"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_monstruos_1775635793769.png')`;
          if (["ARABE", "LAS MIL Y UNA NOCHES"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_arabe_1775635809361.png')`;
          if (["ROMANO", "ANTIGUEDAD"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_romano_1775635879594.png')`;
          if (["VINTAGE", "GREAT GASTBY", "CIRCO VINTAGE"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_gatsby_1775635894583.png')`;
          if (["STAR WARS", "ESPACIAL"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_starwars_1775635909844.png')`;
          if (["OKTOBERFEST", "CERVEZA"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_oktoberfest_1775635925342.png')`;
          if (["NAVIDAD / CHRISTMAS", "NACIMIENTOS", "POSADAS"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_navidad_1775635963825.png')`;
          if (["HALLOWEEN", "CASA DE LOS ESPANTOS"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_halloween_1775635979854.png')`;
          if (["DÍA DE MUERTOS", "CATRINAS"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_diademuertos_1775635992113.png')`;
          if (["DÍA DEL AMOR Y LA AMISTAD"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_sanvalentin_1775636005008.png')`;
          if (["FIESTA DE FIN DE AÑO", "NEON PARTY", "CARICATURAS", "PASCUA"].includes(theme)) bgImage = `${gradient}, url('/themes/tema_neon_1775636019582.png')`;

          const slug = theme.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

          return (
            <Link key={theme} href={`/tematicas/${slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                height: '150px',
                borderRadius: '8px',
                background: bgImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1rem',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                border: '1px solid #333'
              }} className="theme-card-hover">
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  {theme}
                </h3>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

const ALL_THEMES = [
  "NOCHE DE OSCARES / ALFOMBRA ROJA",
  "FÓRMULA 1",
  "F1 GRAN PRIX",
  "F1 FIESTA TEMA",
  "F1 SIMULADORES",
  "ALICIA EN EL PAÍS DE LAS MARAVILLAS",
  "PARÍS & BURLESQUE",
  "CASINO LAS VEGAS",
  "CIRCO VINTAGE",
  "BAILE DE MÁSCARAS / VENECIANO",
  "MARDI GRAS",
  "BLANCO Y NEGRO (ELEGANTE)",
  "SAFARI / SELVA",
  "ANIMALES",
  "ANIMALES DE GRANJA",
  "ANIMALES DE JUNGLA",
  "ANIMALES DE ZOOLÓGICO",
  "CABALLOS",
  "CABALLOS DE CARRUSEL",
  "CARIBE",
  "CARNAVAL",
  "DÉCADAS 70S",
  "DÉCADAS 80S",
  "DESPECHO",
  "DRAGONES",
  "GODZILLA",
  "GRANJA",
  "GREASE",
  "GRIEGO",
  "HARRY POTTER",
  "JUNGLA / SELVA",
  "KING KONG",
  "LONDRES",
  "PIRATA",
  "PLAYA",
  "PREHISTÓRICO",
  "ROMANO",
  "SAFARI",
  "SELVA / SALVAJE",
  "VENECIANO",
  "VINTAGE",
  "GREAT GASTBY",
  "MEXICANO",
  "ARABE",
  "LAS MIL Y UNA NOCHES",
  "STAR WARS",
  "JURASICC PARK",
  "CARICATURAS",
  "NEON PARTY",
  "NAVIDAD / CHRISTMAS",
  "NACIMIENTOS",
  "POSADAS",
  "FIESTA DE FIN DE AÑO",
  "PASCUA",
  "HALLOWEEN",
  "CASA DE LOS ESPANTOS",
  "CATRINAS",
  "DÍA DE MUERTOS",
  "DÍA DEL AMOR Y LA AMISTAD",
  "OKTOBERFEST"
];
