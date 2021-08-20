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
import { useEffect } from 'react';
import { useParams } from 'react-router';

import ListSubheader from '@material-ui/core/ListSubheader';
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
  }
}));

//data
const feeddata = [
  {
    user: 'Dheeraj Gandhi',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit suscipit aspernatur ipsum impedit fugit illum nisi natus? Hic, exercitationem. Lorem ipsudolor sit amet consectetur adipisicing elit. Officia, velit suscipit aspernatur ipsum impe fugit illum nisi natus? Hic, exercitationem.',
    img: feedimg,
    upvotes: '200'
  },
  {
    user: 'Deborah Mendes',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit suscipit aspernatur ipsum impedit fugit illum nisi natus? Hic, exercitationem. Lorem ipsudolor sit amet consectetur adipisicing elit. Officia, velit suscipit aspernatur ipsum impe fugit illum nisi natus? Hic, exercitationem.',
    img: feedimg,
    upvotes: '200'
  },
  {
    user: 'Skillshare',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit suscipit aspernatur ipsum impedit fugit illum nisi natus? Hic, exercitationem. Lorem ipsudolor sit amet consectetur adipisicing elit. Officia, velit suscipit aspernatur ipsum impe fugit illum nisi natus? Hic, exercitationem.',
    img: feedimg,
    upvotes: '200'
  }
];
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
const Taskpage = ({ taskdetails }) => {
  const params = useParams();

  const carddata = taskdetails.tasks.filter(task => {
    return task.id === params.id;
  });
  console.log(carddata);
  const classes = useStyles();
  return (
    <>
      <div className="taskpage">
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container style={{ marginTop: '2rem' }}>
            <Typography className={classes.heading} variant="h6">
              {carddata[0].name}
            </Typography>
            <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
              {carddata[0].introduction}
            </Typography>
            <Typography style={{ color: '#7A64FF', marginBottom: '.3rem' }}>
              Points: {carddata[0].max_points}
            </Typography>
            <Typography style={{ color: '#7A64FF', marginBottom: '2rem' }}>
              Time:{carddata[0].time_complete} Days
            </Typography>
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
                        <ListItemLink key={carddata[0].link} href={t.link}>
                          <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} primary={t.title} />
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
                        <ListItemLink key={carddata[0].link} href={t.link}>
                          <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} primary={t.title} />
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
                          <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} primary={t.title} />
                        </ListItemLink>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </div>
            <div className="submission" className={classes.spacing}>
              <Typography className={classes.heading} variant="subtitle1">
                SUBMISSION
              </Typography>
              <Typography style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                {carddata[0].submission}
              </Typography>
              <Button
                variant="contained"
                color="inherit"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </div>
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
                {feeddata.map(feed => {
                  return (
                    <Grid key={feed.user} container spacing={5}>
                      <Grid item xs={12} sm={6} md={4} lg={6}>
                        <img src={feed.img} className={classes.image} alt="carousel_img_1" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={6}>
                        <Typography align="left" className={classes.heading} variant="subtitle1">
                          {feed.user}
                        </Typography>
                        <Typography align="left" style={{ letterSpacing: '0.04em', marginBottom: '1rem' }}>
                          {feed.desc}
                        </Typography>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <ThumbUpAltIcon style={{ color: '#7A64FF' }}></ThumbUpAltIcon>
                          </Grid>
                          <Grid item>
                            <Typography style={{ letterSpacing: '0.04em' }} variant="subtitle2">
                              {feed.upvotes} Upvotes
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography align="left">
                          <Button
                            style={{ margin: '1rem 0rem 1rem 0rem' }}
                            variant="contained"
                            className={classes.button}
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
              >
                Post
              </Button>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    taskdetails: state.CourseTasks.taskdata
  };
};
export default connect(mapStateToProps)(Taskpage);
