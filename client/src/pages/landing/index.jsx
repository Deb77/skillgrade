import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import './landing.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActionCreators from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
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
      backgroundColor: 'white'
    }
  },
  title: {
    textAlign: 'center',

    fontFamily: 'Ribeye Marrow',
    color: 'rgb(255, 255, 255)',
    fontSize: '4rem',
    fontWeight: 'lighter',
    marginBottom: '0.5rem',
    letterSpacing: '4px'
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'rgb(255, 255, 255)',
    fontSize: '1.3rem',
    fontWeight: '300',
    letterSpacing: '3px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Landing = ({ authActions }) => {
  const classes = useStyles();
  const history = useHistory();

  const googleSuccess = async res => {
    const { name, email, imageUrl } = await res.profileObj;
    const token = await res.tokenId;
    const params = {
      name,
      email,
      imageUrl,
      token
    };

    localStorage.setItem('skill_grade_token', token);
    authActions.login(params, history);
  };

  const googleFailure = async error => {
    console.log(error);
  };

  return (
    <div className="landing">
      <Container className={classes.content}>
        <Typography className={classes.title}>SKILL GRADE</Typography>
        <Typography className={classes.subtitle}>Where learning meets talent</Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Button className={classes.root} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Get Started
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      </Container>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch)
});
export default connect(null, mapDispatchToProps)(Landing);
