import {
  ListItem, ListItemButton, ListItemAvatar, Skeleton,
  ListItemText, Checkbox, Avatar
} from "@mui/material";
import { useSelector } from "react-redux";
import { handleCheck } from "../../../handlers";

function Subscriber({
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
      {/* <Skeleton></Skeleton> */}
      <ListItem
        key={id}
        alignItems='flex-start'
        divider={num !== arr.length - 1}
        secondaryAction={<Checkbox
          edge="end"
          checked={!!selected}
          disabled={status === "pending"}
          onChange={() => handleCheck("subscribers")(!selected, id)}
        />}
        dense
        disablePadding
      >
        <ListItemButton onClick={() => handleCheck("subscribers")(!selected, id)}>
          <ListItemText sx={{ maxWidth: 25 }} children={<h3>{num + 1}. </h3>} />
          <ListItemAvatar children={<Avatar>{name.at(0).toUpperCase()}</Avatar>} />
          <ListItemText primary={name} secondary={email} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default Subscriber;
