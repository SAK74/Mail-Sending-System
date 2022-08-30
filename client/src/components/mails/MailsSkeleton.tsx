import { ListItem, Skeleton, Box } from "@mui/material";
import { memo } from "react";

function MailsSkeleton() {
   return (
      <>
         {new Array(Math.floor(Math.random() * 5 + 3)).fill(null).map((elem, index) =>
            <ListItem key={index}>
               <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "flex-start", ml: 7 }}
               >
                  <Skeleton width={Math.random() * 40 + 20 + "%"} component="div" />
                  <Skeleton variant="rectangular" width="70%" height={30} component="div" />
               </Box>
               <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 2 }} />
               <Skeleton variant="rectangular" width={20} height={20} />
            </ListItem>)}
      </>
   );
}

export default memo(MailsSkeleton);