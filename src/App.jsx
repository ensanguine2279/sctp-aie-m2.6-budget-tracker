// src/App.jsx
import { AuthProvider } from "./contexts/AuthContext";

import ApplicationShell from "./components/ApplicationShell";

export default function App() {
  return (
    <AuthProvider>
      <ApplicationShell />
    </AuthProvider>
  );
}
