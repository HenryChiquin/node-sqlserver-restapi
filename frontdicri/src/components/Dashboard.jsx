import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;
  // const email = localStorage.getItem("email") || "";
  // const idrol = localStorage.getItem("idrol") || "";
  // const iduser = localStorage.getItem("iduser") || "";
const name = localStorage.getItem("name") || "";
const namerol = localStorage.getItem("namerol") || "";
  // const phone = localStorage.getItem("phone") || "";
  // const username = localStorage.getItem("username") || "";

const cardsData = [
  {
    title: "Total Expedientes",
    value: 7,
    icon: <DescriptionIcon color="primary" fontSize="large" />,
  },
  {
    title: "En Borrador",
    value: 3,
    icon: <AccessTimeIcon sx={{ color: "grey.600" }} fontSize="large" />,
  },
  {
    title: "En Revisión",
    value: 0,
    icon: (
      <AssignmentLateIcon
        sx={{ color: "warning.main", backgroundColor: "#FFF9C4", borderRadius: 1, p: 0.5 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Aprobados",
    value: 3,
    icon: (
      <CheckCircleIcon
        sx={{ color: "success.main", backgroundColor: "#C8E6C9", borderRadius: 1, p: 0.5 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Rechazados",
    value: 1,
    icon: (
      <CancelIcon
        sx={{ color: "error.main", backgroundColor: "#FFCDD2", borderRadius: 1, p: 0.5 }}
        fontSize="large"
      />
    ),
  },
  {
    title: "Usuarios",
    value: 3,
    icon: <GroupIcon sx={{ color: "purple" }} fontSize="large" />,
  },
];


function Dashboard({ role = namerol, userName = name}) {
  // role puede ser: admin, tecnico, coordinador

  // Menu items con control de acceso
  const menuItems = [
    { text: "Dashboard", key: "dashboard", roles: ["ADMIN", "tecnico", "coordinador"] },
    { text: "Expedientes", key: "expedientes", roles: ["ADMIN", "tecnico", "coordinador"], path: "/Expediente" },
    { text: "Usuarios", key: "usuarios", roles: ["ADMIN"] },
  ];

  // Filtrar menú por rol
  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", bgcolor: "#1e2a47", color: "#fff" },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DescriptionIcon />
            DICRI
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, opacity: 0.8 }}>
            Sistema de Evidencias
          </Typography>

          <List>
            {filteredMenu.map(({ text, key,path }) => (
              <ListItem button key={key} sx={{ color: "white", mb: 1, borderRadius: 1, "&.Mui-selected": { bgcolor: "#1E5EFF" } }} onClick ={()=> navigate(path)} >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8, textTransform: "capitalize" }}>
            {role}
          </Typography>
          <Button variant="outlined" color="inherit" size="small" fullWidth>
            Cerrar Sesión
          </Button>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#ffffffff", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="black">
          Bienvenido, {userName}
        </Typography>
        <Typography variant="body1" color="black" gutterBottom sx={{ mb: 4 } }>
          {role === "admin" && "Administrador - Dirección de Investigación Criminalística"}
          {role === "tecnico" && "Técnico - Dirección de Investigación Criminalística"}
          {role === "coordinador" && "Coordinador - Dirección de Investigación Criminalística"}
        </Typography>

        {/* Tarjetas resumen */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {cardsData.map(({ title, value, icon }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Card sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 5, borderRadius: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {title}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color={value === 0 ? "warning.main" : undefined}>
                    {value}
                  </Typography>
                </Box>
                <Box>{icon}</Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Secciones de texto */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#275bafff",
                borderRadius: 2,
                p: 3,
                minHeight: 180,
                boxShadow: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Flujo de Trabajo
              </Typography>
              <Typography variant="body2" component="div" sx={{ lineHeight: 1.6 }}>
                <strong>1. Borrador:</strong> Técnico crea y registra indicios
                <br />
                <strong>2. Revisión:</strong> Coordinador revisa el expediente
                <br />
                <strong>3. Aprobado/Rechazado:</strong> Coordinador toma decisión
                <br />
                <strong>4. Corrección:</strong> Técnico corrige si fue rechazado
              </Typography>
            </Box>
          </Grid>

          {role === namerol && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#a587bdff",
                  borderRadius: 2,
                  p: 3,
                  minHeight: 180,
                  boxShadow: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="black">
                  Administración
                </Typography>
                <Typography component="ul" sx={{ pl: 3 }}>
                  <li>Gestiona usuarios del sistema</li>
                  <li>Supervisa todos los expedientes</li>
                  <li>Acceso completo a funcionalidades</li>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
