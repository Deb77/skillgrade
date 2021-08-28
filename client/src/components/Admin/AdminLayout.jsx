import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  AppBar,
  Container,
  CssBaseline,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Home, FileCopy, Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as adminAuth from '../../actions/adminAuth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const AdminLayout = props => {
  const { window } = props;
  let history = useHistory();
  let { pathname } = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { icon: <Home />, title: 'Overview', link: '/admin/home' },
          { icon: <FileCopy />, title: 'Examine Work', link: '/admin/examine' }
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => history.push(item.link)}
            disabled={pathname === item.link}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const onClick = () => {
    props.authAction.logout(history);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="space-between">
            <Typography variant="h6" noWrap>
              Skill Share Admin
            </Typography>
            <Button color="secondary" variant="contained" onClick={() => onClick()}>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>{props.children}</Container>
      </main>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  authAction: bindActionCreators(adminAuth, dispatch)
});

export default connect(null, mapDispatchToProps)(AdminLayout);
