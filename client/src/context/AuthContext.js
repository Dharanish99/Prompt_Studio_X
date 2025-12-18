import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. SETUP AXIOS DYNAMICALLY
  // This ensures we use the correct URL even if the global default wasn't set
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  // Configure a specific instance for auth calls
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Crucial for passing the cookie back
  });

  const checkAuth = async () => {
    try {
      // 2. CALL THE ENDPOINT
      console.log("🔍 Checking Auth at:", `${API_URL}/auth/me`);
      const res = await api.get("/auth/me");
      
      if (res.data) {
        console.log("✅ User Found:", res.data.email);
        setUser(res.data);
      }
    } catch (err) {
      // It's normal to get a 401 if not logged in
      console.log("⚠️ No active session found.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check immediately on mount
    checkAuth();

    // Check again when the window gains focus (e.g. returning from Google Login)
    const handleFocus = () => {
       // Small delay to allow cookie to settle
       setTimeout(checkAuth, 500);
    };
    
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};