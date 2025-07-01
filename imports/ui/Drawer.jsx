import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { useTracker } from "meteor/react-meteor-data";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { Avatar, Typography } from "@mui/material";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


export const AppDrawer = ({trigger}) => {
    const user = useTracker(() => Meteor.user());
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleUserMenuClick = (option) => {
        switch (option) {
            case 'My profile':
                goToProfile();
                break;
            case 'Tasks page':
                navigate("/tasks");
                break;
            default:
                break;
        }
    };

    const goToProfile = async () => {
        if(user && user._id)
            navigate(`/userProfile/${ user._id }`);
    };

    const DrawerList = (
        <Box sx={{ width: 250, backgroundColor: "rgba(52, 106, 173, 0.47)", color:'rgb(65, 70, 76)', height:'100%' }} role="presentation" onClick={toggleDrawer(false)}>
            {user 
                ? (
                    <Box sx={{display:'flex', alignItems: 'center', m:1, gap:1}}>
                        {user.profile?.photo 
                            ? (
                                <Avatar src={user.profile.photo} sx={{width:'60px', height:'60px'}} />
                            ) : (
                                <AccountCircleIcon />) 
                        }
                        <Box sx={{display:'flex', textTransform: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography>{user.profile.fullName}</Typography>
                            <Typography>{user.profile.mail}</Typography>
                        </Box>
                    </Box> 
                ) : (
                    <Box sx={{display:'flex', alignItems: 'center', m:1, gap:1}}>
                        <AccountCircleIcon />
                        <Typography>Log in to display more options</Typography>
                    </Box>                        
                )
            }
            <Divider />
            <List>
                {['My profile', 'Tasks page'].map((page, index) => (
                    <ListItem key={page} disablePadding>
                        <ListItemButton>
                            <ListItemIcon onClick={ () => handleUserMenuClick(page) }>
                                {index % 2 === 0 ? <AccountCircleIcon sx={{color: 'white'}} /> : <FormatListBulletedOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={page} />
                        </ListItemButton>
                    </ListItem>
                    ) ) 
                }
            </List>
        
        </Box>
    );

    return (
        <Fragment> 
            {trigger(toggleDrawer(true))}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Fragment>
    );
}
/* 
<Button onClick={toggleDrawer(true)}>Open drawer</Button>

*/