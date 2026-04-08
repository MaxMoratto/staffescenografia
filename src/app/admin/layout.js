import Link from 'next/link';
import '../catalog.css'; // Reuse our reset and basic tokens
import './admin.css';
import AuthGuard from '../../components/AuthGuard';

export const metadata = {
  title: 'Backoffice | Escenografías Mágicas',
};

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="admin-layout">
        <aside className="admin-sidebar" style={{zIndex: 50}}>
          <div className="admin-logo">
            <h2>Backoffice</h2>
            <span className="badge">Admin</span>
          </div>
          <nav className="admin-nav" style={{pointerEvents: 'auto'}}>
            <Link href="/admin">📊 Dashboard</Link>
            <Link href="/admin/productos">📦 Inventario</Link>
            <Link href="/admin/productos/nuevo">➕ Alta de Pieza</Link>
            <Link href="/admin/vendedores">👥 Vendedores</Link>
            <Link href="/admin/cotizaciones">📝 Cotizaciones</Link>
            <hr style={{borderColor: 'var(--border)', margin: '1rem 0'}} />
            <Link href="/catalogo" target="_blank" className="nav-external">↗ Ir al Catálogo Público</Link>
          </nav>
        </aside>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
