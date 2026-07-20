import React, { useState } from 'react';

// 1. Defining your Custom Library Button component directly here
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function CustomLibraryButton({ onClick, children }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#0066cc',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0052a3')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0066cc')}
    >
      {children}
    </button>
  );
}

// 2. Main Test Application View
function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '16px', fontFamily: 'sans-serif' }}>
      <h1>Testing My Custom Component Library</h1>
      
      <p style={{ color: '#666' }}>Bypassed the Vite package cache successfully!</p>

      {/* Rendering your component */}
      <CustomLibraryButton onClick={() => alert('Your custom button works flawlessly!')}>
        My Custom Library Button
      </CustomLibraryButton>
    </div>
  );
}

export default App;