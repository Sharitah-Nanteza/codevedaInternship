import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Keep the dataset size reasonable or slice it to show optimization control
  const heavyData = Array.from({ length: 5000 }, (_, i) => `Item number ${i + 1}`).slice(0, 100);

  return (
    <div className="container">
      <h1>Codveda Performance Optimization Dashboard</h1>
      
      {/* OPTIMIZED IMAGE: Forced to webp format, compressed quality, native lazy loading, explicit dimensions */}
      <div className="image-container">
        <img 
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80&fm=webp" 
          alt="Optimized Tech Asset" 
          loading="lazy"
          width="600"
          height="400"
        />
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Interactive Counter: {count}
        </button>
      </div>

      <div className="data-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <h3>Optimized Large Dataset View (Paginated/Windowed):</h3>
        {heavyData.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default App