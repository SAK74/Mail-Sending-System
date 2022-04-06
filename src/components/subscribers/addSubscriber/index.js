// import "./addSubscriber.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import validator from "validator";
import { addItem } from "../../../features/makeAirtableRequest";
import { _addSubscriber } from "../../../pages/subscribers/subscribersSlice";
import { Add } from "./styled";

function AddSubscriber() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm({
    mode: "onChange"
  });
  const onSubmit = async (data) => {
    await addItem("subscribers")(data)
      .then((data) => {
        reset();
        dispatch(_addSubscriber(data));
      });
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
        {isSubmitSuccessful && !isSubmitting && (
          <div>Subscriber added successfully!</div>
        )}
      </form>
    </Add>
  );
}

export default AddSubscriber;
