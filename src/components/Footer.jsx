import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Rentify. All rights reserved.</span>
        <span style={{ marginLeft: '1.5rem' }}>
          <a href="/" style={{ color: '#43e97b', textDecoration: 'none', fontWeight: 500 }}>Home</a> |
          <a href="/items" style={{ color: '#43e97b', textDecoration: 'none', marginLeft: '0.5rem', fontWeight: 500 }}>Items</a> |
          <a href="/dashboard" style={{ color: '#43e97b', textDecoration: 'none', marginLeft: '0.5rem', fontWeight: 500 }}>Dashboard</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
