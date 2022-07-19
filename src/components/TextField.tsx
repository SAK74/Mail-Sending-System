import { BaseTextFieldProps, styled, TextField as MuiTextField } from '@mui/material';
import { ReactElement } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { MailFormValues } from './MailEditor';
import { SubscriberFormValues } from './subscribers/AddSubscriber';

type FormValues = SubscriberFormValues | MailFormValues;
interface UserTextFieldProps<FV> extends Omit<BaseTextFieldProps, 'name' | "defaultValue">,
   UseControllerProps<FV> { };

const StyledField = styled(MuiTextField)(({ theme }) => ({
   margin: theme.spacing(1)
}));

export const CustomTextField: <FV extends FormValues>(props: UserTextFieldProps<FV>) => ReactElement =
   ({ name, control, rules, ...otherParams }) => {
      const { field: { ref, ...otherFieldParams }, fieldState: { error, invalid } } = useController({ name, control, rules });
      return <StyledField
         {...{ ...otherFieldParams, ...otherParams, name }}
         label={name.replace(/^\w/, l => l.toUpperCase())}
         error={invalid}
         helperText={error?.message}
         inputRef={ref}
         size='small'
      />
   }
