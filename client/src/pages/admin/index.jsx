import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminLayout from '../../components/Admin/AdminLayout';
import CardContainer from '../../components/Admin/CardContainer';
import Table from '../../components/Admin/Table';
import { AllTasks } from '../../actions/allTasks';
import TasksModal from '../../components/Admin/TasksModal';

const Admin = ({ taskAction, AllTasks }) => {
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState();

  useEffect(() => {
    taskAction();
  }, [taskAction]);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setActiveTask();
    setOpen(false);
  };

  return (
    <AdminLayout>
      <CardContainer allTasks={AllTasks} openModal={openModal} />
      <Table allTasks={AllTasks} openModal={openModal} setActiveTask={setActiveTask} />
      <TasksModal open={open} handleClose={handleClose} activeTask={activeTask} />
    </AdminLayout>
  );
};

const mapStateToProps = state => {
  return {
    AllTasks: state.allTasks
  };
};

const mapDispatchToProps = dispatch => ({
  taskAction: bindActionCreators(AllTasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
