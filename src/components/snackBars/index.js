import { Alert, Snackbar as MUISnackBar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnack } from './snackBarSlice';

const SnackBar = () => {
   const { open, message, type } = useSelector(state => state.snackBar);
   const dispatch = useDispatch();
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