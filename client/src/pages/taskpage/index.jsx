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
import * as UpvoteFeedActionCreator from '../../actions/UpvoteFeed';

import { checkTaskStatus } from '../../services';
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
// const formdata = formData();
// e.target.files[0]

// const formData = new FormData();
// formData.set('encType', 'multipart/form-data');
// formData.append('file', file);

// try {
//   const res = await axios.put('http://localhost:7000/user-tasks/complete-user-task', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
// } catch (er) {
//   console.log(er);
// }

//component
const Taskpage = ({ taskdetails, Userdetails, UpvoteFeedAction }) => {
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const [description, setDiscription] = useState('');
  const [filedata, setFiledata] = useState('');
  const [status, setStatus] = useState('');
  //filter tasks based on task id
  const carddata = taskdetails.filter(task => {
    return task.id === params.id;
  });

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
    AddTaskFeed(uploadfeeddata);
    handleClose();
  };

  //data to be passed to call addusertask
  const data = { user_id: Userdetails, task_id: params.id };

  //to pass data to incomplete tasks once the start button is clicked
  const clickhandler = () => {
    console.log(data);
    AddUserTask(data);
    setVisible(true);
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
            {status == 'IN_PROGRESS' ? (
              <div className="resources" className={classes.spacing}>
                <Typography className={classes.heading} variant="subtitle1">
                  RESOURCES
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={3} md={2} lg={3}>
                    <List
                      subheader={
                        <ListSubheader className={classes.resources}>Tools and Sources </ListSubheader>
                      }
                    >
                      {carddata[0].docs.map(e => {
                        const t = JSON.parse(e);
                        return (
                          <ListItemLink key={carddata.length > 0 && carddata[0].link} href={t.link}>
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
                      {carddata[0].videos.map(e => {
                        const t = JSON.parse(e);
                        return (
                          <ListItemLink key={carddata.length > 0 && carddata[0].link} href={t.link}>
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
                          <ListItemLink key={carddata.length > 0 && carddata[0].link} href={t.link}>
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
            {visible && (
              <div className="submission" className={classes.spacing}>
                <Typography className={classes.heading} variant="subtitle1">
                  SUBMISSION
                </Typography>
                <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                  {carddata.length > 0 && carddata[0].submission}
                </Typography>
                {/* {if(status=='COMPLETE'){
                  return(
                    <div>helloo</div>
                  );
                  
                }
                else if(status=='IN_PROGRESS'){
                  return(
                    <form action="">
                      <input type="file" id="file" className={classes.file} />
                      <label className={classes.fileinput} for="file">
                      <CloudUploadIcon style={{ marginRight: '.7rem' }} />
                    SELECT FILE
                  </label>
                  <Button variant="contained" color="inherit" className={classes.button}>
                    SUBMIT
                  </Button>
                </form>
                  )
                }
                else{
                  return(
                    <h1>task has been completed</h1>
                  )
                }} */}
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
                      <Grid key={feed.user} container spacing={5}>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <img src={feed.work_upload} className={classes.image} alt="carousel_img_1" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                          <Typography align="left" className={classes.heading} variant="subtitle1">
                            {feed.user}
                          </Typography>
                          <Typography align="left" style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                            {feed.description}
                          </Typography>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <ThumbUpAltIcon style={{ color: '#7A64FF' }}></ThumbUpAltIcon>
                            </Grid>
                            <Grid item>
                              <Typography style={{ letterSpacing: '0.04em' }} variant="subtitle2">
                                {feed.upvotes.length} Upvotes
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography align="left">
                            <Button
                              style={{ margin: '1rem 0rem 1rem 0rem' }}
                              variant="contained"
                              className={classes.button}
                              onClick={() => UpvoteFeedAction.UpvoteFeed(params.id, feed.id, Userdetails)}
                            >
                              Upvote
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
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
                      <input className={classes.button} type="file" onChange={onChange} />
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
  UpvoteFeedAction: bindActionCreators(UpvoteFeedActionCreator, dispatch),
  CourseTasksAction: bindActionCreators(CourseTasksActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Taskpage);
