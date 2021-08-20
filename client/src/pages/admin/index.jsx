import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import CardContainer from '../../components/Admin/CardContainer';
import Table from '../../components/Admin/Table';
import * as Tasks from '../../actions/allTasks';
import TasksModal from '../../components/Admin/TasksModal';

const Admin = ({ taskAction, AllTasks }) => {
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState();
  const [activeCourse, setActiveCourse] = useState();

  useEffect(() => {
    taskAction.AllTasks();
  }, [taskAction]);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setActiveTask();
    setActiveCourse();
    setOpen(false);
  };

  return (
    <AdminLayout>
      <CardContainer allTasks={AllTasks} openModal={openModal} setActiveCourse={setActiveCourse} />
      <Table allTasks={AllTasks} openModal={openModal} setActiveTask={setActiveTask} />
      <TasksModal
        open={open}
        handleClose={handleClose}
        activeTask={activeTask}
        addNewTask={taskAction.NewTask}
        updateTask={taskAction.UpdateTask}
        activeCourse={activeCourse}
      />
    </AdminLayout>
  );
};

const mapStateToProps = state => {
  return {
    AllTasks: state.allTasks
  };
};

const mapDispatchToProps = dispatch => ({
  taskAction: bindActionCreators(Tasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
