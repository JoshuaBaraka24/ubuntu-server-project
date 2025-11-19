import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function SignupPage({ setUsername }) {
  const [localUsername, setLocalUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: localUsername } }
      });
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
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={localUsername} onChange={e => setLocalUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignupPage;
