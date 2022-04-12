import { ListItem, Skeleton, Avatar, Box } from "@mui/material";

export default function SubscribersSkeleton() {
   return (
      <>
         {new Array(Math.floor(Math.random() * 7 + 3)).fill(null).map((elem, index) =>
            <ListItem key={index}>
               <Skeleton variant="circular" children={<Avatar />} />
               <Box sx={{ flexGrow: 1, ml: 2, maxWidth: `${Math.random() * 40 + 30}%` }}>
                  <Skeleton width="40%" />
                  <Skeleton />
               </Box>
            </ListItem>)}
      </>
   );
}
