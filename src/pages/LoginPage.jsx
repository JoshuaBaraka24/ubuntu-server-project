import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function LoginPage({ setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        // Force refresh user metadata from Supabase
        const { data: userData } = await supabase.auth.getUser();
        let username = "";
        if (userData.user && userData.user.user_metadata && userData.user.user_metadata.username) {
          username = userData.user.user_metadata.username;
        } else if (userData.user && userData.user.email) {
          username = userData.user.email.split("@")[0];
        }
        // Capitalize first letter
        if (username) {
          username = username.charAt(0).toUpperCase() + username.slice(1);
        }
        setUsername(username);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
