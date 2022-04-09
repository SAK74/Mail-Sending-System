import "./subscriber.css";

function Subscriber({
  id,
  num,
  email,
  name,
  created,
  selected,
  handleCheck,
  pending
}) {
  const date = new Date(created).toLocaleDateString();
  return (
    <>
      {/* {num + 1}.  */}
      {email} {name}
      {/* <input
        type="checkbox"
        checked={!!selected}
        onChange={handleCheck}
        disabled={pending}
      /> */}
      {date}
    </>
  );
}

export default Subscriber;
