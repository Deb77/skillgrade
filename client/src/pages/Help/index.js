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

const Help = () => {
  const classes = useStyles();
  return (
    <>
      <div className="about">
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container style={{ marginTop: '2rem' }}>
            <Typography className={classes.heading} variant="h6">
              Help
            </Typography>
            <Typography
              variant="h6"
              style={{ letterSpacing: '0.04em', fontWeight: 'bolder', marginBottom: '.5rem' }}
            >
              What is skill grade?
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
              Skill Grade is an online platform that caters to streamlined learning in various tracks like web
              dev, UI design, etc.
            </Typography>
            <Typography
              variant="h6"
              style={{ letterSpacing: '0.04em', fontWeight: 'bolder', marginBottom: '1rem' }}
            >
              What are the steps to start a task?
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '.7rem' }}>
              Step 1: Choose the category you want to learn and work on from the dashboard page
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '.7rem' }}>
              Step 2: Based on your selection it will take you to tasklist page where there are various kinds
              of projects divided into 3 categories namely, beginner, intermediate and advanced level. You can
              choose between them. It is recommended you start from the beginner tasks.
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '.7rem' }}>
              Step 3: Next you will be redirected to the selected task. This page contains all the information
              such as task introduction and resources that can be used. You can use this and start working on
              the task. {`(It is mandatory to prepare a pdf document of your work)`}
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '.7rem' }}>
              Step 4: After completing the task you can upload your file in the submission section. You will
              be scored after our experts review your tasks. That's it!! You've completed a task.
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
              Step 5: We also have a feed where you can post images of your work and gain and likes from other
              students. You can also use the feed to take inspiration and get ideas.
            </Typography>
            <Typography
              variant="h6"
              style={{ letterSpacing: '0.04em', fontWeight: 'bolder', marginBottom: '.5rem' }}
            >
              What is the Leaderboard?
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
              The leaderboard page shows you your current rank among all other registered students. The ranks
              is based on points that are allocated to you on task completion. So try your best to complete
              maximum tasks and climb up to the top!!
            </Typography>
            <Typography
              variant="h6"
              style={{ letterSpacing: '0.04em', fontWeight: 'bolder', marginBottom: '.5rem' }}
            >
              What does "Your Tasks" sections imply on the dashboard?
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
              "Your tasks" section contains all the tasks that have been started by you but are not yet
              submitted. It shows no. of days left till the due date and would alert overdue if due date has
              been crossed. Remeber the points of the tasks keep decreasing after the due date so hurry up and
              complete all pending tasks!
            </Typography>
          </Container>
        </main>
      </div>
    </>
  );
};

export default Help;
