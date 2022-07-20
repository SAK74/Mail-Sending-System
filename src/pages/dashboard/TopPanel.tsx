import { Dispatch, FC, SetStateAction } from "react";
import { AppBar, FormControlLabel, styled, Switch, Toolbar, Typography, useTheme } from "@mui/material";
import { Brightness6 as LightIcon } from '@mui/icons-material'
import { NavLink } from "react-router-dom";

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
    const theme = useTheme();
    // console.log(theme);
    return <>
        <AppBar>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        fontStyle: 'italic'
                    }}
                    children="Mail-Sending-System"
                />
                <nav>
                    <StyledLink to='subscribers' children="Subscribers" />
                    {/* <NavLink to='subscribers' children="Subscribers" /> */}
                    {/* <NavLink to='mails' children='Mails' /> */}
                    <StyledLink to='mails' children="Mails" />
                </nav>
                <FormControlLabel
                    control={<Switch
                        onChange={(ev, checked) => { changeMode(checked) }}
                    />}
                    label={<LightIcon />}
                />
            </Toolbar>
        </AppBar>
        <Toolbar />
    </>
}