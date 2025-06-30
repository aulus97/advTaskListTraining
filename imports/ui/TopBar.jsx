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

const pages = ['Welcome', 'Hello','Tasks'];
const loggedInMenu = ['Profile', 'Logout'];
const guestMenu = ['Sign Up'];

export const ResponsiveTopBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleUserMenuClick = (option) => {
        switch (option) {
            case 'Logout':
                logout();
                break;
            case 'Profile':
                goToProfile();
                break;
            case 'Sign Up':
                signUp();
                break;
            default:
                break;
        }
    };

    const pageToLink = {
        'Welcome': "/",
        'Hello': "/hello",
        'Tasks': "/tasks",
    };

    const user = useTracker(() => Meteor.user());
    const logout = async () => {
        await Meteor.logout();
        navigate("/");
    };
    
    const signUp = async () => {
        navigate("/signUp");
    };
    
    const goToProfile = async () => {
        if(user && user._id)
            navigate(`/userProfile/${ user._id }`);
    };

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
                        {/* Logo's text */}
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
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, display:"flex", gap:'4px' }}>
                                    {user.profile?.photo 
                                        ? ( 
                                            <Avatar src={user.profile.photo} /> 
                                        ) : (
                                            <AccountCircleIcon sx={{color: 'white'}}></AccountCircleIcon> 
                                        ) 
                                    }
                                    <Typography 
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {user ? (" "+ user.username +" ") : ""}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            {/* menu de logout */}
                            
                            <Menu
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
                                {(user ? loggedInMenu : guestMenu).map((page) => (
                                    <MenuItem key={page} onClick={() => handleUserMenuClick(page)}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                            
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Fragment>
    );
};