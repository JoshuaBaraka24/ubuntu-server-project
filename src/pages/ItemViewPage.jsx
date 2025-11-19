
function ItemViewPage() {
  const [requestingId, setRequestingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupItem, setPopupItem] = useState(null);

  const handleRequest = (itemId) => {
    setRequestingId(itemId);
    setTimeout(() => {
      setPopupItem(demoItems.find(item => item.id === itemId));
      setShowPopup(true);
      setRequestingId(null);
    }, 1200);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupItem(null);
  };

  return (
    <div className="itemview-page">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3e50', fontWeight: 700 }}>Items for Rent</h2>
      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        justifyItems: 'center',
        alignItems: 'stretch',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
        {demoItems.map(item => (
          <div key={item.id} style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '260px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <img src={item.image} alt={item.name} style={{ height: '160px', width: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            <h3 style={{ margin: '0.5rem 0', color: '#2d3e50' }}>{item.name}</h3>
            <p style={{ color: '#555', fontSize: '0.95rem' }}>{item.description}</p>
            <p style={{ fontWeight: 'bold', color: '#4caf50' }}>${item.price} / day</p>
            <button
              onClick={() => handleRequest(item.id)}
              disabled={requestingId === item.id}
              style={{ marginTop: '1rem' }}
            >
              {requestingId === item.id ? 'Requesting...' : 'Request to Rent'}
            </button>
          </div>
        ))}
      </div>

      {showPopup && popupItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(44,62,80,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(44,62,80,0.18)',
            padding: '2rem',
            minWidth: '320px',
            textAlign: 'center',
            position: 'relative',
          }}>
            <img src={popupItem.image} alt={popupItem.name} style={{ width: '80px', borderRadius: '8px', marginBottom: '1rem' }} />
            <h3 style={{ margin: '0.5rem 0' }}>{popupItem.name}</h3>
            <p style={{ color: '#4caf50', fontWeight: 'bold' }}>Request Sent!</p>
            <p style={{ color: '#555', fontSize: '1rem' }}>
              Your request to rent <b>{popupItem.name}</b> has been sent to the owner.<br />
              You will receive a confirmation once the owner responds.
            </p>
            <button
              onClick={closePopup}
              style={{
                background: '#2d3e50',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                marginTop: '1rem',
              }}
            >Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemViewPage;
import React, { useState } from "react";
import { demoItems } from "../data/items";
