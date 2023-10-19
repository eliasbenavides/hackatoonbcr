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

  return (
    <div>
      <h3>SearchUsers</h3>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>

      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={tableData}
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
