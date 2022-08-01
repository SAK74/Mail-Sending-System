import { Alert, Snackbar as MUISnackBar } from '@mui/material';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { hideSnack } from './snackBarSlice';

const SnackBar = () => {
   const { open, message, type } = useReduxSelector(state => state.snackBar);
   const { error } = useReduxSelector(state => state.subscribers);
   const text = error ? error : message;
   const dispatch = useReduxDispatch();
   const handleClose = () => dispatch(hideSnack());
   return <MUISnackBar
      open={open || !!error}
      key={text}
      transitionDuration={1000}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      children={<Alert
         children={text}
         severity={error ? 'error' : type}
         onClose={!error ? handleClose : undefined}
      />}
   />
}

export default SnackBar;