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
    '1':'#29b6f6',//info color from MUI palette for dark themes
    '2':'#ffa726',//warning color from MUI palette for dark themes
    '3':'#66bb6a',//success color from MUI palette for dark themes
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
  
  return (
    <Box sx={{ width: '80%', bgcolor: 'background.paper', margin: '0 auto' }}>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
              control={
                <Checkbox
                  checked={!!task.isChecked}
                  onChange={() => { user._id===task.userId ? onCheckboxClick(task) : "" } }
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
              {"by: " + task.author} 
              <br />
              {" - " + task.createdAt}
              </>
            }
            sx={{ flexGrow: 1 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Button 
              variant="outlined"
              sx={{
                borderColor: task.mode ? modeColors[task.mode] : modeColors[3],
                color: task.mode ? modeColors[task.mode] : 'white',
                '&.Mui-selected': {
                  color: modeColors[task.mode?task.mode:3], // force the words to have the modeColors[task.mode] color when button is selected
                },
                backgroundColor: 'transparent'
              }}
              >
                {modeNames[task.mode]}
              </Button>
              <Button 
                onClick={()=>{ user._id===task.userId ? handleSetStatus(task) : "" }} 
              sx={{ 
                flexGrow: 1,
                backgroundColor: statusColors[task.status], 
                color:'rgb(0, 0, 0)'
              }} 
              variant={task.status==1 ? "outlined" : "contained"}
              >
                <Typography sx={{flexgrow:1}} >{displayStatus[task.status]}</Typography>
              </Button>
              <IconButton edge="end" aria-label="edit" onClick={() => { user._id===task.userId ? onEditClick(task) : "" } }>
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => { user._id===task.userId ? onDeleteClick(task) : "" } }>
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
