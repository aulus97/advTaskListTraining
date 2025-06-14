import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import { Fragment } from "react";


export const EditForm = ({_id, title, text, mode}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [newMode, setNewMode] = useState(mode);
  
  const submit = async (e) => {
    e.preventDefault();
    if(newTitle=="" || newText=="") 
      return;
    try {
      await Meteor.callAsync("tasks.edit", { _id, newTitle, newText, newMode });
    } catch (error) {
      console.error("Failed to update task:", error);
      return (navigate("/editTask"));;
    }
    return (navigate("/tasks"));
  };

  const handleTitleBlur = () => {
    if(newTitle.trim()==="")
      setNewTitle(title);
  };
  const handleTextBlur = () => {
    if(newText.trim()==="")
      setNewText(text);
  };
  
  const handleSetMode = () => {
    const auxMode = newMode%2 + 1;
    setNewMode(auxMode);
  };
  const modeColors = {
    '1':"success",
    '2':"error",
  };
  const modeNames = {
    '1':"Public",
    '2':"Private",
  };

  const navigate = useNavigate();  
  const handleGoBackClick = () => {
    return (navigate("/tasks"));
  };

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
        
        <Button
        onClick={handleSetMode}
        color={modeColors[newMode]}
        sx={{ flexGrow: 1 }} 
        variant="outlined"
        >
          {modeNames[newMode]}
        </Button>
        <Button type="submit" variant="contained" sx={{ height: '56px' }}>
          <Typography>Confirm edition</Typography>
        </Button>
        <Button onClick={handleGoBackClick} variant="contained" sx={{ height: '56px' }}>
          <Typography>Cancel editing</Typography>
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