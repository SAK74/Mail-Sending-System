import { styled, TextField as MuiTextField } from '@mui/material';
import { useController } from 'react-hook-form';

export const TextField = styled(({ name, control, rules, ...rest }) => {
   // console.log("props: ", props);
   const { field:
      { ref, onChange, onBlur, value },
      fieldState:
      { invalid, error }
   } = useController({ name, control, rules, defaultValue: "" });
   return <MuiTextField {...rest}
      name={name}
      value={value}
      required
      size="small"
      label={name}
      error={invalid}
      helperText={invalid && error.message}
      inputRef={ref}
      inputProps={{ ...onBlur, onChange }}
   />
})(({ theme }) => {
   console.log("theme: ", theme);
   return {
      margin: theme.spacing(1)
   }
});