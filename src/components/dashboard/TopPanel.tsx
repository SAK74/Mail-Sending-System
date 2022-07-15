import { FC } from "react";
import { AppBar, Link, LinkProps, styled, Toolbar, Typography } from "@mui/material";
import { Brightness6 as LightIcon } from '@mui/icons-material'
import { NavLink, NavLinkProps } from "react-router-dom";

const StyledLink = styled((props: LinkProps & NavLinkProps) => <Link
    component={NavLink} {...props} />)
    ({
        color: 'white',
        marginInline: 20,
        textDecoration: 'none',
        '&.active': {
            color: 'black',
            fontSize: 'large',
            backgroundColor: 'white',
            padding: 5
        }
    })
export const TopPanel: FC = () => {
    return <>
        <AppBar>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography
                    sx={{

                    }}
                    children="Mail-Sending-System"
                />
                <nav>
                    <StyledLink to='subscribers' children="Subscribers" />
                    {/* <NavLink to='subscribers' children="Subscribers" /> */}
                    {/* <NavLink to='mails' children='Mails' /> */}
                    <StyledLink to='mails' children="Mails" />
                </nav>
                <LightIcon />
            </Toolbar>
        </AppBar>
        <Toolbar />
    </>
}