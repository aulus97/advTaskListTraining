import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const user = useTracker(() => Meteor.user());
  
  return (
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
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
        <Divider />
      </nav>
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
*/