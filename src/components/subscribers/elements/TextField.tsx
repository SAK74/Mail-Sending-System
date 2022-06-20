import { BaseTextFieldProps, styled, TextField as MuiTextField } from '@mui/material';
import { Control, Path, useController, RegisterOptions } from 'react-hook-form';
// import { MailFormValues } from '../../mailEditor';
import { SubscriberFormValues } from '../addSubscriber';

type FormValues = SubscriberFormValues;
interface UserTextFieldProps extends Omit<BaseTextFieldProps, 'name'> {
   control: Control<FormValues>;
   name: Path<FormValues>;
   rules: Exclude<RegisterOptions<FormValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

export const TextField = styled(({ name, control, rules, ...rest }: UserTextFieldProps) => {
   const { field:
      { ref, onChange, onBlur, value },
      fieldState:
      { invalid, error }
   } = useController<FormValues>({ name, control, rules, defaultValue: "" });
   return <MuiTextField {...rest}
      name={name}
      value={value}
      // required
      size="small"
      label={name}
      error={invalid}
      helperText={invalid && error?.message}
      inputRef={ref}
      inputProps={{ ...onBlur, onChange }}
   />
})(({ theme }) => {
   // console.log("theme: ", theme);
   return {
      margin: theme.spacing(1)
   }
});