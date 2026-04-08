import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';
import QuoteSidebar from '../components/QuoteSidebar';

export const metadata = {
  title: 'Catálogo Escenográfico Profesional',
  description: 'Catálogo premium de elementos escenográficos, utilería y mobiliario en renta para toda la república.',
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
