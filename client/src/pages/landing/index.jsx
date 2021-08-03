import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { loginService } from '../../services';
import './landing.css';

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
  }
});

const Landing = () => {
  const classes = useStyles();

  const googleSuccess = async res => {
    const { name, email, imageUrl } = await res.profileObj;
    const token = await res.tokenId;
    const params = {
      name,
      email,
      imageUrl,
      token
    };
    loginService(params)
      .then(({ data }) => {
        localStorage.setItem('skill_grade_token', token);
        // history push goes here
      })
      .catch(err => console.log(err));
  };

  const googleFailure = async error => {
    console.log(error);
  };

  return (
    <div className="landing">
      <div className="content">
        <h1>SKILL GRADE</h1>
        <h2>Where learning meets talent</h2>
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
      </div>
    </div>
  );
};
export default Landing;
