export default function AdminTest() {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>Admin Route Test</h1>
      <p>This page confirms that the admin route is accessible.</p>
      <div style={{
        background: '#f0f0f0',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3>Route Information:</h3>
        <ul>
          <li><strong>Path:</strong> /admin/test</li>
          <li><strong>Status:</strong> ✅ Accessible</li>
          <li><strong>Type:</strong> Server-side rendered</li>
        </ul>
      </div>
      <div style={{
        background: '#e8f5e8',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3>Next Steps:</h3>
        <p>If you can see this page, the admin route is working. The main admin dashboard might have authentication or API issues.</p>
        <a href="/admin" style={{
          display: 'inline-block',
          background: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '0.5rem'
        }}>
          Try Main Admin Dashboard
        </a>
      </div>
    </div>
  );
} 