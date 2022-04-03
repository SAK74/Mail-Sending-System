import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubscribers,
  fetchSubscribers,
  updateSubscriber
} from "../../features/makeAirtableRequest";
import Subscriber from "../singleSubscriber";
import {
  selectAll,
  updateChecked,
  _deleteSubscribers
} from "../subscribersSlice";
import { Container } from "./container";

function Subscribers() {
  const [pending, setPending] = useState(false);
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
  const handleDelSelected = () => {
    setPending(true);
    const subscribersToDel = subscribers
      .filter((subsc) => subsc.fields.selected)
      .map((subsc) => subsc.id);
    deleteSubscribers(subscribersToDel)
      .then((data) =>
        dispatch(_deleteSubscribers(data.map((subsc) => subsc.id)))
      )
      .finally(() => setPending(false));
  };
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
      <button onClick={handleDelSelected}>Delete selected</button>
      {(pending || status === "loading") && <div>Pending</div>}
    </Container>
  );
}

export default Subscribers;
