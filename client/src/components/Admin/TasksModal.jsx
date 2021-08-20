import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import ModalForm from './ModalForm';

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
    width: 700,
    maxHeight: 850,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto'
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

const TasksModal = ({ open, handleClose, activeTask, activeCourse, addNewTask, updateTask }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{activeTask ? 'Edit Task' : 'Add Task'}</h2>
      <ModalForm
        activeTask={activeTask}
        addNewTask={addNewTask}
        updateTask={updateTask}
        handleClose={handleClose}
        activeCourse={activeCourse}
      />
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
