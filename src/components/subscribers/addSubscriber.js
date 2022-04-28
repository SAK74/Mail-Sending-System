import { Button, CircularProgress, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import validator from "validator";
import { _addSubscriber } from "../../pages/subscribers/subscribersSlice";
import { memo } from 'react';
import { TextField } from './elements';
import { handleAdd } from "../../handlers";
import { useDispatch } from "react-redux";
import { showSnack } from "../snackBars/snackBarSlice";

function AddSubscriber() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm({
    mode: "all"
  });
  const onSubmit = async (data) => {
    await handleAdd("subscribers")(data)
      .then(() => {
        reset();
        dispatch(showSnack({ message: "Subscriber has been added successfully!", type: "info" }));
      });
  };
  return (
    <Paper sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          name="name"
          required
          control={control}
          rules={{ required: "Name is required!" }} />
        <TextField
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
