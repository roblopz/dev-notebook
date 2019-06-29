import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Typography from '@material-ui/core/Typography';

export const searchInputStyles = (theme: Theme) => ({
  searchInputWrapper: {
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    flex: 1
  },
  inputSearchIconWrapper: {
    padding: 3,
    color: theme.palette.text.secondary
  },
  inputSearchIcon: {
    fontSize: '1.2rem'
  }
});

const getStyles = (theme: Theme) => {
  return {
    ...searchInputStyles(theme)
  };
};

function DrawerSearch() {
  const classes = makeStyles(getStyles)({});

  return (
    <React.Fragment>
      <Typography variant="h6" className="mb-2">Search</Typography>
      <Paper className={classes.searchInputWrapper}>
        <div className={classes.inputSearchIconWrapper}>
          <SearchIcon className={classes.inputSearchIcon} />
        </div>
        <InputBase className={classes.searchInput} placeholder="Search..." />
      </Paper>
    </React.Fragment>
  );
}

export default DrawerSearch;