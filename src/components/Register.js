import React, { useState, useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Link, Grid, Box, Typography, makeStyles, Container
} from '@material-ui/core'
import { Redirect } from 'react-router';
import { registerWithEmail, database } from '../firebase/index';
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';


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

export default function Register() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const auth = await registerWithEmail(e.target.email.value, e.target.password.value)
      const user = auth.user
      const email = e.target.email.value
      const firstName = e.target.firstName.value
      const lastName = e.target.lastName.value
      const orgName = e.target.orgName.value
      const currUserId = auth.user.uid
      const data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        orgName: orgName,
        id: currUserId,
        role: 'non-admin'
      }
      var ref = database.ref('users/' + currUserId);
      ref.set(data, (error) => {
        if (error) {
          alert("Error")
        } else {
          alert("Upload successful")
        }
      })
      console.log(data)
      setUser(data)
      setRedirect(true)
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
            Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              autoComplete="firstName"
              margin="normal"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              autoComplete="lastName"
              margin="normal"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              autoComplete="orgName"
              margin="normal"
              name="orgName"
              variant="outlined"
              required
              fullWidth
              id="orgName"
              label="Organization Name"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
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
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}