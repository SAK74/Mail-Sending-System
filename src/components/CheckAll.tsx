import { Checkbox, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { handleUpdate } from "../handlers";
import { RequestType } from "../types";

interface CheckProps {
   name: RequestType;
   ids: string[];
}
type StateType = "indeterminate" | "checked" | "unchecked";

export const CheckAll: FC<CheckProps> = ({ name, ids }) => {
   const [status, setStatus] = useState<StateType>("indeterminate");
   const handleChange = () => {
      const checked = status !== "checked";
      const promises = ids.map(itemId => handleUpdate(name)(itemId, { selected: checked }));
      Promise.all(promises)
         .then(() => setStatus(prev => prev !== "checked" ? "checked" : "unchecked"));
   }
   return <Tooltip
      title={status === "checked" ? "Unselect all" : "Select all"}
   >
      <Checkbox
         indeterminate={status === "indeterminate"}
         checked={status === "checked"}
         color="default"
         onChange={handleChange}
      />
   </Tooltip>
}
