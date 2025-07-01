import React, {Fragment} from 'react';
import { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { ResponsiveTopBar } from './TopBar';

import Box from '@mui/material/Box';
import { Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TasksCollection } from '../api/TasksCollection';

export const Welcome = () => {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    const cards = [
        {
            id: 1,
            title: 'Tarefas Cadastradas',
            description: '',
        },
        {
            id: 2,
            title: 'Tarefas em Andamento',
            description: '',
        },
        {
            id: 3,
            title: 'Tarefas Concluídas',
            description: '',
        },
    ];

    const handleCardDesc = (option) => {
        switch (option) {
            case 1:
                return TasksCollection.find({userId: user._id}).count();
                //break;
            case 2:
                return TasksCollection.find({userId: user._id, status: 2}).count();
                //break;
            case 3:
                return TasksCollection.find({userId: user._id, status: 3}).count();
                //break;
            default:
                break;
        }
    };

    const handleLogInClick = () => {
        return (navigate("/logIn"));
    };
    
    return (
        <div className='welcome'>
            <Fragment>
                <ResponsiveTopBar />
                { user ? (  
                        <Box
                            sx={{
                                width: '80%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                                gap: 2,
                                justifyItems:'center',
                                my:4,
                                backgroundColor:'yellow',
                            }}
                        >
                            {cards.map((card, index) => (
                                <Card>
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {handleCardDesc(card.id)}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ width: "70%", alignItems:'center', justifyItems:'center', my:2 }} >
                            <Typography
                            sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                Wanna check your lists?
                                Hit the button below and log in!
                            </Typography>
                            <Button 
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                variant="contained"
                                onClick={handleLogInClick}
                                >
                                    <Typography
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Log in
                                    </Typography>
                            </Button>
                            <Button 
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                variant="contained"
                                onClick={handleLogInClick}
                                >
                                    <Typography
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        See tasks
                                    </Typography>
                            </Button>
                        </Box>
                    )
                }
            </Fragment>
        </div>
    );
};
