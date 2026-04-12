import Link from 'next/link';

export default function PoliticaCookies() {
  return (
    <main style={{ backgroundColor: '#fcfaf8', minHeight: '100vh', padding: '6rem 1rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>← Regresar</Link>
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>POLÍTICA DE COOKIES</h1>
        
        <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Este sitio web utiliza cookies para mejorar la experiencia del usuario.
          </p>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>¿QUÉ SON LAS COOKIES?</h3>
            <p>Son archivos que se almacenan en su dispositivo al navegar en internet.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>TIPOS DE COOKIES UTILIZADAS</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Cookies de funcionamiento:</strong> necesarias para el sitio</li>
              <li><strong>Cookies de análisis:</strong> (ej. Google Analytics)</li>
              <li><strong>Cookies publicitarias:</strong> (ej. Meta Pixel)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>FINALIDAD</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Analizar el comportamiento de los usuarios</li>
              <li>Mejorar el sitio web</li>
              <li>Mostrar publicidad relevante</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>CONFIGURACIÓN</h3>
            <p>Usted puede desactivar las cookies desde su navegador en cualquier momento.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>ACEPTACIÓN</h3>
            <p>Al continuar navegando en este sitio, usted acepta el uso de cookies conforme a esta política.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>ACTUALIZACIONES</h3>
            <p>Esta política puede ser modificada en cualquier momento.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
