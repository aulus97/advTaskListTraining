import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import { Fragment } from "react";
import Divider from '@mui/material/Divider';

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState(1);
  const [onSelectPrivateMode, setSelectPrivateMode] = useState(false);
  const [onSelectPublicMode, setSelectPublicMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      title: title.trim(),
      text: text.trim(),
      createdAt: new Date(),
      status: 1,//1- Cadastrada 2-Andamento 3-Concluida
      mode: mode,//1- publica 2-privada
    });

    setText("");
    setTitle("");
  };

  const modeColors = {
    '1':'#66bb6a',//success color from MUI palette for dark themes
    '2':'#c62828',//error color from MUI palette for dark themes
    '3':'#29b6f6',//info color from MUI palette for dark themes
  };

  return (
    <Fragment>
      <Box
        component="form"
        sx={{ width:'80%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', margin: '0 auto' }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="title-outlined-basic" 
          label="Name your new task" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined" />
        
        <TextField 
          id="text-outlined-basic" 
          label="Type to add new task" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
              Please define the task's privacy
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
              }}
            >
              <Button 
                variant="outlined"
                sx={{
                  borderColor: (mode === 2 && onSelectPrivateMode === true) ? modeColors[2] : modeColors[3],
                  color: (mode === 2 && onSelectPrivateMode === true) ? modeColors[2] : 'white',
                  backgroundColor: 'transparent',
                }} 
                onClick={() => {setMode(2); setSelectPrivateMode(!onSelectPrivateMode)}}
              >
                Private
              </Button>
              <Button 
                variant="outlined"
                sx={{
                  borderColor: (mode === 1 && onSelectPublicMode === true) ? modeColors[1] : modeColors[3],
                  color: (mode === 1 && onSelectPublicMode === true) ? modeColors[1] : 'white',
                  backgroundColor: 'transparent',
                }} 
                onClick={() => {setMode(1); setSelectPublicMode(!onSelectPublicMode)}}
              >
                Public
              </Button>
            </Box>
        </Box>
        <Divider />
        <Button type="submit" variant="contained" sx={{ height: '56px' }}>
          <Typography
          >
            Add Task
          </Typography>
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