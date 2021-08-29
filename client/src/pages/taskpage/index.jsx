import React from 'react';
import Navbar from '../../components/Navbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddBoxIcon from '@material-ui/icons/AddBox';
import feedimg from '../../assets/feedimg.png';
import ListItemText from '@material-ui/core/ListItemText';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import * as CourseTasksActionCreator from '../../actions/CourseTasks';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AddUserTask } from '../../services';
import ListSubheader from '@material-ui/core/ListSubheader';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { AddTaskFeed } from '../../services';
import { updateTaskCompleteStatus } from '../../services';
import { checkTaskStatus } from '../../services';
import Feed from '../../components/feed';
//additional styling
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formstyle: {
    '& > *': {
      margin: theme.spacing(1),
      width: '400px'
    }
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
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#505050',
    marginBottom: '.3rem',
    marginTop: '2rem'
  },
  resources: {
    padding: 0,
    fontWeight: 500,
    fontSize: '1rem',

    letterSpacing: '0.04em',

    color: '#7A64FF'
  },
  taskmessage: {
    padding: 0,
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.04em',
    color: '#7A64FF'
  },
  button: {
    color: 'white',
    background: '#7A64FF',
    '&:hover': {
      backgroundColor: '#7A64FF'
    }
  },
  image: {
    height: '300px',
    width: '512px'
  },
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  spacing: {
    marginBottom: '4rem',
    marginTop: '4rem'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  file: {
    opacity: '0',
    width: '0.1px',
    height: '0.1px',
    position: 'absolute'
  },
  fileinput: {
    display: 'block',
    position: 'relative',
    width: '140px',
    height: '45px',
    borderRadius: ' 6px',
    background: '#7A64FF',
    display: ' flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Poppins',
    cursor: 'pointer',
    marginBottom: '2rem'
  }
}));
//for lists
function ListItemLink(props) {
  return (
    <ListItem
      alignItems="flex-start"
      style={{ padding: 0, textDecoration: 'none', color: 'inherit' }}
      component="a"
      {...props}
    />
  );
}

//component
const Taskpage = ({ taskdetails, Userdetails, CourseTasksAction }) => {
  const params = useParams();

  const [carddata, setCarddata] = useState([]);
  const [description, setDiscription] = useState('');
  const [filedata, setFiledata] = useState('');
  const [status, setStatus] = useState('');

  //fetching tasks by dispatching action
  useEffect(() => {
    CourseTasksAction.CourseTasks(params.course, Userdetails);
  }, []);

  //filter tasks based on task id
  useEffect(() => {
    const carddata = taskdetails.filter(task => {
      return task.id === params.id;
    });
    setCarddata(carddata);
    console.log('taskdetails', taskdetails);
    console.log('carddata', carddata);
  }, [taskdetails]);

  // upload a file to post
  const onChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const fileEncoded = reader.result;
      setFiledata(fileEncoded);
    };
  };
  //data to be passed to addtaskfeed action (data to be posted to feed)
  const uploadfeeddata = {
    work_upload: filedata,
    description: description,
    task_id: params.id,
    user_id: Userdetails
  };

  //to post to the feed on submiting the form and clicking post
  const handleSubmit = e => {
    e.preventDefault();
    console.log(uploadfeeddata);
    AddTaskFeed(uploadfeeddata).then(res => {
      console.log(res.data);
    });

    handleClose();
  };

  //data to be passed to call addusertask
  const data = { user_id: Userdetails, task_id: params.id };

  //to pass data to incomplete tasks once the start button is clicked
  const clickhandler = () => {
    AddUserTask(data);
    setStatus('IN_PROGRESS');
  };

  //code for modal (opening and closing)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //check task status
  React.useEffect(() => {
    checkTaskStatus(Userdetails, params.id).then(res => {
      setStatus(res.data.complete);
    });
  }, []);

  //to upload file for submission
  const FileUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set('encType', 'multipart/form-data');
    formData.append('file', file);
    formData.append('user_id', Userdetails);
    formData.append('task_id', params.id);

    console.log(formData);
    updateTaskCompleteStatus(formData).then(res => {
      console.log(res.data);
    });
    setStatus('IN_REVIEW');
  };
  const classes = useStyles();
  return (
    <>
      <div className="taskpage">
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container style={{ marginTop: '2rem' }}>
            <Typography className={classes.heading} variant="h6">
              {carddata.length > 0 && carddata[0].name}
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
              {carddata.length > 0 && carddata[0].introduction}
            </Typography>
            <Typography style={{ color: '#7A64FF', marginBottom: '.3rem' }}>
              Points: {carddata.length > 0 && carddata[0].max_points}
            </Typography>
            <Typography style={{ color: '#7A64FF', marginBottom: '2rem' }}>
              Time:{carddata.length > 0 && carddata[0].time_complete} Days
            </Typography>
            {status != '' ? (
              <div className="resources" className={classes.spacing}>
                <Typography className={classes.heading} variant="subtitle1">
                  RESOURCES
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={3} md={2} lg={3}>
                    <List subheader={<ListSubheader className={classes.resources}>Documents </ListSubheader>}>
                      {carddata[0].docs.map(e => {
                        const t = JSON.parse(e);
                        return (
                          <ListItemLink key={carddata[0].link} href={t.link}>
                            <ListItemText
                              primaryTypographyProps={{ variant: 'subtitle1' }}
                              primary={t.title}
                            />
                          </ListItemLink>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={3} md={2} lg={3}>
                    <List subheader={<ListSubheader className={classes.resources}>Videos</ListSubheader>}>
                      {carddata[0].videos.map(e => {
                        const t = JSON.parse(e);
                        return (
                          <ListItemLink key={carddata[0].link} href={t.link}>
                            <ListItemText
                              primaryTypographyProps={{ variant: 'subtitle1' }}
                              primary={t.title}
                            />
                          </ListItemLink>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={3} md={2} lg={3}>
                    <List
                      subheader={
                        <ListSubheader className={classes.resources}>Tools and Sources </ListSubheader>
                      }
                    >
                      {carddata[0].tools_and_sources.map(e => {
                        const t = JSON.parse(e);
                        return (
                          <ListItemLink key={carddata[0].link} href={t.link}>
                            <ListItemText
                              primaryTypographyProps={{ variant: 'subtitle1' }}
                              primary={t.title}
                            />
                          </ListItemLink>
                        );
                      })}
                    </List>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Button onClick={clickhandler} variant="contained" color="inherit" className={classes.button}>
                Start
              </Button>
            )}
            {status != '' && (
              <div className="submission" className={classes.spacing}>
                <Typography className={classes.heading} variant="subtitle1">
                  SUBMISSION
                </Typography>
                <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                  {carddata.length > 0 && carddata[0].submission}
                </Typography>
                {status == 'IN_PROGRESS' ? (
                  <form action="">
                    <input type="file" id="file" onChange={FileUpload} className={classes.file} />
                    <label className={classes.fileinput} for="file">
                      <CloudUploadIcon style={{ marginRight: '.7rem' }} />
                      UPLOAD FILE
                    </label>
                  </form>
                ) : status == 'COMPLETE' ? (
                  <Typography className={classes.taskmessage}>
                    We love your enthusiasm, But you have already completed the task!!
                  </Typography>
                ) : (
                  <Typography className={classes.taskmessage}>
                    Your Task is being reviewed by our experts. You will be scored soon!!
                  </Typography>
                )}
              </div>
            )}
            <Typography className={classes.heading} variant="subtitle1">
              TASK FEED
            </Typography>
            <div className="feed">
              <Carousel
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                width="100%"
              >
                {carddata.length > 0 &&
                  carddata[0].feed.map(feed => {
                    return (
                      <>
                        <Feed feed={feed} params={params}></Feed>
                      </>
                    );
                  })}
              </Carousel>
            </div>
            <div className="sharework" className={classes.spacing}>
              <Typography className={classes.heading} variant="subtitle1">
                SHARE WORK
              </Typography>
              <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                Post your work and showcase your it in the community. Gain reviews and work upon them.
              </Typography>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
                startIcon={<AddBoxIcon />}
                onClick={handleOpen}
              >
                Post
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <form className={classes.formstyle} noValidate autoComplete="off">
                      <input type="file" id="file" onChange={onChange} className={classes.file} />
                      <label className={classes.fileinput} style={{ marginBottom: 0 }} for="file">
                        CHOOSE IMAGE
                      </label>
                      <br />
                      <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={e => setDiscription(e.target.value)}
                      />
                      <br />
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleSubmit}
                        className={classes.button}
                      >
                        Upload
                      </Button>
                    </form>
                  </div>
                </Fade>
              </Modal>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    taskdetails: state.CourseTasks.taskdata,
    Userdetails: state.auth.user_id
  };
};
const mapDispatchToProps = dispatch => ({
  CourseTasksAction: bindActionCreators(CourseTasksActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Taskpage);
