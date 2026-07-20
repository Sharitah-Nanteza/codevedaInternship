import React from 'react';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'sans-serif', color: '#18181b', margin: 0 }}>
      
      {/* 1. Responsive Navigation Bar (Flexbox) */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid #e4e4e7'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>⚡ DEVSTREAM</div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '0.95rem', fontWeight: 500, color: '#52525b' }}>
          <span style={{ cursor: 'pointer' }}>Features</span>
          <span style={{ cursor: 'pointer' }}>Pricing</span>
        </div>
      </nav>

      {/* 2. Hero Section (Flexbox Layout with automatic wrap) */}
      <header style={{
        padding: '60px 20px', maxWidth: '1200px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center'
      }}>
        {/* Text Area */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
            Build user interfaces <span style={{ color: '#0066cc' }}>unbelievably fast</span>.
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#52525b', lineHeight: '1.6', margin: 0 }}>
            A production-ready design foundation utilizing fluid CSS layout architectures, built to optimize engineer workflow from development to deployment.
          </p>
          <button style={{
            padding: '12px 28px', fontSize: '16px', fontWeight: 'bold',
            backgroundColor: '#0066cc', color: 'white', border: 'none',
            borderRadius: '6px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: 'fit-content'
          }}>
            Get Started Free
          </button>
        </div>

        {/* Hero Visual Box */}
        <div style={{
          flex: '1 1 400px', height: '350px', backgroundColor: '#f4f4f5',
          borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid #e4e4e7', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <div style={{ fontSize: '5rem' }}>💻</div>
        </div>
      </header>

      {/* 3. Features Section (Modern CSS Grid Layout) */}
      <section style={{ backgroundColor: '#fafafa', padding: '60px 20px', borderTop: '1px solid #e4e4e7' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 700, letterSpacing: '-0.5px' }}>Why engineers prefer our engine</h2>
          
          {/* Responsive CSS Grid Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e4e4e7' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🧱</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Modular Architecture</h3>
              <p style={{ margin: 0, color: '#52525b', lineHeight: '1.5' }}>Every node and structural block is sandboxed for quick custom composition extensions.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e4e4e7' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>📱</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Fluid Responsiveness</h3>
              <p style={{ margin: 0, color: '#52525b', lineHeight: '1.5' }}>Engineered layout systems adapt to precise window widths natively with zero layout shift.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e4e4e7' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Sub-millisecond Speed</h3>
              <p style={{ margin: 0, color: '#52525b', lineHeight: '1.5' }}>Lightweight asset pipelines ensure lightning fast performance straight out of the box.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}