import Link from 'next/link';

export default function AvisoPrivacidad() {
  return (
    <main style={{ backgroundColor: '#fcfaf8', minHeight: '100vh', padding: '6rem 1rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>← Regresar</Link>
        </div>
        
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>AVISO DE PRIVACIDAD</h1>
        
        <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, se informa lo siguiente:
          </p>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>I. RESPONSABLE DEL TRATAMIENTO DE DATOS</h3>
            <p>POOL MKT S DE RL DE CV, con domicilio en Quetzalcóatl 121, Arenal 1a Sección, Venustiano Carranza, Ciudad de México, es responsable del uso y protección de sus datos personales.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>II. DATOS PERSONALES RECABADOS</h3>
            <p>Podremos recabar los siguientes datos:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Nombre completo</li>
              <li>Teléfono</li>
              <li>Correo electrónico</li>
              <li>Información de proyectos o eventos</li>
              <li>Datos fiscales (en caso de facturación)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>III. FINALIDAD DEL USO DE DATOS</h3>
            <p>Los datos serán utilizados para:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Contacto y atención a clientes</li>
              <li>Elaboración de cotizaciones</li>
              <li>Prestación de servicios de renta, fabricación y escenografía</li>
              <li>Facturación</li>
              <li>Envío de información comercial y promocional</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>IV. DERECHOS ARCO</h3>
            <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos puede enviar una solicitud al correo: <strong>hmaximo1@gmail.com</strong></p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>V. TRANSFERENCIA DE DATOS</h3>
            <p>Sus datos no serán compartidos con terceros sin su consentimiento, salvo requerimiento legal.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>VI. SEGURIDAD DE LA INFORMACIÓN</h3>
            <p>POOL MKT S DE RL DE CV implementa medidas de seguridad administrativas, técnicas y físicas para proteger sus datos.</p>
          </div>

          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>VII. CAMBIOS AL AVISO</h3>
            <p>Este aviso puede ser modificado en cualquier momento. Las modificaciones estarán disponibles en este sitio web.</p>
          </div>

          <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
            Fecha de última actualización: 11 de abril de 2026
          </p>
        </div>
      </div>
    </main>
  );
}
