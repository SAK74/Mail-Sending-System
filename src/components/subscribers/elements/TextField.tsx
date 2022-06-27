import { BaseTextFieldProps, styled, TextField as MuiTextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { MailFormValues } from '../../mailEditor';
import { SubscriberFormValues } from '../addSubscriber';

type FormValues = SubscriberFormValues | MailFormValues;
interface UserTextFieldProps extends Omit<BaseTextFieldProps, 'name' | "defaultValue">,
   UseControllerProps<FormValues> { };

export const TextField = styled(({ name, control, rules, ...rest }: UserTextFieldProps) => {
   const { field:
      { ref, onChange, onBlur, value },
      fieldState:
      { invalid, error }
   } = useController<FormValues>({ name, control, rules, defaultValue: "" });
   return <MuiTextField {...rest}
      {...{ name, value }}
      // required
      size="small"
      label={name.replace(/^\w/, l => l.toUpperCase())}
      error={invalid}
      helperText={invalid && error?.message}
      inputRef={ref}
      inputProps={{ onBlur, onChange }}
   />
})(({ theme }) => {
   // console.log("theme: ", theme);
   return {
      margin: theme.spacing(1)
   }
});