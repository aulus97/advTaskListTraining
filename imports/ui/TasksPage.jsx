import React, { Fragment, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { ResponsiveTopBar } from "./TopBar";
import { Navigate, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const TasksPage = () => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const tasks = useTracker(() => {
        if(user){
            const privateTaskCondition = { 
                mode: 2, 
                userId: user._id,
                ...(hideCompleted ? hideCompletedFilter : {})
            };
            conditions.push(privateTaskCondition); 
        }
        
        const publicTaskCondition = { 
            mode: 1,
            ...(hideCompleted ? hideCompletedFilter : {})
        };
        
        var conditions = [{...publicTaskCondition}];
    
        return TasksCollection.find(
            { $or: conditions },
            { sort: { createdAt: -1 } }
        ).fetch();
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
        <div className="tasksPage">
            {user ? (
                <Fragment>
                    <ResponsiveTopBar />
                    <TaskForm />
                    <div className="filter">
                        <Button variant="outlined" onClick={() => setHideCompleted(!hideCompleted)}>
                        {hideCompleted ? "Show All" : "Hide Completed"}
                        </Button>
                    </div>
                    <ul className="tasks">
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
                    </ul>
                </Fragment>
            ) : (
                <Navigate to="/logIn" />
            )}
        </div>
    );
};
