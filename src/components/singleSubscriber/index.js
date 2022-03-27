import "./subscriber.css";

function Subscriber({ id, num, email, name, created, selected, handleCheck }) {
  const date = new Date(created).toLocaleDateString();
  return (
    <div className="subscriber">
      {num + 1}. {email} {name}
      <input type="checkbox" checked={selected} onChange={handleCheck} />
      {date}
    </div>
  );
}

export default Subscriber;