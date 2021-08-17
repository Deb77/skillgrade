import { useState } from 'react';
import { Grid } from '@material-ui/core';
import StatCard from './StatCard';

const cardData = [
  { key: 'web_dev_tasks', title: 'Web development' },
  { key: 'sketching_tasks', title: 'Sketching' },
  { key: 'UI_design_tasks', title: 'UI Design' },
  { key: 'content_writing_tasks', title: 'Content Writing Tasks' }
];

const CardContainer = ({ allTasks, openModal }) => {
  console.log(allTasks);
  return (
    <Grid container spacing={4} justifyContent="space-between">
      {cardData.map(item => (
        <Grid item key={item.key}>
          <StatCard title={item.title} count={allTasks[item.key].length} openModal={openModal} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardContainer;
