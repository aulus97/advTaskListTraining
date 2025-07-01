import React, {Fragment} from 'react';
import { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { ResponsiveTopBar } from './TopBar';

import Box from '@mui/material/Box';
import { Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TasksCollection } from '../api/TasksCollection';

export const Welcome = () => {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks.dashboard");

    const cards = [
        {
            id: 1,
            title: 'Tarefas Cadastradas',
        },
        {
            id: 2,
            title: 'Tarefas em Andamento',
        },
        {
            id: 3,
            title: 'Tarefas Concluídas',
        },
    ];

    const { totalTasks, inProgressTasks, completedTasks } = useTracker(() => {
        if (!user) return { totalTasks: 0, inProgressTasks: 0, completedTasks: 0 };
    
        return {
            totalTasks: TasksCollection.find({ userId: user._id }).count(),
            inProgressTasks: TasksCollection.find({ userId: user._id, status: 2 }).count(),
            completedTasks: TasksCollection.find({ userId: user._id, status: 3 }).count(),
        };
    }, [user?._id]);
    
    const handleCardDesc = (option) => {
        switch (option) {
        case 1: return totalTasks;
        case 2: return inProgressTasks;
        case 3: return completedTasks;
        default: return 0;
        }
    };

    const handleLogInClick = () => {
        return (navigate("/logIn"));
    };
    
    const handleSeeTasksClick = () => {
        return (navigate("/tasks"));
    };
    
    if (isLoading()) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Button
                loading
                loadingPosition="end"
                variant="outlined"
                >
                    Loading...
                </Button>
            </Box>
        );
    }

    return (
        <div className='welcome'>
            <Fragment>
                <ResponsiveTopBar />
                { user ? (  
                        <>
                        <Box
                            sx={{
                                width: '80%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 2,
                                alignItems:'center',
                                justifyItems:'center',
                                my:8,
                            }}
                        >
                            {cards.map((card, index) => (
                                <Card key={card.id}>
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
                                        <Box sx={{ alignItems:'center', justifyItems:'center'}} >
                                            <Typography variant="h5" component="div">
                                                {card.title}
                                            </Typography>
                                            <Typography variant="body1" color="info" sx={{ fontSize: '4rem' }}>
                                                {handleCardDesc(card.id)}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                        <Button 
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        variant="contained"
                        onClick={handleSeeTasksClick}
                        >
                            <Typography
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                See tasks
                            </Typography>
                        </Button>
                        </>
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
                        </Box>
                    )
                }
            </Fragment>
        </div>
    );
};
