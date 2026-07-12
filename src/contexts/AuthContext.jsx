// src/contexts/AuthContext.jsx
import { useState } from "react";

import { USERS } from "../data";

import { AuthContext } from "./AuthContextInstance";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const persistedUser = localStorage.getItem("budget_tracker_user");
      return persistedUser ? JSON.parse(persistedUser) : null;
    } catch (error) {
      console.error("Failed to parse persisted user state:", error);
      return null;
    }
  });

  const login = (username, password) => {
    const foundUser = USERS.find(
      (u) =>
        u.username === username.toLowerCase().trim() && u.password === password,
    );
    if (!foundUser) return false;

    const sessionUser = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
      name: foundUser.name,
    };

    setUser(sessionUser);

    localStorage.setItem("budget_tracker_user", JSON.stringify(sessionUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("budget_tracker_user");
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
