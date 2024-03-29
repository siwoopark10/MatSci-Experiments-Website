import React, { useState, useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, makeStyles, Container
} from '@material-ui/core'
import { Redirect } from 'react-router';
import { database, loginWithEmail } from '../firebase/index';
import { UserContext } from '../UserContext';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function SignIn() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const auth = await loginWithEmail(e.target.email.value, e.target.password.value)
      const email = e.target.email.value
      const currUserId = auth.user.uid
      var ref = database.ref('users/' + currUserId);
      ref.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setUser(data)
        setRedirect(true)
      })
    } catch (error) {
      alert(error.message)
    }
  }

  if (redirect) {
    var url = "/" + user.id + "/propose"
    if (user.role == "admin") {
      url = "/" + user.id + "/review"
    }
    return (
      <Redirect to={url} />
    )
  } else {
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
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}