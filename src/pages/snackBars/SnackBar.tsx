import { Alert, Snackbar as MUISnackBar } from '@mui/material';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { hideSnack } from './snackBarSlice';

const SnackBar = () => {
   const { open, message, type } = useReduxSelector(state => state.snackBar);
   const { error: subscrErr } = useReduxSelector(state => state.subscribers);
   const { error: mailsError } = useReduxSelector(state => state.mails);
   const isError = subscrErr || mailsError;
   const text = subscrErr ? subscrErr :
      mailsError ? mailsError : message;
   const dispatch = useReduxDispatch();
   const handleClose = () => dispatch(hideSnack());
   return <MUISnackBar
      open={open || !!isError}
      key={text}
      transitionDuration={1000}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      children={<Alert
         children={text}
         severity={isError ? 'error' : type}
         onClose={!isError ? handleClose : undefined}
      />}
   />
}

export default SnackBar;