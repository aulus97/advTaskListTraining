<<<<<<< HEAD
import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
=======
import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
>>>>>>> 581bfba167004daaf61c27363e1c64a5a05324ea

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
<<<<<<< HEAD
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Button } from "@mui/material";

export const Task = ({ task, onCheckboxClick, onDeleteClick, onStatusClick }) => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  const handleEditClick = (task) => {
    return (navigate("/editTask"));
  };
  const handleSetStatus = (state) => {
    const newState = state%3 + 1;
    onStatusClick(newState);
  };
  const displayStatus = (status) => {
    switch(status){
      case 1:
        return("Cadastrada");
      case 2:
        return("Em andamento");
      case 3:
        return("Concluída");
      default:
        return("Cadastrada");
    }
  };
  const statusColors = {
    '1':'#29b6f6',//editTask color from MUI palette for dark themes
    '2':'#ffa726',//warning color from MUI palette for dark themes
    '3':'#66bb6a',//success color from MUI palette for dark themes
  };

  return (
    <Box sx={{ width: '70%', bgcolor: 'background.paper', margin: '0 auto' }}>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
=======

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const user = useTracker(() => Meteor.user());
  
  return (
    <Box sx={{ width: '70%', bgcolor: 'background.paper', margin: '0 auto' }}>
      <List>
        <ListItem disablePadding>
>>>>>>> 581bfba167004daaf61c27363e1c64a5a05324ea
          <FormControlLabel
              control={
                <Checkbox
                  checked={!!task.isChecked}
                  onChange={() => onCheckboxClick(task)}
                />
              }
              label=""
          />
          <ListItemText
<<<<<<< HEAD
            primary={
              <>
              {task.title} 
              <br />
              &emsp;{task.text}
              </>
            }
            secondary={"by: " + task.userId + " - " + task.createdAt}
            sx={{ flexGrow: 1 }}
          />
          <Button 
          onClick={()=>{ if( user && user._id===task.userId ){ handleSetStatus(task.status); } }} 
          sx={{ 
          flexGrow: 1,
          backgroundColor: statusColors[task.status], 
          color:'rgba(0, 0, 0, 0.87)'
          }} 
          variant={task.status==1 ? "outlined" : "contained"}
          >
            {displayStatus(task.status)}
          </Button>
          <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(task)}>
            <ModeEditOutlinedIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
            <DeleteIcon />
=======
            primary={task.text}
            secondary={"by: " + user.username + " | at: " + user.createdAt}
          />
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={() => onDeleteClick(task)} />
>>>>>>> 581bfba167004daaf61c27363e1c64a5a05324ea
          </IconButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

/*
<li>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly />
        <span>{task.text}</span>
        <span></span>
        <button onClick={() => onDeleteClick(task)}>&times;</button>
      </li></>

---------------
<Box sx={{ width: '70%', bgcolor: 'background.paper', margin: '0 auto' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={!!task.isChecked}
                    onChange={() => onCheckboxClick(task)}
                  />
                }
                label=""
            />
            <ListItemText
              primary={task.text}
              secondary={"by: " + user.username + " | at: " + user.createdAt}
            />
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon onClick={() => onDeleteClick(task)} />
            </IconButton>
          </ListItem>
        </List>
        <Divider />
      </nav>
    </Box>
*/