import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/api";
import "../styles/search-users.css";

const SearchUsers = () => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "correo", headerName: "Correo", width: 200 },
    { field: "edad", headerName: "Edad", width: 150 },
    { field: "sexo", headerName: "Sexo", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 200 },
    { field: "profesion", headerName: "Profesión", width: 200 },
    { field: "provincia", headerName: "Provincia", width: 200 },
    { field: "canton", headerName: "Cantón", width: 200 },
  ];

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setTableData(data.detalle);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="content-filter">
      <h3 className="">Buscar Usuario</h3>
      <div className="button-box-filter">
        <Link to={"/"}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            hovered="medium"
          >
            Inicio
          </Button>
        </Link>
      </div>

      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={tableData}
          getRowId={(row) => row.telefono}
          columns={columns}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default SearchUsers;
