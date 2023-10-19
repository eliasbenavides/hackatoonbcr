import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/api";

const SearchUsers = () => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "correo", headerName: "Correo", width: 300 },
    { field: "edad", headerName: "Edad", width: 200 },
    { field: "sexo", headerName: "Sexo", width: 200 },
    { field: "telefono", headerName: "Teléfono", width: 300 },
    { field: "profesion", headerName: "Profesión", width: 300 },
    { field: "provincia", headerName: "Provincia", width: 300 },
    { field: "canton", headerName: "Cantón", width: 300 },
  ];

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchUsers();
  }, []);
=======
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Box, Button, Divider } from "@mui/material";
import "./../styles/search-users.css";

const SearchUsers = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 12,
  });
>>>>>>> bdd881b44c0386bb06c700afc036aa970f01e241

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
<<<<<<< HEAD
          rows={tableData}
          columns={columns}
=======
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
>>>>>>> bdd881b44c0386bb06c700afc036aa970f01e241
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
