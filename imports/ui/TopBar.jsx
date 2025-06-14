import React, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['Welcome', 'Hello'];
const settings = ['Logout'];

export const ResponsiveTopBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pageToLink = {
        'Welcome': "/",
        'Hello': "/hello",
    };

    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();

    const pendingTasksCount = useTracker(() => {
        if (!user) {return 0;}
        return TasksCollection.find(hideCompletedFilter).count();
    });

    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ""
    }`;

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: 'block' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* Menu of pages*/} 
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: 'block' }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={()=>{return (navigate(pageToLink[page]));}}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        {/*</Box>
                        {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
                        {/* Logo's text //}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>*/}
                            <Typography
                            variant="h5"
                            component="a"
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            >
                                📝️ To Do List {pendingTasksTitle}
                            </Typography>
                        </Box>
                        {/* User menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            {/* User icon */}
                            <Tooltip title={user ? "Open Settings" : "Log In or Sign Up"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <AccountCircleIcon sx={{color: 'white'}}></AccountCircleIcon>
                                    <Typography 
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {user ? (" "+ user.username +" ") : ""}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            {/* menu de logout */}
                            {user ? (<Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                <MenuItem key={setting} onClick={logout}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                                ))}
                            </Menu>) : ("")}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Fragment>
    );
};