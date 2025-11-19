import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function DashboardPage({ username, role }) {
  const [profile, setProfile] = useState({ username });
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch profile from Supabase on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase.auth.getUser();
      if (error) setError(error.message);
      if (data && data.user) {
        setProfile({ username: data.user.user_metadata?.username || username });
        setNewUsername(data.user.user_metadata?.username || username);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  // Edit profile
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setNewUsername(profile.username);
    setError("");
  };
  // Save profile to Supabase
  const handleSave = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ data: { username: newUsername } });
    if (error) {
      setError(error.message);
    } else {
      setProfile({ ...profile, username: newUsername });
      setEditMode(false);
    }
    setLoading(false);
  };
  // Delete profile (simulate by removing username)
  const handleDelete = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ data: { username: "(deleted)" } });
    if (error) {
      setError(error.message);
    } else {
      setProfile({ username: "(deleted)" });
      setEditMode(false);
    }
    setLoading(false);
  };



  let content;
  content = (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
        padding: '2rem 1.2rem',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2d3e50',
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: '0.5rem',
        }}>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h2>
        <p style={{ textAlign: 'center', color: '#43c0e9', fontWeight: 500, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          Welcome, {profile.username}. You can manage your profile and see role-based options below.
        </p>

        <div style={{
          background: '#f7f7fa',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}>
          <h3 style={{ color: '#2d3e50', marginBottom: '0.7rem', fontSize: '1.1rem' }}>Profile</h3>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!editMode ? (
            <>
              <p style={{ fontSize: '1rem', marginBottom: '0.7rem' }}><b>Username:</b> {profile.username}</p>
              <button onClick={handleEdit} style={{
                marginRight: '0.7rem',
                background: '#43c0e9',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>Edit</button>
              <button onClick={handleDelete} style={{
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>Delete</button>
            </>
          ) : (
            <>
              <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} style={{
                padding: '0.4rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginRight: '0.7rem',
                fontSize: '1rem',
              }} />
              <button onClick={handleSave} style={{
                marginRight: '0.7rem',
                background: '#43c0e9',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>Save</button>
              <button onClick={handleCancel} style={{
                background: '#888',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>Cancel</button>
            </>
          )}
        </div>
        <div style={{
          background: '#f7f7fa',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
          padding: '1rem',
        }}>
          <h3 style={{ color: '#2d3e50', marginBottom: '0.7rem', fontSize: '1.1rem' }}>Role Options</h3>
          {role === 'admin' && (
            <>
              <ul style={{ fontSize: '1rem', color: '#2d3e50', paddingLeft: '1rem', marginBottom: '1rem' }}>
                <li>View all users</li>
                <li>Manage all items</li>
                <li>Approve/reject rentals</li>
              </ul>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <button style={{
                  background: '#43c0e9',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>Manage Users</button>
                <button style={{
                  background: '#43c0e9',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>Manage Items</button>
                <button style={{
                  background: '#43c0e9',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>Manage Rentals</button>
              </div>
            </>
          )}
          {role === 'owner' && (
            <>
              <ul style={{ fontSize: '1rem', color: '#2d3e50', paddingLeft: '1rem', marginBottom: '1rem' }}>
                <li>View your items</li>
                <li>Approve/reject rental requests</li>
                <li>See rental history</li>
              </ul>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <button style={{
                  background: '#43c0e9',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>Manage My Items</button>
                <button style={{
                  background: '#43c0e9',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>Manage Rental Requests</button>
              </div>
            </>
          )}
          {role === 'user' && (
            <ul style={{ fontSize: '1rem', color: '#2d3e50', paddingLeft: '1rem' }}>
              <li>View available items</li>
              <li>See your rentals</li>
              <li>Request new rentals</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  return <div className="dashboard-page">{content}</div>;
}

export default DashboardPage;
