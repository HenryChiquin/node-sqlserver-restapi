import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function Expedientes() {
  // Estados para buscar y filtro (puedes conectar con backend después)
  const [searchText, setSearchText] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");

  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const handleSearchClick = () => {
    // lógica para buscar expedientes
    alert(`Buscar: ${searchText}, filtro: ${filterStatus}`);
  };

  const handleNuevoExpediente = () => {
    // lógica para nuevo expediente
    alert("Nuevo expediente");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Título y botón nuevo */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Expedientes
          </Typography>
          <Typography color="text.secondary">
            Gestión de expedientes DICRI
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleNuevoExpediente}>
          + Nuevo Expediente
        </Button>
      </Box>

      {/* Barra de búsqueda y filtro */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          size="small"
          placeholder="Buscar por número de caso, tipo de delito o fiscal..."
          value={searchText}
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={handleSearchClick}>
          Buscar
        </Button>

        <Select
          size="small"
          value={filterStatus}
          onChange={handleFilterChange}
          sx={{ minWidth: 180 }}
          displayEmpty
        >
          <MenuItem value="">Todos los estados</MenuItem>
          <MenuItem value="borrador">Borrador</MenuItem>
          <MenuItem value="revision">En revisión</MenuItem>
          <MenuItem value="aprobado">Aprobado</MenuItem>
          <MenuItem value="rechazado">Rechazado</MenuItem>
        </Select>
      </Paper>

      {/* Mensaje cuando no hay expedientes */}
      <Paper
        elevation={1}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 2,
          color: "text.secondary",
        }}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: 60, mb: 1 }} />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          No hay expedientes
        </Typography>
        <Typography gutterBottom>
          Comienza creando tu primer expediente
        </Typography>
        <Button variant="contained" onClick={handleNuevoExpediente}>
          + Crear Expediente
        </Button>
      </Paper>
    </Container>
  );
}
