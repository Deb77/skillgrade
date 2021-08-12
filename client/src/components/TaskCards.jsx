import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import checkmark from '../assets/checkmark.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//additional styling
const useStyles = makeStyles({
  root: {
    color: 'white'
  },
  card: {
    padding: '1rem'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: '0.4px',
    marginBottom: '.5rem'
  },
  checkmark: {
    height: '20px',
    width: '20px',
    marginTop: '1rem'
  },

  red: {
    background: 'linear-gradient(103.67deg, #FF6464 37.65%, #FFA2AD 108.44%)'
  },
  purple: {
    background: 'linear-gradient(103.67deg, #7A64FF 37.65%, #A89AFF 108.44%)'
  },
  orange: {
    background: 'linear-gradient(103.67deg, #FF9C64 37.65%, #FFC062 108.44%)'
  }
});

//component
const TaskCard = ({ title, days, completion, color }) => {
  const classes = useStyles();

  //function to set color of task based on color prop
  const setColor = color => {
    if (color === 'purple') return classes.purple;
    if (color === 'red') return classes.red;
    if (color === 'orange') return classes.orange;
  };
  return (
    <>
      <Card className={`${classes.root} ${setColor(color)}`}>
        <CardContent className={classes.card}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography className={classes.subtitle}>{title}</Typography>
              <Typography>Time: {days}</Typography>
            </Grid>
            <Grid item>
              {completion ? (
                <img alt="checkmark" className={classes.checkmark} src={checkmark}></img>
              ) : (
                <ChevronRightIcon style={{ marginTop: '1rem' }}></ChevronRightIcon>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default TaskCard;
