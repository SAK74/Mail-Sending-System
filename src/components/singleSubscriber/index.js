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
  // console.log(id);
  return (
    <div className="subscriber">
      {num + 1}. {email} {name}
      <input
        type="checkbox"
        checked={!!selected}
        onChange={handleCheck}
        disabled={pending}
      />
      {date}
    </div>
  );
}

export default Subscriber;
