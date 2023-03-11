import * as React from "react";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import { Button, Grid, MenuItem } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ITruck } from ".";
import { VehicleSelect } from "../../components/FormElements/VehicleSelect";
import { TRUCK_STATUSES } from "../../utils";
import { ThemeContext } from "../../context/theme-context";
interface TruckFormProps {
  handleToggleOpen?: () => void;
  handleSubmit: (values: any) => void;
  open?: boolean;
  formRef: any;
}
export const TruckForm: React.FC<TruckFormProps> = ({
  formRef,
  handleSubmit,
}) => {
  let validationSchema = object({
    plateNumber: string().required("Plate number is required"),
    status: string().required(),
  });
  const truckValues: ITruck = {
    vehicleIds: []
  };
  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      innerRef={formRef}
      initialValues={truckValues}
      onSubmit={async (values: ITruck) => {
        handleSubmit(values);
      }}
    >

      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        touched,
        errors,
      }) => (
        <Form autoComplete='off'>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="plateNumber"
                name="plateNumber"
                label="Plate Number"
                value={values.plateNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.plateNumber && Boolean(errors.plateNumber)}
                helperText={touched.plateNumber && errors.plateNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <VehicleSelect value={values.vehicleIds} />
            </Grid>
            <Grid item xs={12} md={6}>
              
              <TextField
                select
                size="small"
                fullWidth
                id="status"
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                error={touched.status && Boolean(errors.status)}              >
                <MenuItem value={TRUCK_STATUSES.AVAILABLE}>{TRUCK_STATUSES.AVAILABLE}</MenuItem>
                <MenuItem value={TRUCK_STATUSES.ASSIGNED}>{TRUCK_STATUSES.ASSIGNED}</MenuItem>
                <MenuItem value={TRUCK_STATUSES.LOADED}>{TRUCK_STATUSES.LOADED}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                select
                size="small"
                fullWidth
                id="company"
                name="company"
                label="Truck Company"
                value={values.company}
                onChange={handleChange}
                error={touched.company && Boolean(errors.company)}
            ></TextField>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} md={6}>
                <DesktopDatePicker
                  // fullWidth
                  label="Expected date"
                  inputFormat="MM/DD/YYYY"
                  value={values.expectedDate}
                  onChange={(value) => {
                    setFieldValue("expectedDate", value)
                  }}

                  renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
                {/* <MobileDatePicker
                  label="Expected date"
                  inputFormat="MM/DD/YYYY"
                  value={values.expectedDate}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload CMR
                  <input
                    type="file"
                    hidden
                  />
                </Button>
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Form>
      )}
    </Formik>

  );
};
