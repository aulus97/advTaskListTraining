import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
<<<<<<< HEAD
import { Fragment } from "react";
=======
>>>>>>> 581bfba167004daaf61c27363e1c64a5a05324ea


export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      title: title.trim(),
      text: text.trim(),
      createdAt: new Date(),
      status: 1,//1- Cadastrada 2-Andamento 3-Concluida
      mode: 1,//1- publica 2-privada
    });

    setText("");
    setTitle("");
  };

  return (
<<<<<<< HEAD
    <Fragment>
      <Box
        component="form"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField 
          fullWidth
          id="outlined-basic" 
          label="Name your new task" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined" />
        
        <TextField 
          fullWidth
          id="outlined-basic" 
          label="Type to add new task" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined" />
        
        <Button type="submit" variant="contained" sx={{ height: '56px' }}>
          <Typography
          >
            Add Task
          </Typography>
        </Button>
      </Box>
    </Fragment>
=======
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
        sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Add Task
        </Typography>
      </Button>
    </Box>
>>>>>>> 581bfba167004daaf61c27363e1c64a5a05324ea
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