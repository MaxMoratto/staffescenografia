import Link from 'next/link';

export default function TerminosYCondiciones() {
  return (
    <main style={{ backgroundColor: '#fcfaf8', minHeight: '100vh', padding: '6rem 1rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>← Regresar</Link>
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>TÉRMINOS Y CONDICIONES DE USO</h1>
        
        <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>I. IDENTIDAD DEL PROVEEDOR</h3>
            <p>Este sitio es operado por POOL MKT S DE RL DE CV, nombre comercial Staff Escenografía, con domicilio en Ciudad de México.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>II. USO DEL SITIO</h3>
            <p>El usuario se compromete a utilizar este sitio de manera lícita y conforme a las disposiciones aplicables.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>III. SERVICIOS</h3>
            <p>Los servicios ofrecidos incluyen:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Renta de escenografía</li>
              <li>Fabricación de piezas en fibra de vidrio y otros materiales</li>
              <li>Diseño y ambientación de eventos</li>
            </ul>
            <p>Los productos mostrados pueden ser ilustrativos y sujetos a disponibilidad.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>IV. COTIZACIONES</h3>
            <p>Todas las cotizaciones:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Están expresadas en pesos mexicanos</li>
              <li>No incluyen IVA salvo indicación</li>
              <li>Están sujetas a cambios sin previo aviso</li>
              <li>Tienen vigencia limitada</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>V. CONDICIONES DE CONTRATACIÓN</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Se requiere anticipo para iniciar cualquier proyecto</li>
              <li>El saldo deberá cubrirse previo o durante el montaje</li>
              <li>El cliente es responsable del uso adecuado del material rentado</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>VI. RESPONSABILIDAD</h3>
            <p>POOL MKT S DE RL DE CV no se hace responsable por:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Uso indebido de los productos</li>
              <li>Daños ocasionados por terceros</li>
              <li>Retrasos derivados de causas externas (clima, logística, etc.)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>VII. PROPIEDAD INTELECTUAL</h3>
            <p>Todo el contenido del sitio (imágenes, renders, diseños, textos) es propiedad de la empresa y no puede ser utilizado sin autorización.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>VIII. MODIFICACIONES</h3>
            <p>La empresa puede modificar estos términos en cualquier momento.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>IX. LEGISLACIÓN APLICABLE</h3>
            <p>Estos términos se rigen por las leyes aplicables en Ciudad de México.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
