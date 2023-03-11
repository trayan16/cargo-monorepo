import React, { useContext } from 'react';
import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar } from "@mui/x-data-grid/components";
import { WindowContext } from "../../context/WindowContextProvider";
import axiosIntance from '../../axiosInstance';
import { VehicleForm } from './VehicleForm';
import { CommonDialog } from '../../components/CommonDialog';
import { GridActions } from '../../utils';
import { ActionMenu } from '../../components/BasicTable/ActionMenu';

const columns: GridColDef[] = [
  { field: 'vehicle', headerName: 'Vehicle', flex: 1, },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'origin',
    align: 'left',
    headerAlign: 'left',
    headerName: 'Origin',
    type: 'string',
    
    flex: 1
  },
  {
    field: 'created',
    headerName: 'Created',
    flex: 1,
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150
  },
  {
    field: 'destination',
    headerName: 'Destination',
    type: 'string'
  },
  {
    field: 'date',
    sortable: false,
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerName: 'Actions',
    renderCell: (params: GridRenderCellParams<Date>) => (
      renderDetailsButton(params)
    ),
  },
];
const renderDetailsButton = (params: any) => {
  return (
      <ActionMenu />
  )
}
const rows = [
  { id: 1, status: 'Dispatched', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 2, status: 'Dispatched', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 3, status: 'Dispatched', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 4, status: 'Dispatched', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 5, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 6, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 7, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 8, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 123, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 45, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 675, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 686, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 123123, status: 'Delivered', vehicle: 'VW GOLF GTI 2020', origin: "Texas", created: "01-02-2022", destination: "Hamburg" },
  { id: 1236, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Dubai" },
  { id: 67, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 865, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 23423, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 123, status: 'Delivered', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 454, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
  { id: 12332, status: 'At Terminal', vehicle: 'BMW X3 2020', origin: "Texas", created: "01-02-2022", destination: "Rotterdam" },
];
export const Vehicles = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const { clientWidth } = useContext(WindowContext);
  const getVehicles = async () => {
    const res = await axiosIntance.get('/trucks');
    console.log(res, "RES")
  }
  React.useEffect(() => {
    getVehicles();
    console.log("VEHICLES")
  }, [])
  console.log(clientWidth, "WIDTH")
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GridActions>
        <div>
          <Chip clickable onClick={handleClick} label="All" variant="outlined" />
          <Chip clickable onClick={handleClick} label="Delivered" variant="outlined" />
          <Chip clickable onClick={handleClick} label="At Terminal" variant="outlined" />
          <Chip clickable onClick={handleClick} label="Dispatched" variant="outlined" />
          <Chip clickable onClick={handleClick} label="Loaded" variant="outlined" />
        </div>
        <div>
          <Button variant="contained" onClick={handleToggleOpen}>
            Add Vehicle
          </Button>
          <CommonDialog title="Add Vehicle" open={open} handleToggleOpen={handleToggleOpen}>
            <VehicleForm />
          </CommonDialog>
        </div>
      </GridActions>
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
