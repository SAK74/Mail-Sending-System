// import "./addSubscriber.css";
import { useForm } from "react-hook-form";
import validator from "validator";
import { addSubscriber } from "../../features/makeAirtableRequest";

import { Add } from "./styled";

function AddSubscriber() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm({
    mode: "all"
  });
  const onSubmit = async (data) => {
    console.log(data);
    await addSubscriber({ fields: data })
      .then(() => reset())
      .finally(() => {});
  };
  return (
    <Add>
      <h3>Add subscriber</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input {...register("name", { required: "Name is required!" })} />
        </label>
        {errors?.name && <div className="error">{errors.name.message}</div>}
        <label>
          E-mail:
          <input
            {...register("email", {
              validate: (val) => validator.isEmail(val) || "Wrong E-mail format"
            })}
          />
        </label>
        {errors?.email && <div className="error">{errors.email.message}</div>}
        <button type="submit">Dodaj</button>
        {isSubmitting && <div>Pending</div>}
        {isSubmitSuccessful && !isSubmitting && <div>Subscriber added!</div>}
      </form>
    </Add>
  );
}

export default AddSubscriber;
