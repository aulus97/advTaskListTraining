import React, { Fragment, useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Divider, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const EditForm = () => {
  const { taskId } = useParams();
  const isLoading = useSubscribe("tasks.singleTask", taskId);

  const task = useTracker(() => {
    if (!taskId) return null;
    return TasksCollection.findOne(taskId);
  }, [taskId]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newMode, setNewMode] = useState(3); 
  
  useEffect(() => {
    if (task) {
      setNewTitle(task.title || '');
      setNewText(task.text || '');
      setNewMode(task.mode || 3);
    }
  }, [task?.title, task?.text, task?.mode]);

  const navigate = useNavigate();  
  const handleGoBackTasksPage = () => {
    (navigate("/tasks"));
  };

  const submit = async (e) => {
    e.preventDefault();
    //setError(null); // Clear previous errors

    if(newTitle.trim() === "" || newText.trim() === "") {
      console.log("Title and text cannot be empty.");
      return;
    }

    try {
      await Meteor.callAsync("tasks.edit", { _id: taskId, title: newTitle, text: newText, mode: newMode });
      handleGoBackTasksPage();
    } catch (err) {
      console.error("Failed to update task:", err);
      //setError(err.reason || "An unexpected error occurred while updating the task.");
      //handleGoBackTasksPage();
    }
  };
  
  const handleTitleBlur = () => {
    if(newTitle.trim()==="" && task)
      setNewTitle(task.title || '');
  };
  const handleTextBlur = () => {
    if(newText.trim()==="" && task)
      setNewText(task.text || '');
  };
  
  const handleSetMode = (event,newModeValue) => {
    //const auxMode = newMode % 2 + 1;
    if(newModeValue !== null)
      setNewMode(newModeValue);
  };
  const modeColors = {
    '1':'#66bb6a',//success color from MUI palette for dark themes
    '2':'#c62828',//error color from MUI palette for dark themes
    '3':'#29b6f6',//info color from MUI palette for dark themes
  };
  const modeNames = {
    '1':"Public",
    '2':"Private",
  };

  if (isLoading()) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button
          loading
          loadingPosition="end"
          variant="outlined"
          >
              Loading Task
          </Button>
      </Box>
    );
  }

  if (!taskId) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" color="error">Task not found or you are not authorized to view it.</Typography>
        <Button onClick={handleGoBackTasksPage} sx={{ mt: 2 }} variant="contained">Go Back to Tasks</Button>
      </Box>
    );
  }

  return (
    <Fragment>
      <Box
        component="form"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}
        onSubmit={submit}
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          id="outlined-basic" 
          label="Rename your new task" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleTitleBlur}
          variant="filled" />
        
        <TextField
          required
          fullWidth
          id="outlined-basic" 
          label="Edit your task" 
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleTextBlur}
          variant="filled" />
        
        {/*<Button
        onClick={handleSetMode}
        color={modeColors[newMode]}
        sx={{ flexGrow: 1 }} 
        variant="outlined"
        >
          {modeNames[newMode]}
        </Button>*/}
        <Divider />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
          }}
        >
          <ToggleButtonGroup
            value={newMode}
            exclusive
            onChange={handleSetMode}
            aria-label="task mode"
          >
            <ToggleButton 
              value={1} 
              sx={{
                borderColor: (newMode === 1) ? modeColors[1] : modeColors[3],
                color: (newMode === 1) ? modeColors[1] : 'white',
                '&.Mui-selected': {
                  color: modeColors[1], // force the words to have the modeColors[1] color when button is selected
                },
                backgroundColor: 'transparent'
              }}
            >
              Public
            </ToggleButton>
            <ToggleButton 
              value={2} 
              sx={{
                borderColor: (newMode === 2) ? modeColors[2] : modeColors[3],
                color: (newMode === 2) ? modeColors[2] : 'white',
                '&.Mui-selected': {
                  color: modeColors[2], // force the words to have the modeColors[2] color when button is selected
                },
                backgroundColor: 'transparent'
              }}
            >
              Private
            </ToggleButton>
          </ToggleButtonGroup>
          {/*<Button 
            variant="outlined"
            sx={{
              borderColor: (newMode === 2 && onSelectPrivateMode === true) ? modeColors[2] : modeColors[3],
              color: (newMode === 2 && onSelectPrivateMode === true) ? modeColors[2] : 'white',
              backgroundColor: 'transparent',
            }} 
            onClick={() => {setMode(2); setSelectPrivateMode(!onSelectPrivateMode)}}
          >
            Private
          </Button>
          <Button 
            variant="outlined"
            sx={{
              borderColor: (newMode === 1 && onSelectPublicMode === true) ? modeColors[1] : modeColors[3],
              color: (newMode === 1 && onSelectPublicMode === true) ? modeColors[1] : 'white',
              backgroundColor: 'transparent',
            }} 
            onClick={() => {setMode(1); setSelectPublicMode(!onSelectPublicMode)}}
          >
            Public
          </Button>*/}
        </Box>
        <Button type="submit" variant="contained" sx={{ height: '56px' }}>
          <Typography> Confirm edition </Typography>
        </Button>
        <Button onClick={handleGoBackTasksPage} variant="contained" sx={{ height: '56px' }}>
          <Typography> Cancel editing </Typography>
        </Button>
      </Box>
    </Fragment>
  );
};
/*
<form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
*/