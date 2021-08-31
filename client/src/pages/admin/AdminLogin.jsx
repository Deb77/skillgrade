import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Link,
  TextField,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import * as adminAuth from '../../actions/adminAuth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SkillShare
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AdminLogin = ({ auth, authAction }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (auth) history.push('/admin/home');
    // eslint-disable-next-line
  }, [auth]);

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is a required field';
    }
    if (!values.password) {
      errors.password = 'Password is a required field';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validate,
    onSubmit: values => {
      authAction.login(values, history);
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            error={formik.errors.email ? true : false}
            helperText={formik.errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                value={formik.values.remember}
                color="primary"
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={Object.keys(formik.errors).length >= 1}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.adminAuth.auth
});
const mapDispatchToProps = dispatch => ({
  authAction: bindActionCreators(adminAuth, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
