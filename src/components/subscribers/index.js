import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscribers,
  updateSubscriber
} from "../../features/makeAirtableRequest";
import Subscriber from "../singleSubscriber";
import { selectAll, updateChecked } from "../subscribersSlice";
import { Container } from "./container";

function Subscribers() {
  // const [subscribers, setSubscribers] = useState([]);
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
    // console.log(subscribers.map((subscriber) => subscriber.fields.selected));
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

  return (
    <Container pending={pending}>
      <h2>Subscribers:</h2>
      {subscribers &&
        subscribers.map(({ id, fields }, num) => (
          <Subscriber
            key={id}
            handleCheck={(ev) => handleCheck(ev, id)}
            {...{ ...fields, id, num, pending }}
          />
        ))}
      {pending && <div>Pending</div>}
    </Container>
  );
}

export default Subscribers;
