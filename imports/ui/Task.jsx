import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const user = useTracker(() => Meteor.user());
  
  return (
    <Box sx={{ width: '70%', bgcolor: 'background.paper', margin: '0 auto' }}>
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