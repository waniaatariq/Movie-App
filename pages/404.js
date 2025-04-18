import Link from 'next/link';

export default function Custom404() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(55, 65, 81, 0.7)', // gray-800 with opacity
          color: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f87171', marginBottom: '1rem' }}>
          404
        </h1>
        <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>
          Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
        </p>
        <Link href="/">
          <button
            style={{
              backgroundColor: '#dc2626',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#b91c1c')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#dc2626')}
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
