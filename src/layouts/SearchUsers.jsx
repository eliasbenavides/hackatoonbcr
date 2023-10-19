import * as React from "react";
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
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
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
