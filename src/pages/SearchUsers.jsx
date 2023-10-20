import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/api";
import "../styles/search-users.css";

const SearchUsers = () => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "correo", headerName: "Correo", width: 120 },
    { field: "edad", headerName: "Edad", width: 110 },
    { field: "sexo", headerName: "Sexo", width: 110 },
    { field: "telefono", headerName: "Teléfono", width: 130 },
    { field: "profesion", headerName: "Profesión", width: 130 },
    {
      field: "ubicacion",
      headerName: "Ubicación",
      width: 150,
      valueGetter: (params) => {
        return `${params.row.provincia}, ${params.row.canton}`;
      },
    },
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
            hovered="large"
          >
            Inicio
          </Button>
        </Link>
      </div>

      <div>
        <Box sx={{ height: "80vh", width: "100%" }} className="table-content">
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
    </div>
  );
};

export default SearchUsers;
