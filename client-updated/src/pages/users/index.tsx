import React, { useContext } from 'react';
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridToolbar } from "@mui/x-data-grid/components";
import { WindowContext } from "../../context/WindowContextProvider";
import axiosIntance from '../../axiosInstance';
const columns: GridColDef[] = [
  { 
    field: 'username',
    headerName: 'Username',
    flex: 1,
  },
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'origin',
    align: 'left',
    headerAlign: 'left',
    headerName: 'Origin',
    type: 'string',
    
    flex: 1
  },
  {
    field: 'lastLogin',
    headerName: 'Last login',
    type: 'string'
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    sortable: false,
    width: 150
  },
];
const rows = [
  { id: 1, username: 'tmitev', name: "Tsvetan Mitev", origin: "Sofia, Bulgaria", lastLogin: "01-02-2022", role: "Admin" },
  { id: 2, username: 'vteneva', name: "Violeta Teneva", origin: "Sofia, Bulgaria", lastLogin: "22-02-2022", role: "Admin" },
  { id: 3, username: 'tstoyanov', name: "Trayan Stoyanov", origin: "Varna, Bulgaria", lastLogin: "22-02-2022", role: "Admin" },
];
interface IUser {
    id: string;
}
export const Users = () => {
  const { clientWidth } = useContext(WindowContext);
  const getUsers = async () => {
    const res = await axiosIntance.get<IUser[]>('/users');
    console.log(res, "RES")
  }
  React.useEffect(() => {
    getUsers();
    console.log("VEHICLES")
  }, [])
  console.log(clientWidth, "WIDTH")
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{marginBottom: 20, display: "flex", gap: 10}}>
        <Chip clickable onClick={handleClick} label="Loaded" variant="outlined" />
        <Chip clickable onClick={handleClick} label="Delivered" variant="outlined" />
      </div>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        onSelectionModelChange={itm => console.log(itm)}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5, 10, 20, 50]}
        checkboxSelection
      />
    </div>
    </Box>
  );
};
