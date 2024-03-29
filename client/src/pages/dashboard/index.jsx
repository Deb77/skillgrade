import React from 'react';
import Navbar from '../../components/Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Carousel_img1 from '../../assets/Carousel_img1.jpg';
import Carousel_img2 from '../../assets/Carousel_img2.jpg';
import Carousel_img3 from '../../assets/Carousel_img3.jpg';
import CustomCards from '../../components/CustomCards';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Typography from '@material-ui/core/Typography';
import * as IncompleteTasksActionCreator from '../../actions/IncompleteTasks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  },
  tagline: {
    textAlign: 'start',
    fontFamily: 'Montserrat',
    fontWeight: 'bolder',
    color: 'white',
    position: 'absolute',
    textShadow: '2px 2px #ff0000',
    top: '150px',
    letterSpacing: '0.04em',
    left: '15%',
    fontSize: 'clamp(2rem, 3vw, 5rem)'
  },
  img: {
    width: '100%',
    height: 'auto'
  }
}));

//data to be sent via link based on course_name
const courseapi = {
  UI_DESIGN: 'ui-design',
  CONTENT_WRITING: 'content-writing',
  WEB_DEV: 'web-dev',
  SKETCHING: 'sketching',
  JAVA: 'java',
  DEV_OPS: 'dev-ops'
};

//data to be displayed on cards
const CategoryCards = [
  {
    course_name: 'UI_DESIGN',
    desc: 'Hone your designing skills by creating eyestrucking visuals for your favourite apps.'
  },
  {
    course_name: 'CONTENT_WRITING',
    desc: 'Showcase how words can express and create a significant impact to an idea'
  },
  {
    course_name: 'WEB_DEV',
    desc: 'Design and create basic to advance website. Its your time to learn the web.'
  },
  {
    course_name: 'SKETCHING',
    desc: 'Take your canvas and start sketching things that tell a story '
  },
  {
    course_name: 'JAVA',
    desc: 'Coming soon'
  },
  {
    course_name: 'DEV_OPS',
    desc: 'Coming soon'
  }
];

//component
const Dashboard = ({ IncompleteTasksAction, Carddetails, Userdetails }) => {
  const classes = useStyles();

  //dispatching action

  useEffect(() => {
    IncompleteTasksAction.IncompleteTasks(Userdetails);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dashboard">
        {/* navbar */}

        <Navbar />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/* Carousel */}

          <div className="carousel" style={{ width: '100%' }}>
            <Carousel
              showArrows={false}
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              showThumbs={false}
              interval="2500"
              transitionTime="700"
              width="100%"
            >
              <div>
                <img
                  src={Carousel_img1}
                  style={{ height: '50vh', objectFit: 'cover' }}
                  alt="carousel_img_1"
                />
                <h1 className={classes.tagline}>Create.. Learn.. Explore..</h1>
              </div>
              <div>
                <img
                  src={Carousel_img2}
                  style={{
                    height: '50vh',
                    objectFit: 'cover',
                    objectPosition: ' 100% 80%'
                  }}
                  alt="carousel_img2"
                />
                <h1 className={classes.tagline}>Show Your Creativity</h1>
              </div>
              <div>
                <img
                  src={Carousel_img3}
                  style={{
                    height: '50vh',
                    objectFit: 'cover',
                    objectPosition: ' 100% 85%',
                    filter: 'contrast(150%)'
                  }}
                  alt="carousel_img3"
                />
                <h1 className={classes.tagline}>Create Amazing Projects </h1>
              </div>
            </Carousel>
          </div>

          {/* tasks */}

          <div className="tasks" style={{ margin: '5% 3%' }}>
            {/* active tasks */}

            {Carddetails.length > 0 ? <Typography className={classes.heading}>YOUR TASKS</Typography> : <></>}
            {Carddetails.length > 0 ? (
              <Grid container spacing={5} style={{ marginBottom: '2rem' }}>
                {Carddetails.map((card, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={'/taskpage/' + courseapi[card.course_name] + '/' + card.id}
                      >
                        <CustomCards
                          course_name={card.course_name}
                          deadline={card.days_left}
                          desc={card.description}
                          active={true}
                        ></CustomCards>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}

            {/* categories */}

            <Typography className={classes.heading}>CATEGORIES</Typography>
            <Grid container spacing={0} style={{ marginBottom: '2rem' }}>
              {CategoryCards.map((card, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Link style={{ textDecoration: 'none' }} to={'/tasklist/' + courseapi[card.course_name]}>
                      <CustomCards desc={card.desc} course_name={card.course_name}></CustomCards>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
};

//redux
const mapStateToProps = state => {
  return {
    Carddetails: state.IncompleteTasks.carddata,
    Userdetails: state.auth.user_id
  };
};
const mapDispatchToProps = dispatch => ({
  IncompleteTasksAction: bindActionCreators(IncompleteTasksActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
