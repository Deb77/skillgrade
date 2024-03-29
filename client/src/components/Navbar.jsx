import React from 'react';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
//Navbar styling
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: '#7A64FF',

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: '#1F1F1F',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: '#1F1F1F',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  text: {
    color: 'white'
  },
  icons: {
    fill: 'white',
    marginBottom: '1rem',
    marginTop: '1rem'
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Ribeye Marrow'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  activelink: {
    color: '#7A64FF'
  },
  inactivelink: {
    color: 'white'
  }
}));

//component
const Navbar = ({ name, url }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const location = useLocation().pathname.split('/')[1];
  console.log(location);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const clickHandler = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    localStorage.removeItem('imageUrl');
    localStorage.removeItem('token');
    history.push('/');
  };
  const active = path => {
    const val = path.find(ele => ele === location);
    console.log(val);
    if (val) {
      return classes.activelink;
    } else return classes.inactivelink;
  };
  const navlinks = [
    {
      path: ['dashboard', 'tasklist', 'taskpage'],
      key: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      path: ['leaderboard'],
      key: 'Leaderboard',
      icon: <EqualizerIcon />
    },
    {
      path: ['about'],
      key: 'About',
      icon: <InfoIcon />
    },
    {
      path: ['help'],
      key: 'Help',
      icon: <HelpOutlineIcon />
    }
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            SKILL GRADE
          </Typography>
          <div>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item>
                <Hidden xsDown>{name}</Hidden>
              </Grid>
              <Grid item>
                <Avatar alt={name} src={url} className={classes.small} />
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ fill: 'white' }} />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.text}>
          {navlinks.map(obj => {
            return (
              <NavLink key={obj.key} style={{ textDecoration: 'none' }} to={'/' + obj.path[0]}>
                <ListItem button key={obj.key}>
                  <ListItemIcon className={`${active(obj.path)} ${classes.icons}`}>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.key} className={classes.text} />
                </ListItem>
              </NavLink>
            );
          })}

          <ListItem onClick={clickHandler} button key={'Logout'}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText primary={'Logout'} className={classes.text} />
          </ListItem>
        </List>
      </Drawer>
      <main></main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    url: state.auth.imageUrl
  };
};
Navbar.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired
};

export default connect(mapStateToProps)(withWidth()(Navbar));
