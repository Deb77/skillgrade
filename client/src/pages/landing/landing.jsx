import React from 'react';
import './landing.css';
import bckimg from '../../assets/bckimg.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    color: '#7A64FF',
    height: 48,
    marginTop: '1.5rem',
    fontFamily: 'Poppins',
    padding: '0px 40px',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: 'white'
    }
  }
});

const Landing = () => {
  const classes = useStyles();
  return (
    <div className="landing">
      <div className="content">
        <h1>SKILL GRADE</h1>
        <h2>Where learning meets talent</h2>
        <Button className={classes.root}>Get Started</Button>
      </div>
    </div>
  );
};
export default Landing;
