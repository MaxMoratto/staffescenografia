import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';
import QuoteSidebar from '../components/QuoteSidebar';
import Link from 'next/link';

export const metadata = {
  title: 'Staff Escenografía | Renta de Props y Escenografía Temática',
  description: 'Catálogo maestro de renta de escenografía volumétrica, props gigantes, figuras de animales, superhéroes y utilería corporativa para fiestas temáticas y eventos especiales en México.',
  keywords: 'renta de escenografía, renta de fiesta temática, renta de super héroes, renta de animales, animales exóticos decoración, props gigantes, elementos volumétricos para eventos, renta de utilería, escenografía para cine, renta de mobiliario, figuras 3D, decoración de eventos, escenografías mágicas',
  openGraph: {
    title: 'Staff Escenografía | Catálogo de Elementos',
    description: 'Transforma tu evento con nuestras piezas reales. Renta de utilería temática gigantesca: superhéroes, animales, casino, vintage y más.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Staff Escenografía'
  },
  robots: {
    index: true,
    follow: true, // Esto indica a Google que debe volver constantemente a leer los nuevos productos
    googleBot: {
      index: true,
      follow: true,
    },
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Este head adicional ayuda como respaldo para redes sociales */}
      </head>
      <body>
        <QuoteProvider>
          {children}
          
          <footer style={{
            backgroundColor: '#111827', // Dark gray
            color: '#f3f4f6',
            padding: '4rem 2rem 2rem 2rem',
            marginTop: 'auto',
            borderTop: '4px solid var(--primary)', // Línea oro elegante
            fontFamily: 'Inter, sans-serif'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
              
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                Staff Escenografía
              </h2>
              
              <p style={{ color: '#9ca3af', maxWidth: '600px', fontSize: '1rem', lineHeight: '1.5' }}>
                Transformamos espacios en experiencias inolvidables. Maestros en escenografía temática y elementos volumétricos para la industria de eventos corporativos, fiestas y festivales.
              </p>
              
              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '1rem' }}>
                {/* Facebook Link */}
                <a href="https://www.facebook.com/staffescenografia" target="_blank" rel="noopener noreferrer" 
                   style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '500' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Facebook
                </a>

                {/* Instagram Link */}
                <a href="https://www.instagram.com/staffescenografia" target="_blank" rel="noopener noreferrer" 
                   style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '500' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
              </div>
              
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151', width: '100%', color: '#6b7280', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                
                {/* Legal Links (Subtle) */}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link href="/legal/privacidad" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Aviso de Privacidad</Link>
                  <span style={{ color: '#4b5563' }}>|</span>
                  <Link href="/legal/terminos" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Términos y Condiciones</Link>
                  <span style={{ color: '#4b5563' }}>|</span>
                  <Link href="/legal/cookies" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Política de Cookies</Link>
                </div>

                <span style={{ marginTop: '0.5rem' }}>© {new Date().getFullYear()} Staff Escenografía. POOL MKT S DE RL DE CV. Todos los derechos reservados.</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                  Una plataforma diseñada por <strong style={{ color: 'var(--primary)', letterSpacing: '1px' }}>maximowebmaster</strong>
                </span>
              </div>
              
            </div>
          </footer>

          <QuoteSidebar />
        </QuoteProvider>
      </body>
    </html>
  );
}
