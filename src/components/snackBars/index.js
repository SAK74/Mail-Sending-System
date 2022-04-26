import { Snackbar as MUISnackBar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnack } from './snackBarSlice';

const SnackBar = () => {
   const { open, message } = useSelector(state => state.snackBar);
   const dispatch = useDispatch();
   return <MUISnackBar
      open={open}
      message={message}
      key={message}
      transitionDuration={1000}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => dispatch(hideSnack())}
   />
}

export default SnackBar;