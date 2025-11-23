import './App.css'
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Expediente from "./components/Expediente";

function App() {
  // Guardar rol tras login
  // Aquí ejemplo fijo para demo
  const name = localStorage.getItem("name") || "";
const namerol = localStorage.getItem("namerol") || "";

  const [user, setUser] = useState({
    role: namerol, // cambia a "tecnico" o "coordinador" para probar acceso
    name: name,
  });

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route
          path="/dashboard"
          
          element={
            user.role ? (
              <Dashboard role={user.role} userName={user.name} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/Expediente" element={<Expediente/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
