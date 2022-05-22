import {
  ListItem, ListItemButton, ListItemAvatar,
  ListItemText, Checkbox, Avatar
} from "@mui/material";
import { useSelector } from "react-redux";
import { handleUpdate } from "../../../handlers";
import { memo } from 'react';
// import { Subscriber } from "../../../types";

function SingleSubscriber({
  id,
  num,
  arr,
  email,
  name,
  selected,
}) {
  const { status } = useSelector(state => state.subscribers);

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
          <ListItemAvatar children={<Avatar>{name.at(0).toUpperCase()}</Avatar>} />
          <ListItemText primary={name} secondary={email} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default memo(SingleSubscriber);
