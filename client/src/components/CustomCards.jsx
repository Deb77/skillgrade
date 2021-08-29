import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//additional styling
const useStyles = makeStyles({
  root: {
    minWidth: '240px',
    height: '170px',
    color: 'white',
    transition: '0.3s',

    '&:hover': {
      transform: 'translateY(-20px)'
    }
  },

  title: {
    fontSize: 26,
    fontWeight: 600
  },
  pos: {
    marginBottom: 12
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: '0px',
    lineHeight: '19px'
  },

  card: {
    padding: '1.5rem'
  },
  actionbtn: {
    color: 'white'
  },
  deadline: {
    fontSize: 16
  },
  red: {
    background: 'linear-gradient(103.67deg, #FF6464 37.65%, #FFA2AD 108.44%)'
  },
  purple: {
    background: 'linear-gradient(103.67deg, #7A64FF 37.65%, #A89AFF 108.44%)'
  },
  orange: {
    background: 'linear-gradient(103.67deg, #FF9C64 37.65%, #FFC062 108.44%)'
  },
  blue: {
    background: 'linear-gradient(103.67deg, #418DFF 37.65%, #97B4FF 108.44%)'
  },
  green: {
    background: 'linear-gradient(103.67deg, #00B09B 37.65%, #E5FFE2 108.44%)'
  },
  magenta: {
    background: 'linear-gradient(103.67deg, #FF41CA 37.65%, #FEDDFF 108.44%)'
  }
});

//data to be displayed on card based on course_name
const courses = {
  UI_DESIGN: 'UI Design',
  CONTENT_WRITING: 'Content Writing',
  WEB_DEV: 'Web Dev',
  SKETCHING: 'Sketching',
  JAVA: 'Java',
  DEV_OPS: 'Dev Ops'
};

//component
const CustomCards = props => {
  const classes = useStyles();
  const { course_name, desc, deadline, active } = props;

  //function for setting color of card based on course_name
  const setColor = title => {
    if (title === 'UI_DESIGN') return classes.purple;
    if (title === 'CONTENT_WRITING') return classes.red;
    if (title === 'WEB_DEV') return classes.orange;
    if (title === 'SKETCHING') return classes.blue;
    if (title === 'JAVA') return classes.green;
    if (title === 'DEV_OPS') return classes.magenta;
  };
  return (
    <>
      <div className="Customcards" style={{ textDecoration: 'none' }}>
        <Card raised={true} className={`${classes.root} ${setColor(course_name)}`}>
          <CardContent className={classes.card}>
            <Typography className={classes.title} gutterBottom>
              {courses[course_name]}
            </Typography>
            <Typography className={classes.subtitle} gutterBottom>
              {desc}
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                {deadline >= 0 ? (
                  <Typography className={classes.deadline}>{deadline} days left</Typography>
                ) : (
                  <Typography className={classes.deadline}>OverDue</Typography>
                )}
              </Grid>
              <Grid item>
                <CardActions>
                  {active ? (
                    <Button className={classes.actionbtn} size="small">
                      Continue <ChevronRightIcon />
                    </Button>
                  ) : (
                    <></>
                  )}
                </CardActions>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomCards;
