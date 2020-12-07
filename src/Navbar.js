import React from 'react';
import { AppBar, Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CustomLink from './CustomLink';

const useStyles = makeStyles(theme => ({
  navTitle: { flexGrow: 1 },
  root: {
    marginBottom: theme.spacing(4)
  },
  active: {
    backgroundColor: theme.palette.primary.dark
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Box className={classes.navTitle}>
          <CustomLink variant="h6" color="inherit" to="/">
            Microblog
          </CustomLink>
        </Box>
        <Button color="inherit" component={NavLink} exact to="/" activeClassName={classes.active}>
          Blog
        </Button>
        <Button color="inherit" component={NavLink} exact to="/new" activeClassName={classes.active}>
          New Post
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;