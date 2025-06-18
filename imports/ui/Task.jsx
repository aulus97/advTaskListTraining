import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Button, rgbToHex, Typography } from "@mui/material";

export const Task = ({ task, onCheckboxClick, onDeleteClick, onStatusClick, onEditClick }) => {
  const user = useTracker(() => Meteor.user());

  const author = Meteor.users.findOne(task.userId);//for namimg the task's author when this page is invoqued by Hello
  const authorName = author ? author.username : "unknown";

  const handleSetStatus = (task) => {
    const newState = task.status%3 + 1;
    task.status = newState;
    onStatusClick(task);
  };
  const displayStatus = {
    '1':"Cadastrada",
    '2':"Em andamento",
    '3':"Concluída",
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
            primary={
              <>
              {task.title} 
              <br />
              &emsp;{task.text}
              </>
            }
            secondary={
              <>
              <br />
              {"by: " + authorName} 
              <br />
              {" - " + task.createdAt}
              </>
            }
            sx={{ flexGrow: 1 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button 
              onClick={()=>{ user._id===task.userId ? handleSetStatus(task) : "" }} 
            sx={{ 
              flexGrow: 1,
              backgroundColor: statusColors[task.status], 
              color:'rgba(0, 0, 0, 0.87)'
            }} 
            variant={task.status==1 ? "outlined" : "contained"}
            >
              <Typography sx={{flexgrow:1}} >{displayStatus[task.status]}</Typography>
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <IconButton edge="end" aria-label="edit" onClick={() => onEditClick(task)}>
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
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