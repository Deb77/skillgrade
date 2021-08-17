import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, Modal, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiButton-fullWidth': {
      margin: theme.spacing(1)
    }
  },

  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const courses = [
  { key: 'web-dev', value: 'Web Development' },
  { key: 'ui-design', value: 'UI Development' },
  { key: 'sketching', value: 'Sketching' },
  { key: 'content-writing', value: 'Content Writing' }
];

const levels = [
  { key: 'BEGINNER', value: 'Beginner' },
  { key: 'INTERMEDIATE', value: 'Intermediate' },
  { key: 'ADVANCED', value: 'Advanced' }
];

const TasksModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [course, setCourse] = useState('Web Development');
  const handleChange = event => {
    setCourse(event.target.value);
  };

  const onSubmit = () => {};
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Details</h2>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField label="Name" variant="outlined" fullWidth={true} />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Course"
          value={course}
          onChange={handleChange}
          variant="outlined"
          fullWidth={true}
        >
          {courses.map(option => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Enter a description"
          multiline={true}
          variant="outlined"
          fullWidth={true}
          minRows={3}
        />
        <TextField label="Max points" variant="outlined" fullWidth={true} />
        <TextField label="Completion Time" variant="outlined" fullWidth={true} />
        <TextField
          select
          label="Level"
          value={course}
          onChange={handleChange}
          variant="outlined"
          fullWidth={true}
        >
          {levels.map(option => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Documents" variant="outlined" fullWidth={true} />
        <TextField label="Videos" variant="outlined" fullWidth={true} />
        <TextField label="Tools And Sources" variant="outlined" fullWidth={true} />
        <Button variant="contained" color="primary" fullWidth={true}>
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default TasksModal;
