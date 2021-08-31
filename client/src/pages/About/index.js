import React from 'react';

import Navbar from '../../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

//additional styling
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
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
  }
}));

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
              Skill share caters to streamlined learning in various tracks like web dev, UI design, etc. It
              focuses on developing an individuals skills by providing various tasks and projects.
            </Typography>
          </Container>
        </main>
      </div>
    </>
  );
};

export default About;
