import { Button, CircularProgress, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Send";
import { SubmitHandler, useForm } from "react-hook-form";
import validator from "validator";
import { memo } from 'react';
import { CustomTextField } from './elements';
import { handleAdd } from "../../handlers";
import { showSnack } from "../snackBars/snackBarSlice";
import { Subscriber } from "../../types";
import { useReduxDispatch } from "../../store";

export type SubscriberFormValues = Omit<Subscriber['fields'], "selected">

function AddSubscriber() {
  const dispatch = useReduxDispatch();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm<SubscriberFormValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: ""
    }
  });
  const onValid: SubmitHandler<SubscriberFormValues> = async (data) => {
    await handleAdd("subscribers")(data)
      .then(() => {
        reset();
        dispatch(showSnack({ message: "Subscriber has been added successfully!", type: "info" }));
      });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <CustomTextField
          name="name"
          required
          control={control}
          rules={{ required: "Name is required!" }} />
        <CustomTextField
          name="email"
          required
          control={control}
          rules={{ required: "E-mail is required!", validate: (val) => validator.isEmail(val) || "Wrong E-mail format" }}
        />
        <Button
          variant="outlined"
          type="submit"
          children="Add"
          endIcon={isSubmitting ? <CircularProgress size={15} /> : <AddIcon />}
          size="small"
          sx={{ ml: 8 }}
        />
      </form>
    </Paper>
  );
}

export default memo(AddSubscriber);
