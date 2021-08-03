import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
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
};

const googleFailure = async error => {
  console.log(error);
};

const Landing = () => {
  const classes = useStyles();
  return (
    <div className="landing">
      <div className="content">
        <h1>SKILL GRADE</h1>
        <h2>Where learning meets talent</h2>
        <GoogleLogin
          clientId="416360586846-278arhu16n1nlcr7he6ek1jdm5aj52q2.apps.googleusercontent.com"
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