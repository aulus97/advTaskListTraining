import React, {Fragment} from 'react';
import { Outlet, Link } from "react-router-dom";
import { ResponsiveTopBar } from './TopBar';

import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";

export const Welcome = () => {
    return (
        <div className='welcome'>
            <Fragment>
                <ResponsiveTopBar />
                <Box sx={{ width: '70%', margin: '0 auto' }}>
                    <Typography
                    noWrap
                    sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        Welcome Page
                    </Typography>
                    <Typography
                    noWrap
                    sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        Learning more about React Router 6.4 :)
                    </Typography>
                    <Typography
                    noWrap
                    sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        Wanna check your lists?
                        Hit the button below and log in!
                    </Typography>
                </Box>
                <Box sx={{ width: '70%', margin: '0 auto' }}>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                        <Link to="/logIn">Log In</Link>  
                        {/*<Outlet />*/}
                    </Button>
                </Box>
            </Fragment>
        </div>
    );
}
/*
<h1>Welcome Page</h1>
    <p>Learning more about React Router 6.4 :)</p>
    <p>
        Wanna check your lists?
        Hit the button below and log in!
    </p>
*/