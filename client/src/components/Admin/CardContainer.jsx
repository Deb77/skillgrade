import { Grid } from '@material-ui/core';
import StatCard from './StatCard';

const cardData = [
  { key: 'web_dev_tasks', title: 'Web development', course_name: 'WEB_DEV' },
  { key: 'sketching_tasks', title: 'Sketching', course_name: 'SKETCHING' },
  { key: 'UI_design_tasks', title: 'UI Design', course_name: 'UI_DESIGN' },
  { key: 'content_writing_tasks', title: 'Content Writing Tasks', course_name: 'CONTENT_WRITING' }
];

const CardContainer = ({ allTasks, openModal, setActiveCourse }) => {
  return (
    <Grid container spacing={4} justifyContent="space-between">
      {cardData.map(item => (
        <Grid item key={item.key}>
          <StatCard
            title={item.title}
            item={item.key}
            course_name={item.course_name}
            openModal={openModal}
            setActiveCourse={setActiveCourse}
            allTasks={allTasks}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardContainer;
