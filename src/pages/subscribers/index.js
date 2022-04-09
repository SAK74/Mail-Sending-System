import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItems, fetchData, update } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import Subscriber from "../../components/subscribers/singleSubscriber";
import { selectAll, updateChecked, _deleteSubscribers } from "./subscribersSlice";
import { Container } from "./container";
import SingleMail from "../../components/mails/singleMail";
import { selectAllMails } from "../mails/mailsSlice";

function Subscribers() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const { status } = useSelector((state) => state.subscribers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "iddle") {
      dispatch(fetchData("subscribers")());
    }
  }, []); //eslint-disable-line
  const subscribers = useSelector(selectAll);
  console.log(subscribers);

  const handleCheck = ({ target: { checked } }, id) => {
    setPending(true);
    update("subscribers")(id, {
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
    deleteItems("subscribers")(selectedSubscr.map((subsc) => subsc.id))
      .then((data) =>
        dispatch(_deleteSubscribers(data.map((subsc) => subsc.id)))
      )
      .finally(() => setPending(false));
  };
  const selectedMail = useSelector(selectAllMails).find(mail => mail.fields.selected);
  console.log("selectedMail: ", selectedMail);
  const handleSend = () => {
    // sendTest();

    setPending(true);
    sendMail(selectedSubscr.map(subscr => subscr.fields), selectedMail.fields)
      .then(resSent => {
        setSent(selectedSubscr.filter((subs, id) => resSent[id].status === 'fulfilled')
          .map(subs => subs.fields.name).join(", "));
        setTimeout(() => setSent(false), 5000);
      })
      .finally(() => setPending(false));
  }


  return (
    <Container pending={pending || status === "loading"}>
      <h2>Subscribers:</h2>
      {subscribers &&
        subscribers.map(({ id, fields }, num) => (
          <div className="subscriber" key={id}>
            {num + 1}.&nbsp;
            <Subscriber
              handleCheck={(ev) => handleCheck(ev, id)}
              {...{ ...fields, id, num, pending }}
            />
            <input
              type="checkbox"
              checked={!!fields.selected}
              onChange={ev => handleCheck(ev, id)}
              disabled={pending}
            />
          </div>
        ))}
      <button className="left" onClick={handleSend}>Send mail to selected</button>
      <button className="left">
        <Link to="/mailedit">Create/edit mail content</Link>
      </button>
      {sent && <span>E-mail was sent to: {sent}</span>}
      <button onClick={handleDelSelected}>Delete selected</button>
      {(pending || status === "loading") && <div>Pending</div>}
      <h3>Selected mail:</h3>
      {selectedMail ? <SingleMail {...selectedMail.fields} /> : "Pending"}
      <AddSubscriber />
    </Container>
  );
}

export default Subscribers;
