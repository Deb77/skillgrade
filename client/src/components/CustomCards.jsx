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
    color: 'white'
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

//component
const CustomCards = props => {
  const classes = useStyles();
  const { title, desc, deadline, active } = props;

  //function for setting color of card based on its category
  const setColor = title => {
    if (title === 'UI Design') return classes.purple;
    if (title === 'Content Writing') return classes.red;
    if (title === 'Web Dev') return classes.orange;
    if (title === 'Sketching') return classes.blue;
    if (title === 'Java') return classes.green;
    if (title === 'Dev Ops') return classes.magenta;
  };
  return (
    <>
      <div className="Customcards">
        <Card className={`${classes.root} ${setColor(title)}`}>
          <CardContent className={classes.card}>
            <Typography className={classes.title} gutterBottom>
              {title}
            </Typography>
            <Typography className={classes.subtitle} gutterBottom>
              {desc}
            </Typography>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography>{deadline}</Typography>
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
