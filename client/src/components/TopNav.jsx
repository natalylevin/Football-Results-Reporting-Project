import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../hooks";

const links = [
    {name: "Live results", path: "/"},
    {name: "League table", path: "/league-table"},
    {name: "League table live", path: "/league-table-live"},
    {name: "Manage Games", path: "/games"},
]

const TopNav = (props) => {
    const [state] = useAppContext();
    const {isLogged} = state;
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                color: '#670879',
                                fontWeight: 600,
                                textDecoration: "none"
                            }}
                        >
                            FOOTBALL
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {md: "flex"}}}>
                            {links.map((link, index) => (
                                <Button
                                    key={index}
                                    onClick={() => navigate(link.path)}
                                    sx={{my: 2, color: "white", display: "block"}}
                                >
                                    {link.name}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Button sx={{my: 2, color: "white", display: "block"}}>
                                LOGOUT
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default TopNav;