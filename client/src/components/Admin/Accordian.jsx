import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    flexDirection: 'column',
    marginRight: 30
  }
}));

export default function ControlledAccordions({ ReviewTasks, taskAction }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [score, setScore] = React.useState();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = () => {
    const params = {
      score,
      user_task_id: expanded
    };
    taskAction.MarkTaskComplete(params);
    setExpanded();
  };

  return (
    <div className={classes.root}>
      {ReviewTasks.map((item, k) => (
        <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)} key={k}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id={`panel1bh-header-${k}`}
          >
            <Typography variant="h6" className={classes.heading}>
              {item.name}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {item.name}: {item.description}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Grid container style={{ width: '100%', display: 'flex' }} justifyContent="space-between">
              <Typography>
                <a href={item.work_upload} target="_blank" rel="noreferrer">
                  Click to preview
                </a>
              </Typography>
              <Typography>Max points: {item.max_points}</Typography>
              {item.days_left < 0 ? (
                <Typography color="secondary">{-item.days_left} days overdue</Typography>
              ) : (
                <Typography>Submitted on time</Typography>
              )}
            </Grid>
            <Grid container spacing={3} alignItems="center" style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <TextField
                  id={`outlined-basic-${k}`}
                  label="Enter score"
                  variant="outlined"
                  fullWidth={true}
                  onChange={e => setScore(Number(e.target.value))}
                  disabled={item?.complete}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onSubmit}
                  disabled={item?.complete}
                >
                  {item?.complete ? 'Marked Complete' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
