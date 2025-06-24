import React, { Fragment, use, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { ResponsiveTopBar } from "./TopBar";
import { Navigate, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider } from "@mui/material";

export const TasksPage = () => {
    //const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const {tasks,user} = useTracker(() => {
        const user = Meteor.user();

        const publicTaskCondition = { 
            mode: 1,
            ...(hideCompleted ? hideCompletedFilter : {})
        };
        
        var conditions = [{...publicTaskCondition}];
        
        if(user){
            const privateTaskCondition = { 
                mode: 2, 
                userId: user._id,
                ...(hideCompleted ? hideCompletedFilter : {})
            };
            conditions.push(privateTaskCondition); 
        }

        const tasks = TasksCollection.find(
            { $or: conditions },
            { sort: { createdAt: -1 } }
        ).fetch();

        return {tasks,user};
    });

    const navigate = useNavigate();
    
    const handleToggleChecked = ({ _id, isChecked }) => 
        Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });

    const handleDelete = ({ _id }) => 
        Meteor.callAsync("tasks.delete", { _id });

    const handleToggleStatus = ({ _id, status }) => 
        Meteor.callAsync("tasks.toggleStatus", { _id, status });
    
    const handleEdit = ({ _id }) => 
        navigate(`/editTask/${ _id }`);
    
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
        <Box sx={{gap:'16px'}}>
            {user ? (
                <Fragment>
                    <ResponsiveTopBar />
                    <Divider />
                    <TaskForm />
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '4px', margin: '0 auto' }}>
                        <Button sx={{backgroundColor:' #8ee4b1'}} variant="contained" onClick={() => setHideCompleted(!hideCompleted)}>
                        {hideCompleted ? "Show All" : "Hide Completed"}
                        </Button>
                    </Box>
                    <Divider />
                    {tasks.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        onCheckboxClick={handleToggleChecked}
                        onDeleteClick={handleDelete}
                        onStatusClick={handleToggleStatus}
                        onEditClick={handleEdit}
                    />
                    ))}
                </Fragment>
            ) : (
                <Navigate to="/logIn" />
            )}
        </Box>
    );
};
