import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSubscribers, fetchSubscribers, updateSubscriber } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import Subscriber from "../singleSubscriber";
import { selectAll, updateChecked, _deleteSubscribers } from "../subscribersSlice";
import { Container } from "./container";

function Subscribers() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const { status } = useSelector((state) => state.subscribers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "iddle") {
      dispatch(fetchSubscribers());
    }
  }, []); //eslint-disable-line
  const subscribers = useSelector(selectAll);
  console.log(subscribers);

  const handleCheck = ({ target: { checked } }, id) => {
    setPending(true);
    updateSubscriber(id, {
      fields: {
        selected: checked
      }
    })
      .then((data) => {
        console.log(data);
        dispatch(updateChecked(data));
      })
      .finally(() => setPending(false));
  };
  const selectedSubscr = useMemo(() => subscribers
    .filter((subsc) => subsc.fields.selected)
  )
  const handleDelSelected = () => {
    setPending(true);
    deleteSubscribers(selectedSubscr.map((subsc) => subsc.id))
      .then((data) =>
        dispatch(_deleteSubscribers(data.map((subsc) => subsc.id)))
      )
      .finally(() => setPending(false));
  };
  const handleSend = () => {
    setPending(true);
    sendMail(selectedSubscr.map(subscr => subscr.fields))
      .then(resSent => {
        setSent(selectedSubscr.filter((subs, id) => resSent[id].status === 'fulfilled')
          .map(subs => subs.fields.name).join(", "));
      })
      .finally(() => setPending(false));
  }

  return (
    <Container pending={pending || status === "loading"}>
      <h2>Subscribers:</h2>
      {subscribers &&
        subscribers.map(({ id, fields }, num) => (
          <Subscriber
            key={id}
            handleCheck={(ev) => handleCheck(ev, id)}
            {...{ ...fields, id, num, pending }}
          />
        ))}
      <button className="left" onClick={handleSend}>Send mail to selected</button>
      <button className="left">
        <Link to="/mailedit">Create/edit mail content</Link>
      </button>
      {sent && <span>E-mail was sent to: {sent}</span>}
      <button onClick={handleDelSelected}>Delete selected</button>
      {(pending || status === "loading") && <div>Pending</div>}
    </Container>
  );
}

export default Subscribers;
