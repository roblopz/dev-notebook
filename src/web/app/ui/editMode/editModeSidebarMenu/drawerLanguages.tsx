import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const getStyles = (theme: Theme) => {
  return {
    notebookItem: {
      paddingLeft: theme.spacing(1)
    }
  };
};

function DrawerLanguages() {
  const classes = makeStyles(getStyles)({});

  return (
    <React.Fragment>
      <Typography variant="h6" className="mb-2">Languages</Typography>
      
      <List dense={true}>
        <ListItem button className={classes.notebookItem}>
          <ListItemText primary="Notebook 1" />
        </ListItem>
        <ListItem button className={classes.notebookItem}>
          <ListItemText primary="Notebook 2" />
        </ListItem>
        <ListItem button className={classes.notebookItem}>
          <ListItemText primary="Notebook 3" />
        </ListItem>
        <ListItem button className={classes.notebookItem}>
          <ListItemText primary="Notebook 4" />
        </ListItem>
        <ListItem button className={classes.notebookItem}>
          <ListItemText primary="Notebook 5" />
        </ListItem>
      </List >
    </React.Fragment>
  );
}

export default DrawerLanguages;