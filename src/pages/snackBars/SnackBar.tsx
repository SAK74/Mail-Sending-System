import { Alert, Snackbar as MUISnackBar } from '@mui/material';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { hideSnack } from './snackBarSlice';

const SnackBar = () => {
   const { open, message, type } = useReduxSelector(state => state.snackBar);
   const dispatch = useReduxDispatch();
   const handleClose = () => dispatch(hideSnack());
   return <MUISnackBar
      open={open}
      key={message}
      transitionDuration={1000}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      children={<Alert
         children={message}
         severity={type}
         onClose={handleClose}
      />}
   />
}

export default SnackBar;