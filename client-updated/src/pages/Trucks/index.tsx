import React, { useContext, useRef } from 'react';
import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar } from "@mui/x-data-grid/components";
import { WindowContext } from "../../context/WindowContextProvider";
import axiosIntance from '../../axiosInstance';
import { GridActions, TRUCK_STATUSES } from '../../utils';
import { CommonDialog } from '../../components/CommonDialog';
import { TruckForm } from './TruckForm';
import { FormikProps } from 'formik';
import dayjs from 'dayjs';
import { ActionMenu } from '../../components/BasicTable/ActionMenu';
const columns: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
  { field: 'plateNumber', headerName: 'Plate number', flex: 1 },
  {
    field: 'truckCompany',
    align: 'left',
    headerAlign: 'left',
    headerName: 'Company',
    type: 'string',

    flex: 1
  },
  {
    field: 'expectedDate',
    headerName: 'Expected date',
    flex: 1,
    sortable: false,
    width: 150,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
  },
  {
    headerAlign: 'center',
    field: 'vehicles',
    sortable: false,
    align: "center",
    headerName: 'Vehicles',
    renderCell: (params: GridRenderCellParams<Date>) => (
      renderDetailsButton(params)
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
      renderActionsMenu(params)
    ),
  },
];
const renderActionsMenu = (params: GridRenderCellParams) => {
  return (
    <ActionMenu />
  )
}
const renderDetailsButton = (params: GridRenderCellParams) => {
  console.log(params, "PARAMS");
  const { row: truckData } = params;
  return (
    truckData.vehicles && truckData.vehicles.length
  )
}

export interface ITruck {
  id?: string;
  status?: TRUCK_STATUSES,
  plateNumber?: string,
  company?: string,
  expectedDate?: string;
  documents?: string[];
  vehicleIds?: string[];
}
export const Trucks = () => {
  const formRef = useRef<FormikProps<any>>(null);;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [trucks, setTrucks] = React.useState<ITruck[]>([]);
  const { clientWidth } = useContext(WindowContext);

  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const handleFormSubmit = () => {
    const { current: form } = formRef;
    console.log(formRef.current, "CURRENT")
    form?.validateForm();
    if (!form?.isValid) {
      form?.setErrors(form?.errors);
      return;
    }
    formRef.current?.handleSubmit();
    setOpen(!open);
  };
  const getTrucks = async () => {
    setLoading(true);
    const res = await axiosIntance.get<ITruck[]>('/trucks');
    setTrucks(res.data);
    setLoading(false);
  }
  React.useEffect(() => {
    getTrucks();
    console.log("VEHICLES")
  }, [])
  console.log(clientWidth, "WIDTH")

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  const handleSubmit = async (values: ITruck) => {
    setLoading(true);
    await axiosIntance.post<ITruck>('/trucks', { ...values });
    await getTrucks();
    setLoading(false);
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
            Add Truck
          </Button>
          <CommonDialog title="Add Truck" open={open} handleSubmit={handleFormSubmit} handleToggleOpen={handleToggleOpen}>
            <TruckForm formRef={formRef} handleSubmit={handleSubmit} />
          </CommonDialog>
        </div>
      </GridActions>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={loading}
          onSelectionModelChange={itm => console.log(itm)}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          disableSelectionOnClick
          rows={trucks}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};
