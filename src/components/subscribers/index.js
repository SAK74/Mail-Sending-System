import { useEffect, useState } from "react";
import {
  fetchSubscribers,
  updateSubscriber
} from "../../features/makeAirtableRequest";
import Subscriber from "../singleSubscriber";
import { Container } from "./container";

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetchSubscribers()
      .then((data) => setSubscribers(data))
      .finally(() => setPending(false));
  }, []);
  console.log(subscribers);

  const handleCheck = ({ target: { checked } }, id) => {
    console.log(subscribers.map((subscriber) => subscriber.fields.selected));
    setPending(true);
    updateSubscriber(id, {
      fields: {
        selected: checked
      }
    })
      .then(() =>
        setSubscribers((prev) => {
          const temp = prev;
          return temp.map((subscriber) =>
            subscriber.id === id
              ? {
                  ...subscriber,
                  fields: { ...subscriber.fields, selected: checked }
                }
              : subscriber
          );
        })
      )
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
