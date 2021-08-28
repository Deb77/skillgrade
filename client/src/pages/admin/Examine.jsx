import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Tasks from '../../actions/allTasks';
import Accordion from '../../components/Admin/Accordian';
import AdminLayout from '../../components/Admin/AdminLayout';

const Examine = ({ ReviewTasks, taskAction }) => {
  useEffect(() => {
    taskAction.ReviewTasks();
  }, []);
  return (
    <AdminLayout>
      <Accordion ReviewTasks={ReviewTasks} />
    </AdminLayout>
  );
};

const mapStateToProps = state => {
  return {
    ReviewTasks: state.allTasks.review_tasks
  };
};

const mapDispatchToProps = dispatch => ({
  taskAction: bindActionCreators(Tasks, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Examine);
