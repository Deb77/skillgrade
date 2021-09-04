import React from 'react';

import Navbar from '../../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import profileimg from '../../assets/profileimg.jpeg';
import profileimg1 from '../../assets/profileimg1.jpeg';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
//additional styling
const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: '0px 0px 0px 55px'
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    responsiveFontSizes: '16px',
    margin: '2rem 0'
  },
  root: {
    display: 'flex',
    marginBottom: '2rem',
    minWidth: 200,
    maxWidth: 400
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: 'black'
  },
  pos: {
    marginBottom: 12
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SkillGrade
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const About = () => {
  const classes = useStyles();
  return (
    <>
      <div className="about">
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container style={{ marginTop: '2rem' }}>
            <Typography className={classes.heading} variant="h6">
              About Us
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
              Skill Grade is an online platform that caters to streamlined learning in various tracks like web
              dev, UI design, etc. It focuses on developing an individuals skills by providing various tasks
              and projects. The idea behind the platform is to upskill students by giving them various tasks
              and resources to learn from. Providing deadlines lead to less procastination and make students
              more productive. Students are awarded points on succesfull completion of tasks and can compete
              for leaderboard postions. This keeps them motivated and enjoy through learning.
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>Developed by</Typography>
            <Card className={classes.root}>
              <CardContent>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item>
                    <Avatar alt="Deborah Mendes" src={profileimg} className={classes.large} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Deborah Mendes
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Full stack Developer
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.root} style={{ marginBottom: '5rem' }}>
              <CardContent>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item>
                    <Avatar alt="Dheeraj Gandi" src={profileimg1} className={classes.large} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Dheeraj Gandhi
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Frontend Developer
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Copyright />
          </Container>
        </main>
      </div>
    </>
  );
};

export default About;
