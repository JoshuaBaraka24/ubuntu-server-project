import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ItemViewPage from "./pages/ItemViewPage";
import MyRentalsPage from "./pages/MyRentalsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { supabase } from "./supabaseClient";

function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      let username = "";
      let role = "user";
      if (user && user.user_metadata && user.user_metadata.username) {
        username = user.user_metadata.username;
      } else if (user && user.email) {
        username = user.email.split("@")[0];
        username = username.charAt(0).toUpperCase() + username.slice(1);
      }
      if (user && user.user_metadata && user.user_metadata.role) {
        role = user.user_metadata.role;
      }
      setUsername(username);
      setRole(role);
    };
    getUser();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      let username = "";
      let role = "user";
      if (session && session.user && session.user.user_metadata && session.user.user_metadata.username) {
        username = session.user.user_metadata.username;
      } else if (session && session.user && session.user.email) {
        username = session.user.email.split("@")[0];
        username = username.charAt(0).toUpperCase() + username.slice(1);
      }
      if (session && session.user && session.user.user_metadata && session.user.user_metadata.role) {
        role = session.user.user_metadata.role;
      }
      setUsername(username);
      setRole(role);
      setShowWelcome(true);
      if (username) {
        setTimeout(() => setShowWelcome(false), 30000);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar username={username} showWelcome={showWelcome} />
      <Routes>
        <Route path="/" element={<HomePage username={username} showWelcome={showWelcome} />} />
        <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/signup" element={<SignupPage setUsername={setUsername} />} />
        <Route path="/dashboard" element={<DashboardPage username={username} role={role} />} />
        <Route path="/items" element={<ItemViewPage />} />
        <Route path="/myrentals" element={<MyRentalsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
