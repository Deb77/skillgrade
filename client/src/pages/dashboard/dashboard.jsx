import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Common/Navbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, responsiveFontSizes, useTheme } from '@material-ui/core/styles';
import Carousel_img1 from '../../assets/Carousel_img1.png';
import CustomCards from '../../components/CustomCards';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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
  },
  tagline: {
    textAlign: 'start',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: 'white',
    position: 'absolute',
    top: '150px',
    letterSpacing: '0.04em',
    left: '15%',
    fontSize: 'clamp(2rem, 3vw, 5rem)'
  }
}));

//data
const CategoryCards = [
  {
    title: 'UI Design',
    desc: 'Hone your designing skills by creating eyestrucking visualsfor your favourite apps.'
  },
  {
    title: 'Content Writing',
    desc: 'Hone your designing skills by creating eyestrucking visualsfor your favourite apps.'
  },
  {
    title: 'Web Dev',
    desc: 'Design and create basic to advance website. Its your time to learn the web.'
  },
  {
    title: 'Sketching',
    desc: 'Hone your designing skills by creating eyestrucking visualsfor your favourite apps.'
  },
  {
    title: 'Java',
    desc: 'Coming soon'
  },
  {
    title: 'Dev Ops',
    desc: 'Coming soon'
  }
];
const ActiveCarddetails = [
  {
    title: 'UI Design',
    desc: 'Make a UI Design of Medical tracker app',
    deadline: '2 days'
  },
  {
    title: 'Web Dev',
    desc: 'Make a UI Design of Medical tracker app',
    deadline: '2 days'
  }
];

//component
const Dashboard = () => {
  const [carddetails, setCarddetails] = useState([]);
  useEffect(() => {
    setCarddetails(ActiveCarddetails);
  });

  const classes = useStyles();

  return (
    <>
      <div className="dashboard">
        {/* navbar */}

        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/* Carousel */}

          <div className="carousel" style={{ width: '100%' }}>
            <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false} width="100%">
              <div>
                <img src={Carousel_img1} style={{ height: '40vh' }} />
                <h1 className={classes.tagline}>Create.. Learn.. Explore..</h1>
              </div>
              <div>
                <img src={Carousel_img1} style={{ height: '40vh' }} />
              </div>
            </Carousel>
          </div>

          {/* tasks */}

          <div className="tasks" style={{ margin: '5% 3%' }}>
            {/* active tasks */}

            <Typography className={classes.heading}>YOUR TASKS</Typography>
            <Grid container spacing={5} style={{ marginBottom: '2rem' }}>
              {carddetails.map(card => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomCards
                      title={card.title}
                      deadline={card.deadline}
                      desc={card.desc}
                      active="true"
                    ></CustomCards>
                  </Grid>
                );
              })}
            </Grid>

            {/* categories */}

            <Typography className={classes.heading}>CATEGORIES</Typography>
            <Grid container spacing={5} style={{ marginBottom: '2rem' }}>
              {CategoryCards.map(card => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomCards title={card.title} desc={card.desc}></CustomCards>
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

export default Dashboard;
