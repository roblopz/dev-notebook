import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { getStyles } from '../../styles/jss/main/navbar';
import FilterNotes from './navbarFilterNotes';

function Navbar() {
  const classes = makeStyles(getStyles)({});

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Dev Notebooks
        </Typography>
        <div className={classes.flexGrow} />
        <FilterNotes />
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {

};

export default Navbar;