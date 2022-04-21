import { Button, CircularProgress, Paper, Snackbar, } from "@mui/material";
import { useForm } from "react-hook-form";
import validator from "validator";
import { _addSubscriber } from "../../../pages/subscribers/subscribersSlice";
import AddIcon from "@mui/icons-material/Send";
import { memo, useState } from 'react';
import { TextField } from '../elements/TextField';
import { handleAdd } from "../../../handlers";

function AddSubscriber() {
  const [open, setOpen] = useState(false);
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
        setOpen(true);
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
        <Snackbar
          open={open}
          message="Subscriber has been added successfully!"
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          transitionDuration={1000}
        />
      </form>
    </Paper>
  );
}

export default memo(AddSubscriber);
