import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import * as CourseTasksActionCreator from '../../actions/CourseTasks';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import TaskCard from '../../components/TaskCards';

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
  title: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 38,
    color: '#7A64FF',
    marginTop: '2rem',
    marginBottom: '3rem'
  },
  subheading: {
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#505050',
    marginBottom: '.5rem'
  },
  taskcategory: {
    marginBottom: '2rem'
  }
}));

//data to display on page based on course id
const data = [
  {
    id: 'ui-design',
    category_name: 'User Interface Designing ',
    introduction:
      'User interface (UI) design is the process designers use to build interfaces in software or computerized devices, focusing on looks or style. in these tasks you will get to practice your design skills by doing some amazing projects and learning different tools. There are 3 different levels of tasks , we recommend you to start from beginner tasks.'
  },
  { id: 'web-dev', category_name: 'Web Development', introduction: 'web developement intro ' },
  { id: 'sketching', category_name: 'Sketching', introduction: 'Sketching introduction ' },
  { id: 'content-writing', category_name: 'Content Writing', introduction: 'content writing intro ' }
];

//component
const Tasklist = ({ CourseTasksAction, taskdetails, Userdetails }) => {
  const params = useParams();
  const classes = useStyles();

  //function to sort data based on course id
  const category = data.filter(e => {
    return e.id === params.id;
  });

  //fetching tasks by dispatching action
  useEffect(() => {
    CourseTasksAction.CourseTasks(params.id, Userdetails);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="tasklist">
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="title">
            <Typography className={classes.title} align="center">
              {category[0].category_name}
            </Typography>
          </div>
          <Container>
            <div className="introduction">
              <Typography className={classes.subheading} variant="subtitle1">
                INTRODUCTION
              </Typography>
              <Typography style={{ letterSpacing: '0.04em', marginBottom: '2rem' }}>
                {category[0].introduction}
              </Typography>
            </div>
            <div className="tasks">
              <Typography
                className={classes.subheading}
                style={{ marginBottom: '2rem' }}
                align="center"
                variant="h6"
              >
                TASKS
              </Typography>
              <div className={classes.taskcategory}>
                <Typography className={classes.subheading} variant="subtitle1">
                  BEGINNERS
                </Typography>
                <Grid style={{ marginTop: '.1rem' }} container spacing={3}>
                  {taskdetails.length > 0 &&
                    taskdetails
                      .filter(e => {
                        return e.level === 'BEGINNER';
                      })
                      .map(task => {
                        return (
                          <Grid key={task.id} item xs={12} sm={6} md={4} lg={4}>
                            <TaskCard
                              title={task.name}
                              days={task.time_complete}
                              completion={true}
                              color="purple"
                              id={task.id}
                              coursename={params.id}
                            ></TaskCard>
                          </Grid>
                        );
                      })}
                </Grid>
              </div>
              <div className={classes.taskcategory}>
                <Typography className={classes.subheading} variant="subtitle1">
                  INTERMEDIATE
                </Typography>
                <Grid style={{ marginTop: '.1rem' }} container spacing={3}>
                  {taskdetails.length > 0 &&
                    taskdetails
                      .filter(e => {
                        return e.level === 'INTERMEDIATE';
                      })
                      .map(task => {
                        return (
                          <Grid key={task.id} item xs={12} sm={6} md={4} lg={4}>
                            <TaskCard
                              title={task.name}
                              days={task.time_complete}
                              completion={task.status}
                              id={task.id}
                              color="red"
                              coursename={params.id}
                            ></TaskCard>
                          </Grid>
                        );
                      })}
                </Grid>
              </div>
              <div className={classes.taskcategory}>
                <Typography className={classes.subheading} variant="subtitle1">
                  ADVANCED
                </Typography>
                <Grid style={{ marginTop: '.1rem' }} container spacing={3}>
                  {taskdetails.length > 0 &&
                    taskdetails
                      .filter(e => {
                        return e.level === 'ADVANCED';
                      })
                      .map(task => {
                        return (
                          <Grid key={task.id} item xs={12} sm={6} md={4} lg={4}>
                            <TaskCard
                              title={task.name}
                              days={task.time_complete}
                              completion={false}
                              id={task.id}
                              coursename={params.id}
                              color="orange"
                            ></TaskCard>
                          </Grid>
                        );
                      })}
                </Grid>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
};

//redux
const mapStateToProps = state => {
  return {
    taskdetails: state.CourseTasks.taskdata,
    Userdetails: state.auth.user_id
  };
};
const mapDispatchToProps = dispatch => ({
  CourseTasksAction: bindActionCreators(CourseTasksActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);
