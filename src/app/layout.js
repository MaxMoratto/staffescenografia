import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';
import QuoteSidebar from '../components/QuoteSidebar';

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
      <body>
        <QuoteProvider>
          {children}
          <QuoteSidebar />
        </QuoteProvider>
      </body>
    </html>
  );
}
