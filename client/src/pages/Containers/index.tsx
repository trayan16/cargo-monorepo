import React, { useContext } from 'react';
import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar } from "@mui/x-data-grid/components";
import { WindowContext } from "../../context/WindowContextProvider";
import axiosIntance from '../../axiosInstance';
import { GridActions, TRUCK_STATUSES } from '../../utils';
import { CommonDialog } from '../../components/CommonDialog';
import { ContainerForm } from './ContainerForm';
import { ActionMenu } from '../../components/BasicTable/ActionMenu';
const columns: GridColDef[] = [
  { 
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
  { field: 'containerNumber', headerName: 'Container number', flex: 1 },
  {
    field: 'shippingLine',
    align: 'left',
    headerAlign: 'left',
    headerName: 'Shipping line',
    type: 'string',
    
    flex: 1
  },
  {
    field: 'expectedDate',
    headerName: 'Expected date',
    flex: 1,
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150
  },
  {
    field: 'vehicles',
    sortable: false,
    flex: 1,
    headerName: 'Loaded vehicles',
    renderCell: () => (
        Math.floor(Math.random() * 10)
    ),
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
interface IContainer {
    id: string;
    status: TRUCK_STATUSES,
    containerNumber: string,
    shippingLine: string,
    expectedDate: string;
    documents: string[];
    vehicles: string[];
  }
const renderDetailsButton = (params: any) => {
  return (
      <ActionMenu />
  )
}
const rows: IContainer[] = [
    { id: "1", status: TRUCK_STATUSES.AVAILABLE, containerNumber: "CB2222AM", shippingLine: "Vin Trade", expectedDate: "01-02-2022", documents: ["CRM"], vehicles: ["CRM"] },
    { id: "2", status: TRUCK_STATUSES.AVAILABLE, containerNumber: "B2222AM", shippingLine: "Alco Impex", expectedDate: "01-02-2022", documents: ["CRM"], vehicles: ["CRM"] },
    { id: "3", status: TRUCK_STATUSES.LOADED, containerNumber: "A2222AM", shippingLine: "Smart", expectedDate: "01-02-2022", documents: ["CRM"], vehicles: ["CRM"] },
  ];
export const Containers = () => {
  const [open, setOpen] = React.useState(false);
  const { clientWidth } = useContext(WindowContext);
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const getContainers = async () => {
    const res = await axiosIntance.get('/containers');
    console.log(res, "RES")
  }
  React.useEffect(() => {
    getContainers();
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
            Add Container
          </Button>
          <CommonDialog title="Add Container" open={open} handleToggleOpen={handleToggleOpen}>
            <ContainerForm />
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
