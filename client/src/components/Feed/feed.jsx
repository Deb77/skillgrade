import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UpvoteFeedActionCreator from '../../actions/UpvoteFeed';
import './feed.css';
//additional styling
const useStyles = makeStyles({
  root: {
    color: 'white'
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
  heading: {
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#505050',
    marginBottom: '.3rem',
    marginTop: '2rem'
  }
});

//component
const Feed = ({ feed, params, Userdetails, UpvoteFeedAction }) => {
  // eslint-disable-next-line
  const [upvotes, setUpvotes] = React.useState(feed.upvotes.length);
  const classes = useStyles();
  const Upvotetask = () => {
    UpvoteFeedAction.UpvoteFeed(params.id, feed.id, Userdetails, setUpvotes);
  };
  return (
    <>
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
              disabled={feed.upvotes.indexOf(Userdetails) === -1 ? false : true}
              style={{ margin: '1rem 0rem 1rem 0rem' }}
              variant="contained"
              className={classes.button}
              onClick={Upvotetask}
            >
              Upvote
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = state => {
  return {
    Userdetails: state.auth.user_id
  };
};
const mapDispatchToProps = dispatch => ({
  UpvoteFeedAction: bindActionCreators(UpvoteFeedActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
