import React, { Fragment, useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { ResponsiveTopBar } from "./TopBar";
//import { LoginForm } from "./LoginForm";
import { Navigate  } from "react-router-dom";

import Button from '@mui/material/Button';

export const Hello = () => {
    const [hideCompleted, setHideCompleted] = useState(false);
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const tasks = useTracker(() => {
        return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
            sort: { createdAt: -1 },
        }).fetch();
    });

    const pendingTasksCount = useTracker(() => {
        return TasksCollection.find(hideCompletedFilter).count();
    });

    const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ""
    }`;

    if (isLoading()) {
        return (
            <Button
            loading
            loadingPosition="end"
            variant="outlined"
            >
                Loading...
            </Button>
        );
    }
    
    return (
        <div className="tasksPage">
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
                        onCheckboxClick={()=>{""}}
                        onDeleteClick={()=>{""}}
                        onStatusClick={()=>{""}}
                        onEditClick={()=>{""}}
                    />
                    ))}
                </ul>
            </Fragment>
        </div>
    );
};

/*
<div className="app-nav-links">
                <nav>
                    <Link to="/hello">Hello</Link> | 
                    <Link to="/editTask">Info</Link>
                </nav>
            <hr />
            <Outlet />
            </div>


<header>
        <div className="app-bar">
            <div className="app-header">
                <h1>️📝️ To Do List {pendingTasksTitle}</h1>
            </div>
        </div>
        </header>
        <div className="main">            */