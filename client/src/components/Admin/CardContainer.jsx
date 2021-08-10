import { Grid } from '@material-ui/core';

import StatCard from './StatCard';

const CardContainer = () => {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item>
        <StatCard />
      </Grid>
      <Grid item>
        <StatCard />
      </Grid>
      <Grid item>
        <StatCard />
      </Grid>
      <Grid item>
        <StatCard />
      </Grid>
    </Grid>
  );
};

export default CardContainer;
