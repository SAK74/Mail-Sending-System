import { Dispatch, FC, SetStateAction } from "react";
import {
    AppBar, Avatar, Badge, FormControlLabel, IconButton, styled,
    Switch, Toolbar, Typography
} from "@mui/material";
import { Brightness6 as LightIcon } from '@mui/icons-material'
import { NavLink } from "react-router-dom";
import { Timer } from "./Timer";
import { useReduxSelector } from "../store";

const StyledLink = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    marginInline: 20,
    textDecoration: 'none',
    "&:hover": {
        backgroundColor: `${theme.palette.action.hover} !important`,
        color: 'inherit !important'
    },
    [theme.breakpoints.down('sm')]: {
        marginInline: 10
    },
    '&.active, &:hover': {
        color: theme.palette.background.default,
        fontSize: 'large',
        backgroundColor: theme.palette.text.secondary,
        borderRadius: 3,
        padding: 5
    }
})
);
export const TopPanel: FC<{ changeMode: Dispatch<SetStateAction<boolean>> }> = ({ changeMode }) => {
    const { isLogged } = useReduxSelector(state => state.loggin);
    return <>
        <AppBar>
            <Toolbar >
                <Typography
                    sx={{
                        fontStyle: 'italic'
                    }}
                    children="Mail-Sending-System"
                />
                <nav style={{ flexGrow: 1 }}>
                    <StyledLink to='subscribers' children="Subscribers" />
                    <StyledLink to='mails' children="Mails" />
                </nav>
                <FormControlLabel
                    control={<Switch
                        onChange={(ev, checked) => { changeMode(checked) }}
                    />}
                    label={<LightIcon />}
                />
                <IconButton
                    children={<Badge
                        children={<Avatar />}
                    />}
                />
            </Toolbar>
            {isLogged && <Timer timeToEnd={1} />}
        </AppBar>
        <Toolbar />
    </>
}