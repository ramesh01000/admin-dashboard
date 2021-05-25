import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
 
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
 
const NavigationAuth = () => (
  <div className={useStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={useStyles.title}>
            Admin Dashboard
          </Typography>
          <Button color="inherit"><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button color="inherit"><Link to={ROUTES.HOME}>Home</Link></Button>
          <Button color="inherit"><Link to={ROUTES.ACCOUNT}>Account</Link></Button>
          <Button color="inherit"><SignOutButton /></Button>
        </Toolbar>
      </AppBar>
    </div>

  // <ul>
  //   <li>
  //     <Link to={ROUTES.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.HOME}>Home</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.ACCOUNT}>Account</Link>
  //   </li>
  //   <li>
  //     <SignOutButton />
  //   </li>
  // </ul>
);
 
const NavigationNonAuth = () => (
  <div className={useStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={useStyles.title}>
            Admin Dashboard
          </Typography>
          <Button color="inherit"><Link to={ROUTES.LANDING}>Landing</Link></Button>
          <Button color="inherit"> <Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  // <ul>
  //   <li>
  //     <Link to={ROUTES.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  //   </li>
  // </ul>
);
 
export default Navigation;