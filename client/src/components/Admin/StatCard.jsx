import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },

  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  count: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000'
  },
  cardButtonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardButton: {
    fontSize: 16
  }
});

export default function SimpleCard({ title, course_name, openModal, setActiveCourse, item, allTasks }) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(allTasks[item].length);
  }, [allTasks, item]);

  const onClick = () => {
    openModal();
    setActiveCourse(course_name);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.count} color="textSecondary">
          {count}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardButtonContainer}>
        <Button
          className={classes.cardButton}
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onClick()}
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
}
