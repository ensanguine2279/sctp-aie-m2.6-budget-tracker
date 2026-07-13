// src/contexts/AuthContext.jsx
import { useState } from "react";

import { USERS } from "../data";

import { AuthContext } from "./AuthContextInstance";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const rememberedUser = localStorage.getItem("budget_tracker_user");
      if (rememberedUser) return JSON.parse(rememberedUser);

      const sessionUser = sessionStorage.getItem("budget_tracker_user");
      if (sessionUser) return JSON.parse(sessionUser);

      return null;
    } catch (e) {
      return null;
    }
  });

  // Accept the rememberMe boolean to route the session data correctly
  const login = (username, password, rememberMe) => {
    const found = USERS.find(
      (u) =>
        u.username === username.toLowerCase().trim() && u.password === password,
    );
    if (!found) return false;

    const sessionUser = {
      id: found.id,
      username: found.username,
      role: found.role,
      name: found.name,
    };
    setUser(sessionUser);

    // Explicit storage routing based on user preference
    if (rememberMe) {
      localStorage.setItem("budget_tracker_user", JSON.stringify(sessionUser));
    } else {
      sessionStorage.setItem(
        "budget_tracker_user",
        JSON.stringify(sessionUser),
      );
    }
    return true;
  };

  // Clean up both buckets on logout to avoid identity leakage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("budget_tracker_user");
    sessionStorage.removeItem("budget_tracker_user");
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
