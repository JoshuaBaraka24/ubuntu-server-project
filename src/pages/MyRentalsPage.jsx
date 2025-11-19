
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function MyRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      setError("");
      // Get current user profile ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("Unable to fetch user info.");
        setLoading(false);
        return;
      }
      // Fetch profile for current user
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();
      if (profileError || !profileData) {
        setError("Unable to fetch user profile.");
        setLoading(false);
        return;
      }
      // Fetch rentals for this profile using explicit foreign key joins
      const { data, error: rentalsError } = await supabase
        .from("rentals")
        .select(`*, item:items(*), renter:profiles!rentals_renter_id_fkey(username, role), owner:profiles!rentals_owner_id_fkey(username, role)`)
        .eq("renter_id", profileData.id)
        .order("created_at", { ascending: false });
      if (rentalsError) {
        setError(rentalsError.message);
      } else {
        setRentals(data || []);
      }
      setLoading(false);
    };
    fetchRentals();
  }, []);

  // Helper to calculate time left
  function getTimeLeft(timeLeftField) {
    // If you store time_left as text, just return it
    return timeLeftField || "N/A";
  }

  return (
    <div className="myrentals-page">
      <h2 style={{ textAlign: 'center', color: '#2d3e50', fontWeight: 700 }}>My Rentals</h2>
      {loading ? (
        <p>Loading your rentals...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : rentals.length === 0 ? (
        <p>You have no active or past rentals.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
          {rentals.map(rental => (
            <div key={rental.id} style={{
              background: '#f7f7fa',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              {rental.item && rental.item.image && (
                <img src={rental.item.image} alt={rental.item.name} style={{ height: '80px', width: 'auto', borderRadius: '8px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: '#2d3e50' }}>{rental.item?.name || 'Item'}</h3>
                <p style={{ color: '#555', margin: '0.5rem 0' }}>{rental.item?.description}</p>
                <p style={{ fontWeight: 'bold', color: '#4caf50', margin: 0 }}>${rental.item?.price} / day</p>
                <p style={{ margin: '0.5rem 0', color: '#43c0e9' }}>Time left: {getTimeLeft(rental.time_left)}</p>
                <p style={{ margin: 0, color: '#888' }}>Owner: {rental.owner?.username || 'N/A'} ({rental.owner?.role})</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, color: '#888', fontSize: '0.95rem' }}>Renter: {rental.renter?.username || 'N/A'} ({rental.renter?.role})</p>
                <p style={{ margin: 0, color: '#888', fontSize: '0.95rem' }}>Rented on<br />{new Date(rental.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default MyRentalsPage;
