import {
  ListItem, ListItemButton, ListItemAvatar,
  ListItemText, Checkbox, Avatar
} from "@mui/material";
import { handleUpdate } from "../../handlers";
import { FC, memo } from 'react';
import { useReduxSelector } from "../../store";
import { Subscriber } from '../../types';

interface SubscriberProps {
  subscriber: Omit<Subscriber, "createdTime">;
  num: number;
  arr: Subscriber[]
}

const SingleSubscriber: FC<SubscriberProps> = ({
  subscriber: { id, fields: { name, email, selected } },
  num,
  arr
}) => {
  const { status } = useReduxSelector(state => state.subscribers);

  return (
    <>
      <ListItem
        key={id}
        alignItems='flex-start'
        divider={num !== arr.length - 1}
        secondaryAction={<Checkbox
          edge="end"
          checked={!!selected}
          disabled={status === "pending"}
          onChange={() => handleUpdate("subscribers")(id, { selected: !selected })}
        />}
        dense
        disablePadding
      >
        <ListItemButton onClick={() => handleUpdate("subscribers")(id, { selected: !selected })}>
          <ListItemText sx={{ maxWidth: 25 }} children={<h3>{num + 1}. </h3>} />
          <ListItemAvatar children={<Avatar>{name[0].toUpperCase()}</Avatar>} />
          <ListItemText primary={name} secondary={email} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default memo(SingleSubscriber);
