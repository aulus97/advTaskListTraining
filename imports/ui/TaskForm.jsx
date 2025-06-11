import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";


export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      text: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField 
        fullWidth
        id="outlined-basic" 
        label="Type to add new tasks" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined" />
      
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
        <Typography
        noWrap
        sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Add Task
        </Typography>
      </Button>
    </Box>
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