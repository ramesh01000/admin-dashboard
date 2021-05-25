import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={useStyles.paper}>
    <Avatar className={useStyles.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <SignInForm />
    </div>
    </Container>
  // <div>
  //   <h1>SignIn</h1>
  //   <SignInForm />
  //   <PasswordForgetLink />
  //   <SignUpLink />
  // </div>
);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form className={useStyles.form} onSubmit={this.onSubmit}>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
          />
        {/* <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        /> */}
         <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            disabled={isInvalid}
          >
            Sign In
          </Button>
        {/* <button disabled={isInvalid} type="submit">
          Sign In
        </button> */}
 
        {error && <p>{error.message}</p>}

        <Grid container>
            <Grid item xs>
              <PasswordForgetLink />
            </Grid>
            {/* <Grid item>
              <SignUpLink />
            </Grid> */}
          </Grid>

      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };