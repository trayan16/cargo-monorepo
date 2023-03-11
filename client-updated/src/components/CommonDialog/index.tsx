import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import styled from 'styled-components';
const DialogContainer = styled.div`
  padding: 20px;
`;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface CommonDialogProps {
    handleToggleOpen: () => void;
    handleSubmit?: () => void;
    children?: React.ReactNode
    open: boolean;
    title?: string;
  }
export const CommonDialog: React.FC<CommonDialogProps> = ({open, title, handleToggleOpen, children, handleSubmit}) => {

  return (
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleToggleOpen}
        TransitionComponent={Transition}
      >
        <AppBar  sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              sx={{ boxShadow: 3 }}
              edge="start"
              color="inherit"
              onClick={handleToggleOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button sx={{ boxShadow: 5 }} autoFocus color="inherit" onClick={handleSubmit}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContainer>
          {children}
        </DialogContainer>
      </Dialog>

  );
}