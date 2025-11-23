
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  InputAdornment,
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/login", {
        User,
        Password,
      });
        console.log("Respuesta del backend:", response.data);      
        const { CORREO,IDROL,IDUSER,NOMBRECOMPLETO,NOMBRE_ROL,TELEFONO,USUARIO} = response.data;
        localStorage.setItem("email", CORREO);
        localStorage.setItem("idrol", IDROL);
        localStorage.setItem("iduser", IDUSER);
        localStorage.setItem("name", NOMBRECOMPLETO);
        localStorage.setItem("namerol", NOMBRE_ROL);
        localStorage.setItem("phone", TELEFONO);
        localStorage.setItem("username", USUARIO);
        
      
      navigate("/dashboard");

    } catch (error) {
         console.error(error);     // ahora sí se usa
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{        
        background: "linear-gradient(135deg, #0f1c2e, #1f2b3b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#1E5EFF",
            width: 72,
            height: 72,
            margin: "0 auto",
            mb: 2,
          }}
        >
          <FolderIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Typography variant="h5" fontWeight="bold">
          DICRI
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Sistema de Gestión de Evidencias
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ministerio Público de Guatemala
        </Typography>

        <TextField
          fullWidth
          label="Correo Electrónico"
          type="User"
          margin="normal"
          value={User}
          onChange={(e) => setUser(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="Password"
          margin="normal"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, bgcolor: "#1E5EFF" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>

        {/* Cuadro inferior */}
        <Box
          sx={{
            bgcolor: "#f3f7ff",
            borderRadius: 2,
            p: 2,
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography fontWeight="bold">Usuarios de prueba:</Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            admin@mp.gob.gt | tecnico@mp.gob.gt | coordinador@mp.gob.gt
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Contraseña: <b>password123</b>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
