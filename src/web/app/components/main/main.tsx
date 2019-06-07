import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import { useApolloClient } from 'react-apollo-hooks';

import { getStyles } from '../../styles/jss/main/main';
import Navbar from './navbar';
import Sidebar from './sidebar';
import PageResults from './pageResults';

function Main() {
  const classes = makeStyles(getStyles)({});
  const client = useApolloClient();

  return (
    <div className={classes.root}>
      <Navbar />
      <Sidebar />

      <div className={classes.contentWrapper}>
        <PageResults />
        <Fab className={classes.addPageIcon} color="primary" size="small"
          onClick={() => client.writeData({ data: { addingPage: true } })}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Main;