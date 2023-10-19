import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const SearchUsers = () => {

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 12,
  });

  return (
    <div>
      <h3>SearchUsers</h3>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>

      <Box sx={{ height: '80vh', width: '100%' }}>
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
          borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
          },
        }}
      />
    </Box>
    </div>
  );
};

export default SearchUsers;
