import React from "react";

const homepageItems = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    description: "High-performance laptop, perfect for work and travel.",
    price: 25,
    image: require("../data/dell_xps.jpg"),
  },
  {
    id: 2,
    name: "GoPro HERO 9",
    description: "Waterproof action camera for adventures.",
    price: 18,
    image: require("../data/gopro_hero9.jpg"),
  },
  {
    id: 3,
    name: "Electric Guitar",
    description: "Fender Stratocaster, great for gigs and practice.",
    price: 20,
    image: require("../data/electric_guitar.jpg"),
  },
];

function HomePage({ username, showWelcome }) {
  return (
    <div className="homepage" style={{
      minHeight: '100vh',
      background: "linear-gradient(rgba(67,192,233,0.18), rgba(44,62,80,0.12)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginBottom: '-144px',
    }}>
      <div className="welcome-banner" style={{
        background: '#43c0e9ff',
        color: '#fff',
        padding: '3rem 1.5rem',
        borderRadius: '16px',
        marginTop: '-2.5rem',
        boxShadow: '0 6px 24px rgba(44,62,80,0.12)'
      }}>
        <h1 style={{ fontSize: '2.75rem', margin: 0, fontWeight: 700 }}>Welcome to Rentify!</h1>
        <p style={{ fontSize: '1.35rem', marginTop: '1.25rem', fontWeight: 500 }}>
          {username && showWelcome
            ? `Welcome, ${username}! Discover, rent, and enjoy a wide variety of items.`
            : <>Discover, rent, and enjoy a wide variety of items.<br />Sign up or log in to get started!</>}
        </p>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3e50', fontWeight: 700 }}>Featured Items</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
          {homepageItems.map(item => (
            <div key={item.id} style={{
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
              padding: '1.5rem',
              maxWidth: '220px',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <img src={item.image} alt={item.name} style={{ height: '120px', width: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0.5rem 0', color: '#2d3e50' }}>{item.name}</h3>
              <p style={{ color: '#555', fontSize: '0.95rem' }}>{item.description}</p>
              <p style={{ fontWeight: 'bold', color: '#4caf50' }}>${item.price} / day</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
