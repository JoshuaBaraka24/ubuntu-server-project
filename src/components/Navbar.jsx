import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Navbar({ username, showWelcome }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/myrentals">My Rentals</Link>
      <div className="navbar-right">
        {username ? (
          <>
            <span style={{ marginRight: "1rem" }}>{showWelcome ? `Welcome, ${username}` : username}</span>
            <button onClick={handleLogout} style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
