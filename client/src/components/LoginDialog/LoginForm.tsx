import { Button, DialogActions, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
interface LoginFormProps {
    handleDialogClose: () => void;
}
const validationSchema = object({
    username: string().required("Username is required"),
    password: string().required("Password is required"),
  });
export const LoginForm: React.FC<LoginFormProps> = ({handleDialogClose}) => {
  const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    //setOpen(false);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        console.log(values, "VALUES")
        handleDialogClose();
      }}
    >

      {({
        values,
        handleChange,
        touched,
        handleBlur,
        errors,
      }) => (

        <Form autoComplete='off'>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <TextField
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="username"
                name="username"
                label="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="password"
                size="small"
                fullWidth
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password" 
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
            />
            </Grid>
          </Grid>
          <DialogActions>
          <Button variant="contained" type="submit" autoFocus onClick={() => {}}>
            Login
          </Button>
        </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
