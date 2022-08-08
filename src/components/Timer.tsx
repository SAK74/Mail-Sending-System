import { FC, useEffect, useState } from "react";
import { useMediaQuery, Theme, Box } from '@mui/material';
import { useReduxDispatch } from "../store";
import { setUnlogged } from "../pages/loggin/logginSlice";

// time is in min
export const Timer: FC<{ timeToEnd: number }> = ({ timeToEnd }) => {
    const [timer, setTimer] = useState(timeToEnd * 60);
    const match = useMediaQuery<Theme>(theme => theme.breakpoints.up('sm'));
    const dispatch = useReduxDispatch();
    useEffect(() => {
        const timerID = window.setTimeout(() => setTimer(prev => prev - 1), 1000);
        if (!timer) {
            clearTimeout(timerID);
            dispatch(setUnlogged());
        }
        return () => window.clearTimeout(timerID);
    });
    const minutes = Math.floor(timer / 60);
    const sec = timer - minutes * 60;
    return <Box
        sx={{
            alignSelf: 'flex-end',
            marginRight: match ? 3 : 2
        }}
        children={"Logout in " + (minutes < 10 && 0) + `${minutes}:${sec < 10 ? 0 : ""}${timer - minutes * 60}`}
    />
}
